import { hashPassword, verifyPassword } from "../../utils/auth/handle-password.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { responseJWT } from "../../common/enum/jwt/response.jwt.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { generateToken } from "../../utils/token/handle-token.js";
import { getAthleteByIdFunction } from "./athletes.controller.js";
import getConnection from "../../database/connection.mysql.js";
import { getCoachByIdFunction } from "./coach.controller.js";
import { getClubByIdFunction } from "./club.controller.js";
import { getRoleUser } from "./role.controller.js";

//Buscar usuario por id
async function searchUserLogin(data) {
    const { username } = data
    const pool = await getConnection()
    const db = variablesDB.academy
    try {
        const response = await pool.query(
            `SELECT id_user, username, password, email, verify, created_at, verified_at FROM
            ${db}.login_users WHERE username = ? AND verified_at IS NULL
            OR email = ? AND verified_at IS NOT NULL`,
            [username, username]
        );
        if (response[0].length === 0) {
            return responseQueries.error({
                message: "User not found",
                data: response[0]
            });
        }
        return responseQueries.success({
            message: "Success query",
            data: response[0]
        });
    } catch (error) {
        return responseQueries.error({
            message: "Error query",
            error
        });
    }
}

// Actualizar password del usuario
async function updatePasswordHashUser(data) {
    const { id, password, verify } = data
    const pool = await getConnection()
    const db = variablesDB.academy
    try {
        const response = await pool.query(`UPDATE ${db}.login_users SET password=?, verify=?, verified_at=CURRENT_TIMESTAMP() WHERE id_user=?`, [password, verify, id])
        if (response[0].affectedRows === 0) {
            return responseQueries.error({
                message: "Error update",
                data: response[0]
            });
        }
        return responseQueries.success({
            message: "Success update",
            data: response[0]
        });
    } catch (error) {
        return responseQueries.error({
            message: "Error update",
            error
        });
    }
}

async function getDataUser(data) {
    const { id_athlete, id_coach, id_club } = data
    try {
        let user = {}
        if (id_athlete != null && id_athlete != undefined) {
            const responseAthlete = await getAthleteByIdFunction(id_athlete)
            if (responseAthlete.error) {
                return responseQueries.error({
                    message: "Error query",
                    error: responseAthlete.error
                });
            }
            user = responseAthlete.data[0]
        }
        if (id_coach != null && id_coach != undefined) {
            const responseCoach = await getCoachByIdFunction(id_coach)
            const responseClub = await getClubByIdFunction(responseCoach.data[0].id_club)
            if (responseClub.error || responseCoach.error) {
                return responseQueries.error({
                    message: "Error query",
                    error: responseClub.error || responseCoach.error
                });
            }
            user = responseCoach.data[0]
            user.club = responseClub.data[0]
            delete user.id_club
        }
        if (id_club != null && id_club != undefined) {
            const responseClub = await getClubByIdFunction(id_club)
            if (responseClub.error) {
                return responseQueries.error({
                    message: "Error query",
                    error: responseClub.error
                });
            }
            user = responseClub.data[0]
        }
        return responseQueries.success({
            message: "Success query",
            data: user
        });
    } catch (error) {
        return responseQueries.error({
            message: "Error query",
            error
        });
    }
}


// Validar si el usuario existe para logearse
export const validLoginUsersAcademy = async (req, res) => {
    const userExist = await searchUserLogin({ username: req.body.username })
    if (userExist.error) {
        res.json(responseJWT.error({ message: userExist.message, status: userExist.status, token: null, user: null }))
        return
    }
    const { id_user, username, email, password, verify } = userExist.data[0]
    const role = await getRoleUser(id_user);
    if(role.error){
        res.json(responseJWT.error({ message: role.message, status: role.status, token: null, user: null }))
        return
    }
    if(role.data[0].name_role !== req.body.role_user){
        res.json(responseJWT.error({ message: 'Invalid role', status: 200, token: null, user: null }))
        return
    }
    if (userExist.success) {
        if (verify === 0) {
            if (req.body.password == password) {
                const passwordHash = await hashPassword({ id: id_user, username: username, email: email, password: password })
                const updatePassword = await updatePasswordHashUser({ id: id_user, password: passwordHash.password, verify: !verify })
                if (updatePassword.success) {
                    const dataUser = await getDataUser({ id_athlete: id_user, id_coach: null, id_club: null })
                    const user = {
                        id_login: id_user,
                        username: username,
                        email: email,
                        role: role.data[0].name_role ,
                        id_role: role.data[0].id_role,
                        ...dataUser.data
                    }
                    const payload = {
                        sub: id_user,
                        user: user
                    }
                    const token = await generateToken(payload)
                    return res.json(responseJWT.success({ message: 'Success access', token }))
                } else {
                    return res.json(responseJWT.error({ message: updatePassword.message, status: updatePassword.status, token: null, user: null }))
                }
            } else {
                return res.json(responseJWT.error({ message: 'Invalid password or username', status: 200, token: null, user: null }))
            }
        }
        else {
            const isPassword = await verifyPassword(req.body.password, password)
            if (isPassword) {
                const dataUser = await getDataUser({ id_athlete: id_user, id_coach: null, id_club: null })
                if (dataUser.error) {
                    return res.json(responseJWT.error({ message: dataUser.message, status: dataUser.status, token: null, user: null }))
                }
                const user = {
                    id_login: id_user,
                    username: username,
                    email: email,
                    role: role.data[0].name_role ,
                    id_role: role.data[0].id_role,
                    ...dataUser.data
                }
                const payload = {
                    sub: id_user,
                    user: user
                }
                const token = await generateToken(payload)
                return res.json(responseJWT.success({ message: 'Success access', token }))
            } else {
                return res.json(responseJWT.error({ message: 'Invalid password or username', status: 200, token: null, user: null }))
            }
        }
    } else {
        return res.json(responseJWT.error({ message: 'Invalid password or username', status: 200, token: null, user: null }))
    }
}

//Crear solicitud de registro de usuario
export async function createSolitudeRegisterUser(data) {
    const { id_user, username } = data
    const pool = await getConnection()
    const db = variablesDB.academy
    try {
        const response = await pool.query(`INSERT INTO ${db}.solitude_register
            (id_user, username, email, verify)  VALUES(?, ?, ?, ?)`,
            [id_user, username, username, 0])
        if (response[0].affectedRows === 0) {
            return responseQueries.error({
                message: error?.message ?? "Error insert",
                data: response[0]
            });
        }
        return responseQueries.success({
            message: "Success insert",
            data: response[0]
        });
    } catch (error) {
        return responseQueries.error({
            message: error?.message ?? "Error insert",
            error
        });
    }
}

//Crear solicitud login de usuario
export async function createSolitudLoginUser(data) {
    const { email } = data
    const pool = await getConnection()
    const db = variablesDB.academy
    try {
        const response = await pool.query(`INSERT INTO ${db}.login_users
            (username, password, email, verify, created_at, verified_at)
            VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP(), NULL)`,
            [email, 'password', email, 0])
        if (response[0].affectedRows === 0) {
            return responseQueries.error({
                message: error?.message ?? "Error insert",
                data: response[0]
            });
        }
        return responseQueries.success({
            message: "Success insert",
            data: response[0]
        });
    } catch (error) {
        return responseQueries.error({
            message: error?.message ?? "Error insert",
            error
        });
    }
}

// Buscar correos ya registrados
export async function validateNotRegisterMail(mail) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const [rows] = await conn.query(`SELECT * FROM ${db}.login_users WHERE email = '${mail}';`);
  if (rows.length > 0) return responseQueries.success({ message: "User already exists" });
  return responseQueries.error({ message: "Mail not exists" });
}
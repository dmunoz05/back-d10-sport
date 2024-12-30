import { hashPassword, verifyPassword } from "../../utils/auth/handle-password.js";
import { responseAuth } from "../../common/enum/auth/response.auth.js";
import { responseJWT } from "../../common/enum/jwt/response.jwt.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { generateToken } from "../../utils/token/handle-token.js";
import getConnection from "../../database/connection.mysql.js";

//Obtener todos los usuarios
export const getUsers = async (req, res) => {
    const conn = await getConnection();
    const select = await conn.query('SELECT * FROM users');
    if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
    return res.json(responseQueries.success({ message: "Success" ,data: select[0] }));
}

//Buscar usuario por id
async function searchUserLogin(data) {
    const { username, role_user } = data
    const pool = await getConnection()
    const db = variablesDB.academy
    try {
        const response = await pool.query(
            `SELECT id_user, username, password, email, role_user, verify, created_at FROM ${db}.login_users WHERE username = ? AND role_user = ? OR email = ? AND role_user = ?`,
            [username, role_user, username, role_user]
        );
        if(response[0].length === 0) {
            return responseAuth.error({
                message: "User not found",
                data: response[0]
            });
        }
        return responseAuth.success({
            message: "Success query",
            data: response[0]
        });
    } catch (error) {
        return responseAuth.error({
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
        const response = await pool.query(`UPDATE ${db}.login_users SET password=?, verify=?, verified_at=CURRENT_TIMESTAMP() WHERE id_user=?`, [password, id, verify])
        return responseAuth.success({
            message: "Success update",
            data: response[0]
        });
    } catch (error) {
        return responseAuth.error({
            message: "Error update",
            error
        });
    }
}

// Validar si el usuario existe para logearse
export const validLoginUsersAcademy = async (req, res) => {
    const userExist = await searchUserLogin({ username: req.body.username, role_user: req.body.role_user })
    if (userExist.error) {
        res.json(responseJWT.error({ message: userExist.message, status: userExist.status, token: null, user: null }))
        return
    }
    const { id_user, username, email, password, verify, role_user } = userExist.data[0]
    if (userExist.success) {
        if (verify === 0) {
            if (req.body.password == password) {
                const passwordHash = await hashPassword({ id: id_user, username: username, email: email, password: password })
                const updatePassword = await updatePasswordHashUser({ id: id_user, password: passwordHash.password, verify: !verify })
                if (updatePassword.success) {
                    const payload = {
                        sub: id_user,
                        name: username
                    }
                    const user = {
                        id: id_user,
                        username: username,
                        email: email,
                        role: role_user
                    }
                    const token = await generateToken(payload)
                    return res.json(responseJWT.success({ message: 'Success access', token, user: user }))
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
                const payload = {
                    sub: id_user,
                    name: username
                }
                const token = await generateToken(payload)
                const user = {
                    id: id_user,
                    username: username,
                    email: email,
                    role: role_user
                }
                return res.json(responseJWT.success({ message: 'Success access', token, user: user }))
            } else {
                return res.json(responseJWT.error({ message: 'Invalid password or username', status: 200, token: null, user: null }))
            }
        }
    } else {
        return res.json(responseJWT.error({ message: 'Invalid password or username', status: 200, token: null, user: null }))
    }
}
import { getAthleteByIdFunction, deleteAthleteByIdFunction } from "./athletes.controller.js";
import { getCoachByIdFunction, deleteCoachByIdFunction } from "./coach.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";
import { sendEmailFunction } from "../../lib/api/email.api.js";
import { generateToken } from "../../utils/token/handle-token.js";


// Actualizar solicitud de registro
export async function updateSolitude(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`UPDATE ${db}.solitude_register SET verify = 1 WHERE id = ${id};`);
  if (!update) return responseQueries.error({ message: "Error query" });
  return responseQueries.success({ message: "Success" });
}

// Eliminar solicitud de registro
export async function deleteSolitude(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`DELETE FROM ${db}.solitude_register WHERE id = ${id};`);
  if (!update) return responseQueries.error({ message: "Error query" });
  return responseQueries.success({ message: "Success" });
}

// Eliminar login usuario y contraseña default para athleta
async function deleteLoginUserAthlete(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`DELETE FROM ${db}.login_users WHERE id_athlete = ${id};`);
  if (!update) return responseQueries.error({ message: "Error query" });
  return responseQueries.success({ message: "Success" });
}

// Crear login usuario y contraseña default para athleta
async function updateLoginUserAthlete(data) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`
    UPDATE ${db}.login_users SET username = '${data.username}', password = '${data.password}',
    email = '${data.email}', verified_at = CURRENT_TIMESTAMP() WHERE id_athlete = ${data.id_user};`);
  if (update[0].affectedRows === 0) {
    return responseQueries.error({ message: "Error query" });
  }
  return responseQueries.success({ message: "Success" });
}

// Eliminar login usuario y contraseña default para coach
async function deleteLoginUserCoach(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`DELETE FROM ${db}.login_users WHERE id_coach = ${id};`);
  if (!update) return responseQueries.error({ message: "Error query" });
  return responseQueries.success({ message: "Success" });
}

// Crear login usuario y contraseña default para athleta
async function updateLoginUserCoach(data) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const update = await conn.query(`
    UPDATE ${db}.login_users SET username = '${data.username}', password = '${data.password}',
    email = '${data.email}', verified_at = CURRENT_TIMESTAMP() WHERE id_coach = ${data.id_user};`);
  if (!update) return responseQueries.error({ message: "Error query" });
  return responseQueries.success({ message: "Success" });
}

// Aprobar solicitud de registro
export const approvedSolitude = async (req, res) => {
  const { id_solitude, id_user, role_user, nombre } = req.body;
  let user = {}
  const numberRandom = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  if (role_user == 'athlete') {
    const updateRegister = await updateSolitude(id_solitude);
    const searchUser = await getAthleteByIdFunction(id_user);
    if (searchUser.success && updateRegister.success) {
      user.email = searchUser.data[0].mail
      user.username = searchUser.data[0].mail;
      user.password = `${searchUser.data[0].last_names.charAt(0).toUpperCase() + searchUser.data[0].last_names.slice(1)}${numberRandom}*`
      user.id_user = id_user;
      const updateLogin = await updateLoginUserAthlete(user);
      if (updateLogin.success) {

        const tokenUsername = await generateToken({
          sub: user.id_user,
          username: user.username
        })
        const tokenPassword = await generateToken({
          sub: user.id_user,
          password: user.password
        })
        const tokenRole = await generateToken({
          sub: user.id_user,
          role: role_user
        })

        const sendMail = await sendEmailFunction({ name: nombre, username: tokenUsername, password: tokenPassword, email: user.email, type: 'approved', role_user: tokenRole })
        return res.json(responseQueries.success({ message: "Success approvade", data: sendMail }));
      }
    } else {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
  }
  if (role_user == 'coach') {
    const updateRegister = await updateSolitude(id_solitude);
    const searchUser = await getCoachByIdFunction(id_user);
    if (searchUser.success && updateRegister.success) {
      user.email = searchUser.data[0].mail
      user.username = searchUser.data[0].mail;
      user.password = `${searchUser.data[0].last_names.charAt(0).toUpperCase() + searchUser.data[0].last_names.slice(1)}${numberRandom}*`
      user.id_user = id_user;
      const updateLogin = await updateLoginUserCoach(user);
      if (updateLogin.success) {
        const sendMail = await sendEmailFunction({ name: nombre, username: user.username, password: user.password, email: user.email, type: 'approved', role_user: role_user })
        return res.json(responseQueries.success({ message: "Success approvade", data: sendMail }));
      }
    } else {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
  }
}

// Denegar solicitud de registro
export const deniedSolitude = async (req, res) => {
  const { id_solitude, id_user, role_user, nombre } = req.body;
  if (role_user == 'athlete') {
    const deleteRegister = await deleteSolitude(id_solitude);
    if (deleteRegister.error) {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
    const searchUser = await getAthleteByIdFunction(id_user);
    if (searchUser.error) {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
    const deleteLogin = await deleteLoginUserAthlete(id_user);
    const deleteUser = await deleteAthleteByIdFunction(id_user);
    if (deleteLogin.success && deleteUser.success) {
      const sendMail = await sendEmailFunction({ name: nombre, email: searchUser.data[0].mail, type: 'denied', role_user: role_user })
      return res.json(responseQueries.success({ message: "Success denied", data: sendMail }));
    } else {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
  }
  if (role_user == 'coach') {
    const deleteRegister = await deleteSolitude(id_solitude);
    if (deleteRegister.error) {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
    const searchUser = await getCoachByIdFunction(id_user);
    if (searchUser.error) {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
    const deleteLogin = await deleteLoginUserCoach(id_user);
    const deleteUser = await deleteCoachByIdFunction(id_user);
    if (deleteLogin.success && deleteUser.success) {
      const sendMail = await sendEmailFunction({ name: nombre, email: searchUser.data[0].mail, type: 'denied', role_user: role_user })
      return res.json(responseQueries.success({ message: "Success denied", data: sendMail }));
    } else {
      return res.json(responseQueries.error({ message: "Error query" }));
    }
  }
}


//Obtener todas las solicitudes de registro
export const getSolitudeUsers = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`
    SELECT sr.id id_solitude, cu.id_club, lu.id_coach id_user, lu.role_user,
    CONCAT(IFNULL(cu.first_names, ''), ' ', IFNULL(cu.last_names, '')) AS nombre, lu.username, sr.verify
    FROM ${db}.coach_user cu
    INNER JOIN ${db}.login_users lu ON lu.id_coach = cu.id
    INNER JOIN ${db}.solitude_register sr ON sr.id_user = lu.id_user
    WHERE sr.verify = 0
    UNION ALL
    SELECT sr.id id_solitude, au.id_club, lu.id_athlete id_user, lu.role_user,
    CONCAT(IFNULL(au.first_names, ''), ' ', IFNULL(au.last_names, '')) AS nombre, lu.username, sr.verify
    FROM ${db}.athletes_user au
    INNER JOIN ${db}.login_users lu ON lu.id_athlete = au.id
    INNER JOIN ${db}.solitude_register sr ON sr.id_user = lu.id_user
    WHERE sr.verify = 0;
  `);
  if (!select) return res.json(responseQueries.error({ message: "Error query" }));
  return res.json(responseQueries.success({ message: "Success", data: select[0] }));
}
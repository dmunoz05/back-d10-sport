import { createSolitudLoginUser, createSolitudeRegisterUser, validateNotRegisterMail } from "./users.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { updateLoginUser } from "./solitud_register.controller.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { generateToken } from "../../utils/token/handle-token.js";
import getConnection from "../../database/connection.mysql.js";
import { sendEmailFunction } from "../../lib/api/email.api.js";
import { getClubByIdFunction } from "./club.controller.js";

// Obtener todos los deportistas
export const getAthletes = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.athlete_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Filtrar deportista por id
export const getAthleteById = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const id = req.params.id;
  const select = await conn.query(`SELECT * FROM ${db}.athlete_user WHERE id = ?`, [id]);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Funcion para filtrar deportista por id
export async function getAthleteByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`
    SELECT id, id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family
    FROM ${db}.athlete_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Funcion para eliminar deportista por id
export async function deleteAthleteByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`DELETE FROM ${db}.athlete_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Registro de deportista
export const registerAthlete = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family } = req.body
  try {
    const existMail = await validateNotRegisterMail(mail);
    if (existMail.success) {
      return res.json(responseQueries.error({ message: existMail.message }))
    }
    const insertLogin = await createSolitudLoginUser({ email: mail })
    if (insertLogin.success) {
      const insert = await pool.query(`INSERT INTO ${db}.athlete_user
        (id_user, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [insertLogin.data.insertId, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family])
      if (insert[0].affectedRows === 0) {
        return res.json(responseQueries.error({ message: "Uninserted records" }))
      }
      let user = {}
      const numberRandom = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      user.name = `${first_names} ${last_names}`
      user.email = mail;
      user.username = mail;
      user.password = `${last_names.charAt(0).toUpperCase() + last_names.slice(1)}${numberRandom}*`
      user.id_user = insertLogin.data.insertId;
      const updateLogin = await updateLoginUser(user);
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
          role: 'athlete'
        })
        const sendMail = await sendEmailFunction({ name: user.name, username: tokenUsername, password: tokenPassword, email: user.email, type: 'approved', role_user: tokenRole })
        return res.json(responseQueries.success({ message: "Success approvade", data: sendMail }));
      }
    } else {
      return res.json(responseQueries.error({ message: insertLogin.message }))
    }
  } catch (error) {
    res.json(responseQueries.error({
      message: error?.message || "Error inserting",
    }))
  }
}


// Solicitud de registro anterior
export const solitudeRegisterAthlete = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family } = req.body
  try {
    const insert = await pool.query(`INSERT INTO ${db}.athlete_user
      (id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family])

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    const insertLogin = await createSolitudLoginUser({ role_user: 'athlete' })
    if (insertLogin.success) {
      let nameComplete = `${first_names.charAt(0).toUpperCase() + first_names.slice(1)} ${last_names.charAt(0).toUpperCase() + last_names.slice(1)}`
      let username = mail;
      let club = await getClubByIdFunction(id_club);
      if (club.error) {
        return res.json(responseQueries.error({ message: "Error connecting" }));
      }
      const insertSolitudeRegister = await createSolitudeRegisterUser({ id_user: insertLogin.data.insertId, username: username })
      if (insertSolitudeRegister.success) {
        const sendMailUser = await sendEmailFunction({ name: nameComplete, username: undefined, password: undefined, email: username, type: 'register_user', role_user: 'athlete' })
        const sendMailClub = await sendEmailFunction({ name: club.data[0].name_club, username: nameComplete, password: undefined, email: club.data[0].mail, type: 'register_club', role_user: 'athlete' })
        return res.json(responseQueries.success({
          message: "Success insert",
          data: [{ athleteId: insert[0].insertId, loginId: insertLogin.data.insertId, solitudeId: insertSolitudeRegister.data.insertId, sendMailUser: sendMailUser, sendMailClub: sendMailClub }]
        }))
      }
      return res.json(responseQueries.error({ message: insertSolitudeRegister.message }))
    } else {
      return res.json(responseQueries.error({ message: insertLogin.message }))
    }
  } catch (error) {
    res.json(responseQueries.error({
      message: error?.message || "Error inserting",
    }))
  }
}

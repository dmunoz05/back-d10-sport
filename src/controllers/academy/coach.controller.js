import { createSolitudLoginUser, createSolitudeRegisterUser, validateNotRegisterMail } from "./users.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";
import { sendEmailFunction } from "../../lib/api/email.api.js";
import { getClubByIdFunction } from "./club.controller.js";

// Obtener todos los entrenadores
export const getCoach = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.coach_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Filtrar entrenador por id
export const getCoachById = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const id = req.params.id;
  const select = await conn.query(`SELECT * FROM ${db}.coach_user WHERE id = ?`, [id]);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Funcion para filtrar entrenador por id
export async function getCoachByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`
    SELECT id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, licenses_obtained, other
    FROM ${db}.coach_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Funcion para eliminar entrenador por id
export async function deleteCoachByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`DELETE FROM ${db}.coach_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Filtrar entrenador
export const searchCoachFilter = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const filter = req.params.filter;
  const select = await conn.query(`SELECT id, first_names, last_names FROM ${db}.coach_user WHERE first_names LIKE '%${filter}%' OR last_names LIKE '%${filter}%'`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Insertar Entrenador
export const registerCoach = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, licenses_obtained, other } = req.body
  try {
    const existMail = await validateNotRegisterMail(mail, 'athlete_user');
    if (existMail.success) {
      return res.json(responseQueries.error({ message: existMail.message }))
    }
    const insert = await pool.query(`INSERT INTO ${db}.coach_user
      (id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, licenses_obtained, other)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, licenses_obtained, other])

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    const insertLogin = await createSolitudLoginUser({ id_athlete: null, id_coach: insert[0].insertId, id_club: null, role_user: 'coach' })
    if (insertLogin.success) {
      let nameComplete = `${first_names.charAt(0).toUpperCase() + first_names.slice(1)} ${last_names.charAt(0).toUpperCase() + last_names.slice(1)}`
      let username = mail;
      let club = await getClubByIdFunction(id_club);
      if (club.error) {
        return res.json(responseQueries.error({ message: "Error connecting" }));
      }
      const insertSolitudeRegister = await createSolitudeRegisterUser({ id_user: insertLogin.data.insertId, username: username })
      if (insertSolitudeRegister.success) {
        const sendMailUser = await sendEmailFunction({ name: nameComplete, username: undefined, password: undefined, email: username, type: 'register_user', role_user: 'coach' })
        const sendMailClub = await sendEmailFunction({ name: club.data[0].name_club, username: nameComplete, password: undefined, email: club.data[0].name_club, type: 'register_club', role_user: 'coach' })
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


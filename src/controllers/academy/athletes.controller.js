import { createSolitudLoginUser, createSolitudeRegisterUser } from "./users.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";
import { sendEmailFunction } from "../../lib/api/email.api.js";

// Obtener todos los deportistas
export const getAthletes = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.athletes_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Filtrar deportista por id
export const getAthleteById = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const id = req.params.id;
  const select = await conn.query(`SELECT * FROM ${db}.athletes_user WHERE id = ?`, [id]);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Funcion para filtrar deportista por id
  export async function getAthleteByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`
    SELECT id, id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family
    FROM ${db}.athletes_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Funcion para eliminar deportista por id
export async function deleteAthleteByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`DELETE FROM ${db}.athletes_user WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Registro de deportista
export const registerAthlete = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family } = req.body
  try {
    const insert = await pool.query(`INSERT INTO ${db}.athletes_user
      (id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [id_club, first_names, last_names, gender, date_birth, country, city, contact, mail, social_networks, academic_level, first_names_family, last_names_family, contact_family])

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    const insertLogin = await createSolitudLoginUser({ id_athlete: insert[0].insertId, id_coach: null, id_club: null, role_user: 'athlete' })
    if (insertLogin.success) {
      let nameComplete = `${first_names.charAt(0).toUpperCase() + first_names.slice(1)} ${last_names.charAt(0).toUpperCase() + last_names.slice(1)}`
      let username = mail;
      const insertSolitudeRegister = await createSolitudeRegisterUser({ id_user: insertLogin.data.insertId, username: username })
      if (insertSolitudeRegister.success) {
        const sendMail = await sendEmailFunction({ name: nameComplete, username: undefined, password: undefined, email: mail, type: 'register', role_user: 'athlete' })
        return res.json(responseQueries.success({
          message: "Success insert",
          data: [{ athleteId: insert[0].insertId, loginId: insertLogin.data.insertId, solitudeId: insertSolitudeRegister.data.insertId, sendMail: sendMail }]
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

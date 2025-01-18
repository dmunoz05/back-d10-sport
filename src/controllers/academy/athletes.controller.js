import { createSolitudLoginUser, createSolitudeRegisterUser } from "./users.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";

export const getAthletes = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.athletes_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
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
      let username = `${first_names.replace(/\s/g, '').toLowerCase()}${last_names.replace(/\s/g, '').toLowerCase()}`
      const insertSolitudeRegister = await createSolitudeRegisterUser({ id_user: insertLogin.data.insertId, username: username })
      if (insertSolitudeRegister.success) {
        return res.json(responseQueries.success({
          message: "Success insert",
          data: [{ athleteId: insert[0].insertId, loginId: insertLogin.data.insertId, solitudeId: insertSolitudeRegister.data.insertId }]
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

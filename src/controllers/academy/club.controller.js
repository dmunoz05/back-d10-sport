import { createSolitudLoginUser, createSolitudeRegisterUser } from "./users.controller.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";

// Obtener todos los clubes
export const getClub = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.club`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Filtrar club por id
export const getClubById = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const id = req.params.id;
  const select = await conn.query(`SELECT * FROM ${db}.club WHERE id = ?`, [id]);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Function para filtrar club por id
export async function getClubByIdFunction(id) {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT id, name_club, mail, city, country, president FROM ${db}.club WHERE id = ?`, [id]);
  if (!select) return responseQueries.error({ message: "Error connecting" });
  return responseQueries.success({ data: select[0] });
}

// Filtrar Club
export const searchClubFilter = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const filter = req.params.filter;
  const select = await conn.query(`SELECT id, name_club, president FROM ${db}.club WHERE name_club LIKE '%${filter}%'`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Registro de club
export const registerClub = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { name_club, date_founded, country, city, president, comet, contact, mail, social_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites } = req.body
  try {
    const insert = await pool.query(`INSERT INTO ${db}.club
      (name_club, date_founded, country, city, president, comet, contact, mail, socal_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name_club, date_founded, country, city, president, comet, contact, mail, social_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites]);

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    const insertLogin = await createSolitudLoginUser({ id_athlete: null, id_coach: null, id_club: insert[0].insertId, role_user: 'club' })
    if (insertLogin.success) {
      let username = mail;
      const insertSolitudeRegister = await createSolitudeRegisterUser({ id_user: insertLogin.data.insertId, username: username })
      if (insertSolitudeRegister.success) {
        return res.json(responseQueries.success({
          message: "Success insert",
          data: [{ clubId: insert[0].insertId, loginId: insertLogin.data.insertId, solitudeId: insertSolitudeRegister.data.insertId }]
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

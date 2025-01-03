import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// Obtener todos los clubes
export const getClub = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.club_user`);
  if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
  return res.json(responseQueries.success({ data: select[0] }));
}

// Registro de club
export const registerClub = async (req, res) => {
  const pool = await getConnection()
  const db = variablesDB.academy
  const { name_club, date_founded, country, city, president, comet, contact, mail, social_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites } = req.body
  try {
    const insert = await pool.query(`INSERT INTO ${db}.club_user
      (name_club, date_founded, country, city, president, comet, contact, mail, socal_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name_club, date_founded, country, city, president, comet, contact, mail, social_networks, website, number_athletes, categories, local_league, national_tournament, u13_u15_u17_u20, number_coaches, assistants, interns, venues, sites]);

    if (insert[0].affectedRows === 0) {
      return res.json(responseQueries.error({ message: "Uninserted records" }))
    }
    res.json(responseQueries.success({
      message: "Success insert",
      data: [{ insertId: insert[0].insertId }]
    }))
  } catch (error) {
    res.json(responseQueries.error({
      message: error?.message || "Error inserting",
    }))
  }
}

import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/const.database.js";

export const getClub = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;

  const select = await conn.query(`SELECT * FROM ${db}.club_user`);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}

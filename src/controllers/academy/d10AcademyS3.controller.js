import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/const.database.js";

export const getD10Academy = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;

  const select = await conn.query(`SELECT * FROM ${db}.d10AcademyS3`);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}

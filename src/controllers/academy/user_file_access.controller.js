import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/const.database.js";

export const getUserFileAccess = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;

  const select = await conn.query(`SELECT * FROM ${db}.user_files_access`);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}



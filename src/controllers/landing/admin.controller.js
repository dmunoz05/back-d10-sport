import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";

export const getAdminPage = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const select = await conn.query(`SELECT * FROM ${db}.userAdmin`);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}

export const validLoginAdminLanding = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { user, password } = req.body;
  const select = await conn.query(`SELECT * FROM ${db}.userAdmin WHERE email = ? AND password = ?`, [user, password]);
  if (!select || select[0].length === 0) {
    return res.json({
      status: 401,
      message: 'Unauthorized'
    });
  }
  if (select[0].length > 0) {
    return res.json({
      status: 200,
      message: 'Authorized'
    });
  }
  return res.json(select[0]);
}
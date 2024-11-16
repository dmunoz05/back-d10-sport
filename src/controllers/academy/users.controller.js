import getConnection from "../../database/connection.mysql.js";

export const getUsers = async (req, res) => {
  const conn = await getConnection();
  const select = await conn.query('SELECT * FROM users');
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}
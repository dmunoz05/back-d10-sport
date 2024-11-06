import getConnection from "../database/connection.mysql.js";

export const ConexionVerify = async (req, res, next) => {
  const conn = await getConnection();
  if (!conn) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  next()
}
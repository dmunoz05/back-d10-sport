import connectionMysql from "../config/database.js";

// Obtener respuesta de la conexion a la base de datos
const getConnection = async () => {
  try {
    const pool = await connectionMysql();
    const ping = await pool.promise().query('SELECT 1');
    if (!ping) {
      return false;
    }
    return pool;
  } catch (error) {
    return false;
  }
}

export default getConnection;
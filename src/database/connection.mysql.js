import mysql2 from 'mysql2';

// Connects to the Mysql database
const connectionMysql = async () => {
  try {
    const connection = mysql2.createConnection({
      host: process.env.MYSQL_HOST || '',
      user: process.env.MYSQL_USER || '',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || ''
    });
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
}

// Obtener respuesta de la conexion
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
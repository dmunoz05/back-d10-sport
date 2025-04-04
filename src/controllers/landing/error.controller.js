import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de error
export const saveDataError = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { section_one } = req.body;
  const query = `
    INSERT INTO ${db}.parametersError
    (section_one)
    VALUES(?)`;
  const insert = await conn.query(query, [
    JSON.stringify(section_one)
  ]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error guardando los datos'
  });
  return res.json({
    status: 200,
    message: 'Datos guardados con éxito',
  });
}

// Actualizar datos de error
export const getDataError = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one
    FROM ${db}.parametersError`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}
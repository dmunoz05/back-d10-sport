import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de diseño
export const saveDataLayout = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { section_one, section_two } = req.body;
  const query = `
    INSERT INTO ${db}.parametersLayout
    (section_one, section_two)
    VALUES(?, ?)`;
  const insert = await conn.query(query, [
    JSON.stringify(section_one), JSON.stringify(section_two)
  ]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json({
    status: 200,
    message: 'Datos guardados con éxito',
  });
}

// Actualizar datos de diseño
export const getDataMaintenance = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, maintenance
    FROM ${db}.parametersLayout`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}

// Actualizar datos de diseño
export const getDataLayout = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, header, footer, maintenance, dark_mode
    FROM ${db}.parametersLayout`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}
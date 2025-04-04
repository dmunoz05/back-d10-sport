import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de servicios
export const saveDataServices = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { section_one, section_two, section_three, section_four } = req.body;
  const query = `
    INSERT INTO ${db}.parametersServices
    (section_one, section_two, section_three, section_four)
    VALUES(?, ?, ?, ?)`;
  const insert = await conn.query(query, [
    JSON.stringify(section_one), JSON.stringify(section_two),
    JSON.stringify(section_three), JSON.stringify(section_four)
  ]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json({
    status: 200,
    message: 'Datos insertados con éxito',
  });
}

// Actualizar datos de servicios
export const getDataServices = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one, section_two, section_three, section_four
    FROM ${db}.parametersServices`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}
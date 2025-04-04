import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de quienes somos
export const saveDataAboutUs = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { section_one, section_two, section_three, section_four, section_five, section_six } = req.body;
  const query = `
    INSERT INTO ${db}.parametersAboutUs
    (section_one, section_two, section_three, section_four, section_five, section_six)
    VALUES(?, ?, ?, ?, ?, ?)`;
  const insert = await conn.query(query, [
    JSON.stringify(section_one), JSON.stringify(section_two), JSON.stringify(section_three),
    JSON.stringify(section_four), JSON.stringify(section_five), JSON.stringify(section_six)
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

// Actualizar datos de quienes somos
export const getDataAboutUs = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one, section_two, section_three, section_four, section_five, section_six
    FROM ${db}.parametersAboutUs`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obtendiendo los datos'
  });
  return res.json(select[0]);
}
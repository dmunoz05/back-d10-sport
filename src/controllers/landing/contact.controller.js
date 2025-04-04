import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de contacto
export const saveDataContact = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { json } = req.body;
  const query = `
    INSERT INTO ${db}.parametersContact
    (section_one)
    VALUES(?)`;
  const insert = await conn.query(query, [JSON.stringify(json)]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error guardando los datos'
  });
  return res.json({
    status: 200,
    message: 'Data inserted'
  });
}

// Actualizar datos de contacto
export const getDataContact = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one
    FROM ${db}.parametersContact`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}
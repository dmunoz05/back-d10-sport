import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de noticias
export const saveDataNews = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { json } = req.body;
  const query = `
    INSERT INTO ${db}.parametersNews
    (section_one)
    VALUES(?)`;
  const insert = await conn.query(query, [JSON.stringify(json)]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json({
    status: 200,
    message: 'Datos insertados con éxito',
  });
}

// Actualizar datos de noticias
export const getDataNews = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one
    FROM ${db}.parametersNews`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}

// Actualizar datos de noticias
export const getDataLastNews = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one
    FROM ${db}.parametersNews`;
  const select = await conn.query(query);
  const { section_one } = select[0][0];
  const data = section_one.news.new1;
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(data);
}

// -----------------------------------------------------------------
// ------------ Re-estructuración de consultas de News -------------
// -----------------------------------------------------------------

export const getDataReNews = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT 
    id, title, description, image, DATE_FORMAT(date, '%Y-%m-%d') as date, category_id 
    FROM ${db}.news;`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}

export const getDataNewsCategories = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT *
    FROM ${db}.news_categories`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}

export const getDataLastReNews = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, title, description, image, DATE_FORMAT(date, '%Y-%m-%d') as date, category_id 
    FROM ${db}.news
    ORDER BY date DESC
    LIMIT 1;`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error obteniendo los datos'
  });
  return res.json(select[0]);
}
import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

export const saveDataCollections = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { json } = req.body;
  const query = `
    INSERT INTO ${db}.parametersCollections
    (section_one)
    VALUES(?)`;
  const insert = await conn.query(query, [JSON.stringify(json)]);
  if (!insert) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json({
    status: 200,
    message: 'Data inserted'
  });
}

export const getDataCollections = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one
    FROM ${db}.parametersCollections`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}
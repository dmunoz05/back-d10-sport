import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/const.database.js";


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
    message: 'Error connecting'
  });
  return res.json({
    status: 200,
    message: 'Data inserted'
  });
}


export const getDataServices = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one, section_two, section_three, section_four
    FROM ${db}.parametersServices`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}
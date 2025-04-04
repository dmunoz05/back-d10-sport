import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { generateToken } from "../../utils/token/handle-token.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js"

// Guardar datos de Inicio
export const saveDataHome = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const { section_one, section_two, section_three, section_four, section_five, section_six } = req.body;
  const query = `
    INSERT INTO ${db}.parametersHome
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

// Actualizar datos de Inicio
export const getDataHome = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT id, section_one, section_two, section_three, section_four, section_five, section_six
    FROM ${db}.parametersHome`;

  const select = await conn.query(query);

  if (!select || select.length === 0) {
    return res.json(responseQueries.error({ message: "Error obteniendo los datos" }));
  }

  const encryptedData = await generateToken({ sub: select[0][0].id, data: select[0] });

  return res.json(responseQueries.success({ data: encryptedData }));
};
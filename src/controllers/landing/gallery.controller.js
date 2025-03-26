import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";

// Guardar datos de galería
export const getDataGallery = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.landing;
    const query = `
      SELECT id, section_one
      FROM ${db}.parametersGallery`;
    const select = await conn.query(query);
    if (!select) return res.json({
        status: 500,
        message: 'Error connecting'
    });
    return res.json(select[0]);
}
import getConnection from "../../database/connection.mysql.js"
import { variablesDB } from "../../utils/params/const.database.js";
import fetch from "node-fetch";

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
    message: 'Error connecting'
  });
  return res.json({
    status: 200,
    message: 'Data inserted'
  });
}

export const getDataHome = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.landing;
  const query = `
    SELECT section_one, section_two, section_three, section_four, section_five, section_six
    FROM ${db}.parametersHome`;
  const select = await conn.query(query);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}

// -----------------------------------
// -------------- Proxy --------------
// -----------------------------------

export const getProxyHome = async (req, res) => {
  try {
    const conn = await getConnection();
    const db = variablesDB.landing;

    const query = `
      SELECT 
        JSON_EXTRACT(section_one, '$.bg_photo') AS section_one_bg,
        JSON_EXTRACT(section_two, '$.bg_photo') AS section_two_bg,
        JSON_EXTRACT(section_four, '$.collection[0].photo') AS section_four_photo_1,
        JSON_EXTRACT(section_four, '$.collection[1].photo') AS section_four_photo_2,
        JSON_EXTRACT(section_four, '$.collection[2].photo') AS section_four_photo_3,
        JSON_EXTRACT(section_four, '$.collection[3].photo') AS section_four_photo_4,
        JSON_EXTRACT(section_four, '$.collection[4].photo') AS section_four_photo_5,
        JSON_EXTRACT(section_five, '$.bg_photo') AS section_five_bg,
        JSON_EXTRACT(section_six, '$.icons[0].icon') AS section_six_icon_1,
        JSON_EXTRACT(section_six, '$.icons[1].icon') AS section_six_icon_2
      FROM ${db}.parametersHome`;

    const [rows] = await conn.query(query);

    if (!rows.length) {
      return res.status(404).json({ error: "No se encontraron imágenes o videos" });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error("Error en el proxy de imágenes y videos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getImageProxy = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Falta la URL de la imagen" });

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener la imagen");

    res.setHeader("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);

  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Video

export const getProxyVideo = async (req, res) => {
  try {
    const conn = await getConnection();
    const db = variablesDB.landing;

    const query = `SELECT JSON_EXTRACT(section_three, '$.video') AS video FROM ${db}.parametersHome`;
    const [rows] = await conn.query(query);

    if (!rows.length || !rows[0].video) {
      return res.status(404).json({ error: "Video no encontrado" });
    }

    res.json({ videoUrl: rows[0].video });
  } catch (error) {
    console.error("Error en el proxy de video:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getVideoStream = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Falta la URL del video" });

    console.log("🔄 Descargando video:", url);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener el video");

    res.setHeader("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (error) {
    console.error("Error al obtener el video:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

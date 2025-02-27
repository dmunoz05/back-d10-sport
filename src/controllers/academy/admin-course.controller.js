import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

export const getAdminCourseAcademy = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`SELECT * FROM ${db}.course_user`);
  if (!select) return res.json({
    status: 500,
    message: 'Error connecting'
  });
  return res.json(select[0]);
}

export const saveAdminCourse = async (req, res) => {
  const { course_title, description_course } = req.body;
  const main_photo = JSON.stringify({ bg_photo: "https://landing-page-d10.s3.sa-east-1.amazonaws.com/icons/logo_company.png" });
  if (!course_title || !description_course) {
    return res.json(responseQueries.error({ message: "Datos incompletos" }));
  }
  const conn = await getConnection();
  const db = variablesDB.academy;
  const insert = await conn.query(
    `INSERT INTO ${db}.course_user (course_title, main_photo, description_course) VALUES (?, ?, ?)`,
    [course_title, main_photo, description_course]
  );
  if (!insert) return res.json(responseQueries.error({ message: "Error al crear curso" }));
  return res.json(responseQueries.success({ message: "Curso creado con éxito" }));
};

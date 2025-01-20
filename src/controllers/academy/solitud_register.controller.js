import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";

//Obtener todos los usuarios
export const getSolitudeUsers = async (req, res) => {
  const conn = await getConnection();
  const db = variablesDB.academy;
  const select = await conn.query(`
    SELECT sr.id id_solitude, cu.id_club, lu.id_coach id_user, lu.role_user,
    CONCAT(IFNULL(cu.first_names, ''), ' ', IFNULL(cu.last_names, '')) AS nombre, lu.username, sr.verify
    FROM ${db}.coach_user cu
    INNER JOIN ${db}.login_users lu ON lu.id_coach = cu.id
    INNER JOIN ${db}.solitude_register sr ON sr.id_user = lu.id_user
    WHERE sr.verify = 0
    UNION ALL
    SELECT sr.id id_solitude, au.id_club, lu.id_athlete id_user, lu.role_user,
    CONCAT(IFNULL(au.first_names, ''), ' ', IFNULL(au.last_names, '')) AS nombre, lu.username, sr.verify
    FROM ${db}.athletes_user au
    INNER JOIN ${db}.login_users lu ON lu.id_athlete = au.id
    INNER JOIN ${db}.solitude_register sr ON sr.id_user = lu.id_user
    WHERE sr.verify = 0;
  `);
  if (!select) return res.json(responseQueries.error({ message: "Error query" }));
  return res.json(responseQueries.success({ message: "Success", data: select[0] }));
}
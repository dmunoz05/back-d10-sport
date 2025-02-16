import { responseQueries } from "../../common/enum/queries/response.queries.js";
import { variablesDB } from "../../utils/params/const.database.js";
import getConnection from "../../database/connection.mysql.js";


// Obtener rol de usuario
export async function getRoleUser(id) {
  const pool = await getConnection()
  const db = variablesDB.academy
  try {
      const response = await pool.query(`SELECT rs.name_role, ru.id_role FROM ${db}.role_user ru
        INNER JOIN ${db}.role_system rs ON ru.id_role = rs.id
        WHERE ru.id_user = ?;`, [id])
      if (response[0].length === 0) {
          return responseQueries.error({
              message: "Error query",
              data: response[0]
          });
      }
      return responseQueries.success({
          message: "Success query",
          data: response[0]
      });
  } catch (error) {
      return responseQueries.error({
          message: "Error query",
          error
      });
  }
}

// Obtener id de rol
export async function getIdRole(role) {
  const pool = await getConnection()
  const db = variablesDB.academy
  try {
      const response = await pool.query(`SELECT id FROM ${db}.role_system rs where rs.name_role = '${role}';`)
      if (response[0].length === 0) {
          return responseQueries.error({
              message: "Error query",
              data: response[0]
          });
      }
      return responseQueries.success({
          message: "Success query",
          data: response[0]
      });
  } catch (error) {
      return responseQueries.error({
          message: "Error query",
          error
      });
  }
}

// Insertar rol de usuario
export async function createRoleUser(data) {
  const { id_user, id_role } = data
  const pool = await getConnection()
  const db = variablesDB.academy
  try {
      const response = await pool.query(`INSERT INTO ${db}.role_user
        (id_user, id_role) VALUES(?, ?);`, [id_user, id_role])
      if (response[0].affectedRows === 0) {
          return responseQueries.error({
              message: "Error insert",
              data: response[0]
          });
      }
      return responseQueries.success({
          message: "Success insert",
          data: response[0]
      });
  } catch (error) {
      return responseQueries.error({
          message: "Error insert",
          error
      });
  }
}
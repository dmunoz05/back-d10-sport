import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ---------------------------- Save News ------------------------------ 
// -----------------------------------------------------------------------

export const saveNews = async (req, res) => {
    try {

        const { id } = req.params;
        const { date, image, title, description } = req.body;

        if (!id || !date || !image || !title || !description) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const updateQuery = `
            UPDATE ${db}.parametersNews
            SET section_one = JSON_SET(
                section_one,
                CONCAT('$.news.new', JSON_LENGTH(section_one->'$.news') + 1),
                JSON_OBJECT('date', ?, 'image', ?, 'title', ?, 'description', ?)
            )
            WHERE id = ?;
        `;

        const [result] = await conn.query(updateQuery, [date, image, title, description, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la sección o no se actualizó" }));
        }

        return res.json(responseQueries.success({ message: "Noticia agregada correctamente" }));
    } catch (error) {
        console.error("Error al guardar la noticia:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};

// -----------------------------------------------------------------------
// --------------------------- Update News ----------------------------
// -----------------------------------------------------------------------

export const updateNews = async (req, res) => {
    console.log("updateNews ejecutándose"); // ✅ Verifica si entra a la función
    console.log("Body recibido:", req.body); // ✅ Verifica qué datos están llegando
    try {
        const { id } = req.params;
        const { index, date, image, title, description } = req.body;

        if (!id || index === undefined || !date || !image || !title || !description) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const updateQuery = `
            UPDATE ${db}.parametersNews
            SET section_one = JSON_SET(
                section_one,
                CONCAT('$.news.new', ?),
                JSON_OBJECT('date', ?, 'image', ?, 'title', ?, 'description', ?)
            )
            WHERE id = ?;
        `;

        const [result] = await conn.query(updateQuery, [index, date, image, title, description, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la noticia o el índice no es válido" }));
        }

        return res.json(responseQueries.success({ message: "Noticia actualizada correctamente" }));
    } catch (error) {
        console.error("Error al actualizar la noticia:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};


// -----------------------------------------------------------------------
// --------------------------- Delete News ----------------------------- 
// -----------------------------------------------------------------------

export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { index } = req.body;

        if (!id || index === undefined) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const deleteQuery = `
            UPDATE ${db}.parametersNews
            SET section_one = JSON_REMOVE(section_one, CONCAT('$.news.new', ?))
            WHERE id = ?;
        `;

        const [result] = await conn.query(deleteQuery, [index, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la noticia o el índice no es válido" }));
        }

        return res.json(responseQueries.success({ message: "Noticia eliminada correctamente" }));
    } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};

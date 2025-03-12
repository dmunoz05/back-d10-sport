import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ---------------------------- Save GAllery -----------------------------
// -----------------------------------------------------------------------

export const saveGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        if (!id || !imageUrl) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const updateQuery = `
            UPDATE ${db}.parametersGallery
            SET section_one = JSON_ARRAY_APPEND(section_one, '$', JSON_OBJECT('gallery', ?))
            WHERE id = ?;
        `;

        const [result] = await conn.query(updateQuery, [imageUrl, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la galería o no se actualizó" }));
        }

        return res.json(responseQueries.success({ message: "Imagen agregada a la galería correctamente" }));
    } catch (error) {
        console.error("Error al guardar en la galería:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};

// -----------------------------------------------------------------------
// --------------------------- Update Gallery ----------------------------
// -----------------------------------------------------------------------

export const updateGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { index, imageUrl } = req.body;

        if (!id || index === undefined || !imageUrl) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const updateQuery = `
            UPDATE ${db}.parametersGallery
            SET section_one = JSON_REPLACE(section_one, '$[?].gallery', ?)
            WHERE id = ?;
        `;

        const [result] = await conn.query(updateQuery, [index, imageUrl, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la galería o el índice no es válido" }));
        }

        return res.json(responseQueries.success({ message: "Imagen actualizada correctamente" }));
    } catch (error) {
        console.error("Error al actualizar la imagen en la galería:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};

// -----------------------------------------------------------------------
// --------------------------- Delete Gallery ----------------------------
// -----------------------------------------------------------------------

export const deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { index } = req.body;

        if (!id || index === undefined) {
            return res.json(responseQueries.error({ message: "Datos incompletos" }));
        }

        const conn = await getConnection();
        const db = variablesDB.landing;

        const deleteQuery = `
            UPDATE ${db}.parametersGallery
            SET section_one = JSON_REMOVE(section_one, '$[?]')
            WHERE id = ?;
        `;

        const [result] = await conn.query(deleteQuery, [index, id]);

        if (result.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró la galería o el índice no es válido" }));
        }

        return res.json(responseQueries.success({ message: "Imagen eliminada correctamente" }));
    } catch (error) {
        console.error("Error al eliminar la imagen en la galería:", error);
        return res.json(responseQueries.error({ message: "Error interno del servidor" }));
    }
};
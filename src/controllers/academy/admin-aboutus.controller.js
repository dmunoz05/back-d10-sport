import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ---------------------- Update AboutUs Conocenos -----------------------
// -----------------------------------------------------------------------

export const updateAdminAboutUsConocenos = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersAboutUs 
             SET section_one = JSON_SET(section_one, 
                '$.title', ?,
                '$.description', ?)
             WHERE id = ?`,
            [title, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};

// -----------------------------------------------------------------------
// ----------------------- Update AboutUs Fundador -----------------------
// -----------------------------------------------------------------------

export const updateAdminAboutUsFundador = async (req, res) => {
    const { id } = req.params;
    const { title1, title2, subtitle, description } = req.body;

    if (!id || !title1 || !title2 || !subtitle || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersAboutUs 
             SET section_two = JSON_SET(section_two, 
                '$.title1', ?, 
                '$.title2', ?, 
                '$.subtitle', ?,
                '$.description', ?)
             WHERE id = ?`,
            [title1, title2, subtitle, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};

// -----------------------------------------------------------------------
// ------------------------ Update AboutUs Objetivos ---------------------
// -----------------------------------------------------------------------

export const updateAdminAboutUsObjetivos = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersAboutUs 
             SET section_three = JSON_SET(section_three, 
                '$.title', ?, 
                '$.description', ?)
             WHERE id = ?`,
            [title, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};

// -----------------------------------------------------------------------
// ------------------------- Update AboutUs Misión -----------------------
// -----------------------------------------------------------------------

export const updateAdminAboutUsMision = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersAboutUs 
             SET section_four = JSON_SET(section_four, 
                '$.title', ?,
                '$.description', ?)
             WHERE id = ?`,
            [title, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};

// -----------------------------------------------------------------------
// ------------------------- Update AboutUs Vision -----------------------
// -----------------------------------------------------------------------

export const updateAdminAboutUsVision = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersAboutUs 
             SET section_four = JSON_SET(section_four, 
                '$.title', ?, 
                '$.description', ?)
             WHERE id = ?`,
            [title, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};
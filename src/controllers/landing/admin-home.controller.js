import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ----------------------------- Update Inicio ---------------------------
// -----------------------------------------------------------------------

export const updateAdminHome = async (req, res) => {
    const { id } = req.params;
    const { slogan, company, slogan_two, slogan_three } = req.body;

    if (!id || !slogan || !company || !slogan_two || !slogan_three) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_one = JSON_SET(section_one, 
                '$.slogan', ?, 
                '$.company', ?, 
                '$.slogan_two', ?, 
                '$.slogan_three', ?)
             WHERE id = ?`,
            [slogan, company, slogan_two, slogan_three, id]
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
// ----------------------------- Update Nosotros ---------------------------
// -----------------------------------------------------------------------

export const updateAdminNosotros = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_two = JSON_SET(section_two, 
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
// ----------------------------- Update Comercial ---------------------------
// -----------------------------------------------------------------------

export const updateAdminComercial = async (req, res) => {
    const { id } = req.params;
    const { video } = req.body;

    if (!id || !video) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_three = JSON_SET(section_three, 
                '$.video', ?)
             WHERE id = ?`,
            [video, id]
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
// ----------------------------- Update News ---------------------------
// -----------------------------------------------------------------------

export const updateAdminNews = async (req, res) => {
    const { id } = req.params;
    const { h1, title, description } = req.body;

    if (!id || !h1 || !title || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_four = JSON_SET(section_four, 
                '$.news.h1', ?, 
                '$.news.title', ?, 
                '$.news.description', ?)
             WHERE id = ?`,
            [h1, title, description, id]
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
// ----------------------------- Update Academia ---------------------------
// -----------------------------------------------------------------------

export const updateAdminAcademia = async (req, res) => {
    const { id } = req.params;
    const { title_1, title_2, text_link } = req.body;

    if (!id || !title_1 || !title_2 || !text_link) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_five = JSON_SET(section_five, 
                '$.title_1', ?, 
                '$.title_2', ?, 
                '$.text_link', ?)
             WHERE id = ?`,
            [title_1, title_2, text_link, id]
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
// ----------------------------- Update Aliados ---------------------------
// -----------------------------------------------------------------------

export const updateAdminAliados = async (req, res) => {
    const { id } = req.params;
    const { tile } = req.body;

    if (!id || !tile) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersHome 
             SET section_six = JSON_SET(section_six, 
                '$.tile', ?)
             WHERE id = ?`,
            [tile, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};

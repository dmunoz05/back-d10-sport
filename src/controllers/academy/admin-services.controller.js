import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ------------------------ Update Services Title ------------------------
// -----------------------------------------------------------------------

export const updateAdminServicesTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!id || !title) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersServices 
             SET section_one = JSON_SET(section_one, 
                '$.title', ?)
             WHERE id = ?`,
            [title, id]
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
// ------------------------- Update Services One -------------------------
// -----------------------------------------------------------------------

export const updateAdminServicesOne = async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    if (!id || !title || !subtitle || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersServices 
             SET section_two = JSON_SET(section_two, 
                '$.title', ?, 
                '$.subtitle', ?, 
                '$.description', ?)
             WHERE id = ?`,
            [title, subtitle, description, id]
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
// --------------------------- Update Services Two -----------------------
// -----------------------------------------------------------------------

export const updateAdminServicesTwo = async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    if (!id || !title || !subtitle || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersServices 
             SET section_three = JSON_SET(section_three, 
                '$.title', ?, 
                '$.subtitle', ?, 
                '$.description', ?)
             WHERE id = ?`,
            [title, subtitle, description, id]
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
// ------------------------- Update Services Three -----------------------
// -----------------------------------------------------------------------

export const updateAdminServicesThree = async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, description } = req.body;

    if (!id || !title || !subtitle || !description) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.landing;

        const update = await conn.query(
            `UPDATE ${db}.parametersServices 
             SET section_four = JSON_SET(section_four, 
                '$.title', ?, 
                '$.subtitle', ?, 
                '$.description', ?)
             WHERE id = ?`,
            [title, subtitle, description, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el registro" }));
        }

        return res.json(responseQueries.success({ message: "Datos actualizados con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar los datos", error }));
    }
};
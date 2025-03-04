import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ----------------------------- Update Class ----------------------------
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


import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

// -----------------------------------------------------------------------
// ----------------------------- Get Class -------------------------------
// -----------------------------------------------------------------------

export const getAdminClassAcademy = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT * FROM ${db}.course_user`);
    if (!select) return res.json({
        status: 500,
        message: 'Error connecting'
    });
    return res.json(select[0]);
}

// -----------------------------------------------------------------------
// ----------------------------- Post Class ------------------------------
// -----------------------------------------------------------------------

export const saveAdminClass = async (req, res) => {
    const { id_course, class_title, class_description, class_content } = req.body;

    if (!id_course || !class_title || !class_description || !class_content) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    let conn;
    try {
        conn = await getConnection();
        const db = variablesDB.academy;

        await conn.beginTransaction();

        const [insertContent] = await conn.query(
            `INSERT INTO ${db}.content_course (id_course, class_title, class_description, class_content) VALUES (?, ?, ?, ?)`,
            [id_course, class_title, class_description, JSON.stringify(class_content)]
        );

        if (!insertContent.insertId) {
            throw new Error("Error al insertar en content_course");
        }

        const lastContentId = insertContent.insertId;

        const [insertClass] = await conn.query(
            `INSERT INTO ${db}.class_course (id_course, id_content) VALUES (?, ?)`,
            [id_course, lastContentId]
        );

        if (!insertClass.affectedRows) {
            throw new Error("Error al insertar en class_course");
        }

        await conn.commit();

        return res.json(responseQueries.success({ message: "Clase creada con éxito" }));
    } catch (error) {
        if (conn) await conn.rollback();
        return res.json(responseQueries.error({ message: error.message }));
    } finally {
        if (conn) conn.release();
    }
};

// -----------------------------------------------------------------------
// ----------------------------- Delete Class ----------------------------
// -----------------------------------------------------------------------

export const deleteAdminClass = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            status: 400,
            message: 'El ID es obligatorio'
        });
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.academy;

        const result = await conn.query(`DELETE FROM ${db}.course_user WHERE id = ?`, [id]);

        if (result[0].affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Curso no encontrado'
            });
        }

        return res.json({
            status: 200,
            message: (`Curso #${id} eliminado correctamente`)
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar el curso',
            error: error.message
        });
    }
};

// -----------------------------------------------------------------------
// ----------------------------- Update Class ----------------------------
// -----------------------------------------------------------------------

export const updateAdminClass = async (req, res) => {
    const { id } = req.params;
    const { course_title, description_course } = req.body;

    if (!id || !course_title || !description_course) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    try {
        const conn = await getConnection();
        const db = variablesDB.academy;

        const update = await conn.query(
            `UPDATE ${db}.course_user SET course_title = ?, description_course = ? WHERE id = ?`,
            [course_title, description_course, id]
        );

        if (update.affectedRows === 0) {
            return res.json(responseQueries.error({ message: "No se encontró el curso" }));
        }

        return res.json(responseQueries.success({ message: "Curso actualizado con éxito" }));
    } catch (error) {
        return res.json(responseQueries.error({ message: "Error al actualizar curso", error }));
    }
};

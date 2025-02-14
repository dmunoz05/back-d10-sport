import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

export const getClassMenu = async (req, res) => {
    const { id_course } = req.query;
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT co.id AS class_id, cc.class_title, cc.class_description
    FROM ${db}.content_course cc
    INNER JOIN ${db}.class_course co ON co.id_content = cc.id
    WHERE cc.id_course = ?`, [id_course]);
    if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
    return res.json(responseQueries.success({ data: select[0] }));
}

export const getClassContent = async (req, res) => {
    const { id } = req.query;
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT * FROM ${db}.content_course WHERE id = ?`, [id]);
    if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
    return res.json(responseQueries.success({ data: select[0] }));
}

export const getClassComments = async (req, res) => {
    const { id_class } = req.query;
    const conn = await getConnection();
    const db = variablesDB.academy;

    const select = await conn.query(
        `SELECT cm.comment comentario, 
                COALESCE(CONCAT(au.first_names, ' ', au.last_names), cu.name_club, 'Usuario Desconocido') AS nombre, 
                lu.email correo
        FROM ${db}.comments_couser cm
        LEFT JOIN ${db}.login_users lu ON lu.id_user = cm.id_user
        LEFT JOIN ${db}.athlete_user au ON au.id = lu.id_athlete
        LEFT JOIN ${db}.coach_user ca ON ca.id = lu.id_coach
        LEFT JOIN ${db}.club_user cu ON cu.id = lu.id_club
        WHERE cm.id_class = ?`,
        [id_class]
    );

    if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
    return res.json(responseQueries.success({ data: select[0] }));
};

// ----------------------------------------

export const saveClassComment = async (req, res) => {
    const { id_class, comment, id_user } = req.body;
    if (!id_class || !comment || !id_user) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }
    const conn = await getConnection();
    const db = variablesDB.academy;
    const insert = await conn.query(
        `INSERT INTO ${db}.comments_couser (id_class, id_user, comment) VALUES (?, ?, ?)`,
        [id_class, id_user, comment]
    );
    if (!insert) return res.json(responseQueries.error({ message: "Error al guardar comentario" }));
    return res.json(responseQueries.success({ message: "Comentario publicado" }));
};
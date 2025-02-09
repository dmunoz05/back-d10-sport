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
    const { id_course } = req.query;
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT cm.comment comentario, CONCAT(au.first_names, ' ', au.last_names) nombre, lu.email correo
    FROM ${db}.class_course cc
    INNER JOIN ${db}.comments_couser cm ON cm.id_class = cc.id
    LEFT JOIN ${db}.login_users lu ON lu.id_user = cm.id_user
    RIGHT JOIN ${db}.athletes_user au ON au.id = lu.id_athlete
    WHERE cc.id_course = ?
    UNION ALL
    SELECT cm.comment comentario, CONCAT(cu.first_names, ' ', cu.last_names) nombre, lu.email correo
    FROM ${db}.class_course cc
    INNER JOIN ${db}.comments_couser cm ON cm.id_class = cc.id
    LEFT JOIN ${db}.login_users lu ON lu.id_user = cm.id_user
    INNER JOIN ${db}.coach_user cu ON cu.id = lu.id_coach
    WHERE cc.id_course = ?
    UNION ALL
    SELECT cm.comment comentario, cu.name_club nombre, lu.email correo
    FROM ${db}.class_course cc
    INNER JOIN ${db}.comments_couser cm ON cm.id_class = cc.id
    LEFT JOIN ${db}.login_users lu ON lu.id_user = cm.id_user
    INNER JOIN ${db}.club_user cu ON cu.id = lu.id_club
    WHERE cc.id_course = ?`, [id_course, id_course, id_course]);
    if (!select) return res.json(responseQueries.error({ message: "Error connecting" }));
    return res.json(responseQueries.success({ data: select[0] }));
}
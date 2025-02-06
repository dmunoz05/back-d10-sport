import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";

export const getClassAcademy = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.academy;
    const { id_course } = req.params;

    const select = await conn.query(
        `SELECT cc.id, cc.class_title, cc.class_description, cc.class_content, 
                co.id AS class_id, co.id_course, 
                cm.id AS comment_id, cm.id_user, cm.comment 
        FROM ${db}.content_course cc
        INNER JOIN ${db}.class_course co ON co.id_content = cc.id
        LEFT JOIN ${db}.comments_couser cm ON cm.id_class = co.id
        WHERE cc.id_course = ?`, [id_course]
    );

    if (!select) {
        return res.json({ status: 500, message: 'Error connecting' });
    }
    return res.json(select[0]);
};


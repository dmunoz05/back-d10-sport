import getConnection from "../../database/connection.mysql.js";
import { variablesDB } from "../../utils/params/const.database.js";
import { responseQueries } from "../../common/enum/queries/response.queries.js";

export const getUsersFromClub = async (req, res) => {
    const { id_club } = req.query;
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT id_user, first_names, last_names, gender, city, contact, mail, social_networks from ${db}.coach where id_club = ?`, [id_club]);
    if (!select) return res.json(responseQueries.error({ message: "Error obteniendo las clases" }));
    return res.json(responseQueries.success({ data: select[0] }));
}

export const getAllUsers = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.academy;
    const select = await conn.query(`SELECT id_user, first_names, last_names, gender, city, contact, mail, social_networks 
    FROM ${db}.athlete
    UNION
    SELECT id_user, first_names, last_names, gender, city, contact, mail, social_networks
    FROM ${db}.coach
    UNION
    SELECT id_user, president AS first_names, name_club AS last_names, NULL AS gender, city, contact, mail, social_networks 
    FROM ${db}.club;`, []);
    if (!select) return res.json(responseQueries.error({ message: "Error obteniendo las clases" }));
    return res.json(responseQueries.success({ data: select[0] }));
}
import getConnection from "../database/connection.mongodb.js";


export const getConnect = async (req, res) => {
        const db = await getConnection();
        if (!db) {
                return res.json('Error');
        }
        if (db) {
                return res.json('Connect');
        }
}

export const getUsers = async (req, res) => {
        return res.json('Users');
}
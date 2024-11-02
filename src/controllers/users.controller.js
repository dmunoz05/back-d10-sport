import getConnection from "../database/connection.mysql.js";


export const getConnect = async (req, res) => {
        const conn = await getConnection();
        if (!conn) return res.json('Error conection');
        const select = await conn.promise().query('SELECT 1');
        return res.json({
                status: 200,
                message: 'Conected',
                query: select[0]
        });
}

export const getUsers = async (req, res) => {
        return res.json('Users');
}
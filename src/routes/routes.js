import express from 'express';
import { ConexionVerify } from '../middlewares/connection.js';
import { getUsers } from '../controllers/users.controller.js';
import { getConnect } from '../controllers/conection.controller.js';
const router = express();

export const routes = () => {
    router.get('/user/users', ConexionVerify, getUsers);
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
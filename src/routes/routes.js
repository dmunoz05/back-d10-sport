import express from 'express';
import { getUsers, getConnect } from '../controllers/users.controller.js';
const router = express();

export const routes = () => {
    router.get('/user/', getUsers);
    router.get('/conect/', getConnect);
    return router;
}
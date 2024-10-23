import express from 'express';
import { getUsers } from '../controllers/users.controller.js';
const router = express();

export const routes = () => {
    router.get('/api/v1/user/', getUsers);
    return router;
}
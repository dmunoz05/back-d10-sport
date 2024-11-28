import express from 'express';
import { ConexionVerify } from '../middlewares/connection.js';
import { getDataHome, saveDataHome } from '../controllers/landing/home.controller.js';
import { getDataAboutUs, saveDataAboutUs } from '../controllers/landing/aboutus.controller.js';
import { getDataServices, saveDataServices } from '../controllers/landing/services.controller.js';
import { getDataCollections, saveDataCollections } from '../controllers/landing/collections.controller.js';
import { getDataNews, saveDataNews } from '../controllers/landing/news.controller.js';
import { getAdminPage, validLoginAdmin } from '../controllers/landing/admin.controller.js';
import { getConnect } from '../database/conection.controller.js';
const router = express();

export const routes = () => {
    router.post('/landing/i/news', ConexionVerify, saveDataNews);
    router.get('/landing/g/news', ConexionVerify, getDataNews);
    router.get('/landing/g/collections', ConexionVerify, saveDataCollections);
    router.get('/landing/g/collections', ConexionVerify, getDataCollections);
    router.get('/landing/i/services', ConexionVerify, saveDataServices);
    router.get('/landing/g/services', ConexionVerify, getDataServices);
    router.get('/landing/i/aboutus', ConexionVerify, saveDataAboutUs);
    router.get('/landing/g/aboutus', ConexionVerify, getDataAboutUs);
    router.post('/landing/i/home', ConexionVerify, saveDataHome);
    router.get('/landing/g/home', ConexionVerify, getDataHome);
    router.post('/landing/admin/login', ConexionVerify, validLoginAdmin);
    router.get('/landing/admin/user', ConexionVerify, getAdminPage);
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
import express from 'express';
// Middlewares
import { ConexionVerify } from '../middlewares/connection.js';
import { AuthorizationVerify } from '../middlewares/authorization.js';

// Landing
import { getDataLayout, saveDataLayout } from '../controllers/landing/layout.controller.js';
import { getDataHome, saveDataHome } from '../controllers/landing/home.controller.js';
import { getDataAboutUs, saveDataAboutUs } from '../controllers/landing/aboutus.controller.js';
import { getDataServices, saveDataServices } from '../controllers/landing/services.controller.js';
import { getDataCollections, saveDataCollections } from '../controllers/landing/collections.controller.js';
import { getDataNews, saveDataNews } from '../controllers/landing/news.controller.js';
import { getDataContact, saveDataContact } from '../controllers/landing/contact.controller.js';
import { getAdminPage, validLoginAdmin } from '../controllers/landing/admin.controller.js';
import { getDataError, saveDataError } from '../controllers/landing/error.controller.js';

// Academy
import { getAdminAcademy } from '../controllers/academy/admin.controller.js';
import { getAthletes } from '../controllers/academy/athletes.controller.js';
import { getClub } from '../controllers/academy/club.controller.js';
import { getCoach } from '../controllers/academy/coach.controller.js';
import { getUserFileAccess } from '../controllers/academy/user_file_access.controller.js';

import { getConnect } from '../database/conection.controller.js';

const router = express();

export const routes = () => {
    // Landing
    router.post('/landing/i/layout', ConexionVerify, AuthorizationVerify, saveDataLayout);
    router.get('/landing/g/layout', ConexionVerify, AuthorizationVerify, getDataLayout);
    router.post('/landing/i/contact', ConexionVerify, AuthorizationVerify, saveDataContact);
    router.get('/landing/g/contact', ConexionVerify, AuthorizationVerify, getDataContact);
    router.post('/landing/i/news', ConexionVerify, AuthorizationVerify, saveDataNews);
    router.get('/landing/g/news', ConexionVerify, AuthorizationVerify, getDataNews);
    router.get('/landing/i/collections', ConexionVerify, AuthorizationVerify, saveDataCollections);
    router.get('/landing/g/collections', ConexionVerify, AuthorizationVerify, getDataCollections);
    router.get('/landing/i/services', ConexionVerify, AuthorizationVerify, saveDataServices);
    router.get('/landing/g/services', ConexionVerify, AuthorizationVerify, getDataServices);
    router.get('/landing/i/aboutus', ConexionVerify, AuthorizationVerify, saveDataAboutUs);
    router.get('/landing/g/aboutus', ConexionVerify, AuthorizationVerify, getDataAboutUs);
    router.post('/landing/i/home', ConexionVerify, AuthorizationVerify, saveDataHome);
    router.get('/landing/g/home', ConexionVerify, AuthorizationVerify, getDataHome);
    router.post('/landing/i/error', ConexionVerify, AuthorizationVerify, saveDataError);
    router.get('/landing/g/error', ConexionVerify, AuthorizationVerify, getDataError);

    // Admin
    router.post('/landing/admin/login', ConexionVerify, validLoginAdmin);
    router.get('/landing/admin/user', ConexionVerify, getAdminPage);
    router.get('/landing/g/contact', ConexionVerify, getDataContact);

    // Academy
    router.get('/academy/g/admin', ConexionVerify, getAdminAcademy);
    router.get('/academy/g/athletes', ConexionVerify, getAthletes);
    router.get('/academy/g/club', ConexionVerify, getClub);
    router.get('/academy/g/coach', ConexionVerify, getCoach);
    router.get('/academy/g/user_file_access', ConexionVerify, getUserFileAccess);

    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
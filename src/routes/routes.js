import express from 'express';

// Middlewares
import { ConexionVerify } from '../middlewares/connection.js';
import { AuthorizationVerify } from '../middlewares/authorization.js';

// Landing
import { getDataLayout, saveDataLayout, getDataMaintenance } from '../controllers/landing/layout.controller.js';
import { getDataHome, saveDataHome } from '../controllers/landing/home.controller.js';
import { getDataAboutUs, saveDataAboutUs } from '../controllers/landing/aboutus.controller.js';
import { getDataServices, saveDataServices } from '../controllers/landing/services.controller.js';
import { getDataCollections, saveDataCollections } from '../controllers/landing/collections.controller.js';
import { getDataNews, saveDataNews } from '../controllers/landing/news.controller.js';
import { getDataContact, saveDataContact } from '../controllers/landing/contact.controller.js';
import { getAdminPage, validLoginAdminLanding } from '../controllers/landing/admin.controller.js';
import { getDataError, saveDataError } from '../controllers/landing/error.controller.js';

// Academy
import { getAdminAcademy } from '../controllers/academy/admin.controller.js';
import { getAthletes, registerAthlete } from '../controllers/academy/athletes.controller.js';
import { getClub, registerClub } from '../controllers/academy/club.controller.js';
import { getCoach, registerCoach } from '../controllers/academy/coach.controller.js';
import { getUserFileAccess } from '../controllers/academy/user_file_access.controller.js';
import { validLoginUsersAcademy } from '../controllers/academy/users.controller.js';

// Database
import { getConnect } from '../database/conection.controller.js';

const router = express();

export const routes = () => {
    // Landing
    router.get('/landing/g/layout/maintenance', ConexionVerify, AuthorizationVerify, getDataMaintenance);
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
    router.get('/landing/g/contact', ConexionVerify, AuthorizationVerify, getDataContact);
    router.post('/landing/i/error', ConexionVerify, AuthorizationVerify, saveDataError);
    router.get('/landing/g/error', ConexionVerify, AuthorizationVerify, getDataError);

    // Admin
    router.post('/landing/admin/login', ConexionVerify, AuthorizationVerify, validLoginAdminLanding);
    router.get('/landing/admin/user', ConexionVerify, getAdminPage);
    router.get('/landing/g/contact', ConexionVerify, getDataContact);

    // Academy
    router.get('/academy/g/admin', ConexionVerify, getAdminAcademy);
    router.get('/academy/g/athletes', ConexionVerify, getAthletes);
    router.post('/academy/register/athletes', ConexionVerify, registerAthlete);
    router.get('/academy/g/club', ConexionVerify, getClub);
    router.post('/academy/register/club', ConexionVerify, registerClub);
    router.get('/academy/g/coach', ConexionVerify, getCoach);
    router.post('/academy/register/coach', ConexionVerify, registerCoach);
    router.get('/academy/g/user_file_access', ConexionVerify, getUserFileAccess);
    router.post('/academy/users/login', ConexionVerify, AuthorizationVerify, validLoginUsersAcademy);

    // Database
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
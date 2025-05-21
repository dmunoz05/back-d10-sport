import express from 'express';

// Middlewares
import { AuthorizationVerify } from '../middlewares/authorization.js';
import { ConexionVerify } from '../middlewares/connection.js';

// Landing
import { getDataLayout, saveDataLayout, getDataMaintenance } from '../controllers/landing/layout.controller.js';
import { getDataCollections, saveDataCollections } from '../controllers/landing/collections.controller.js';
import { getDataServices, saveDataServices } from '../controllers/landing/services.controller.js';
import { getDataAboutUs, saveDataAboutUs } from '../controllers/landing/aboutus.controller.js';
import { getDataContact, saveDataContact } from '../controllers/landing/contact.controller.js';
import { getDataError, saveDataError } from '../controllers/landing/error.controller.js';
import { getDataHome, saveDataHome } from '../controllers/landing/home.controller.js';
import { getDataNews, saveDataNews, getLastDataNews } from '../controllers/landing/news.controller.js';
import { getDataGallery } from '../controllers/landing/gallery.controller.js';
import { mailContact } from '../lib/api/email.api.js';

// Database
import { getConnect } from '../database/conection.controller.js';


const router = express();

export const routes = () => {
    // Landing
    router.get('/landing/g/layout/maintenance', AuthorizationVerify, getDataMaintenance);
    router.post('/landing/i/layout', AuthorizationVerify, saveDataLayout);
    router.get('/landing/g/layout', AuthorizationVerify, getDataLayout);
    router.post('/landing/i/contact', AuthorizationVerify, saveDataContact);
    router.get('/landing/g/contact', AuthorizationVerify, getDataContact);
    router.post('/landing/i/news', AuthorizationVerify, saveDataNews);
    router.get('/landing/g/news', AuthorizationVerify, getDataNews);
    router.get('/landing/g/last-news', AuthorizationVerify, getLastDataNews);
    router.get('/landing/i/collections', AuthorizationVerify, saveDataCollections);
    router.get('/landing/g/collections', AuthorizationVerify, getDataCollections);
    router.get('/landing/i/services', AuthorizationVerify, saveDataServices);
    router.get('/landing/g/services', AuthorizationVerify, getDataServices);
    router.get('/landing/i/aboutus', AuthorizationVerify, saveDataAboutUs);
    router.get('/landing/g/aboutus', AuthorizationVerify, getDataAboutUs);
    router.post('/landing/i/home', AuthorizationVerify, saveDataHome);
    router.get('/landing/g/home', AuthorizationVerify, getDataHome);
    router.get('/landing/g/contact', AuthorizationVerify, getDataContact);
    router.post('/landing/i/error', AuthorizationVerify, saveDataError);
    router.get('/landing/g/error', AuthorizationVerify, getDataError);
    router.get('/landing/g/gallery', AuthorizationVerify, getDataGallery)
    router.post('/landing/i/mail-contact', AuthorizationVerify, mailContact);

    // Database
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
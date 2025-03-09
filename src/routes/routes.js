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
import { getDataGallery } from '../controllers/landing/gallery.controller.js';
import { updateAdminHome, updateAdminNosotros, updateAdminComercial, updateAdminNews, updateAdminAcademia, updateAdminAliados } from '../controllers/landing/admin-home.controller.js'
import { updateAdminServicesTitle, updateAdminServicesOne, updateAdminServicesTwo, updateAdminServicesThree } from '../controllers/academy/admin-services.controller.js'
import { updateAdminAboutUsConocenos, updateAdminAboutUsFundador, updateAdminAboutUsObjetivos, updateAdminAboutUsMision, updateAdminAboutUsVision } from '../controllers/academy/admin-aboutus.controller.js';

import { saveGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/academy/admin-gallery.controller.js';
import { saveNews, updateNews, deleteNews } from '../controllers/academy/admin-news.controller.js';

// Academy
import { getAdminAcademy } from '../controllers/academy/admin.controller.js';
import { getAthletes, registerAthlete } from '../controllers/academy/athletes.controller.js';
import { getClub, searchClubFilter, registerClub } from '../controllers/academy/club.controller.js';
import { getCoach, searchCoachFilter, registerCoach } from '../controllers/academy/coach.controller.js';
import { getUserFileAccess } from '../controllers/academy/user_file_access.controller.js';
import { validLoginUsersAcademy } from '../controllers/academy/users.controller.js';
import { getCoursesAcademy } from '../controllers/academy/courses.controller.js';
import { getClassMenu, getClassContent, getClassComments, saveClassComment } from '../controllers/academy/class.controller.js';
import { getSolitudeUsers, approvedSolitude, deniedSolitude } from '../controllers/academy/solitud_register.controller.js';
import { getAdminCourseAcademy, saveAdminCourse, deleteAdminCourse, updateAdminCourse } from '../controllers/academy/admin-course.controller.js';

import { getAdminClass, saveAdminClass, deleteAdminClass, updateAdminClass } from '../controllers/academy/admin-class.controller.js';

// External
import { sendEmail } from '../lib/api/email.api.js';
import {
    getAllCountriesRestCountries,
    getCountriesAmericaRestCountries,
    getCountriesRegionRestCountries,
    getDateColombianRestCountries,
    getDateCityIDRestCountries,
    getCitiesColombianGeoNames,
    getCitiesOneCountryIDGeoNames,
    getCountriesRapidapi,
    getDepartmentColombianRapidapi,
    getCitiesOneCountryIDAndDepartmentIDRapidapi
} from '../controllers/academy/external.controller.js';

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
    router.get('/landing/g/gallery', ConexionVerify, AuthorizationVerify, getDataGallery)

    // Admin
    router.post('/landing/admin/login', ConexionVerify, AuthorizationVerify, validLoginAdminLanding);
    router.get('/landing/admin/user', ConexionVerify, getAdminPage);
    router.get('/landing/g/contact', ConexionVerify, getDataContact);

    // Admin Landing

    router.put('/landing/u/update-home/:id', ConexionVerify, AuthorizationVerify, updateAdminHome);
    router.put('/landing/u/update-nosotros/:id', ConexionVerify, AuthorizationVerify, updateAdminNosotros);
    router.put('/landing/u/update-comercial/:id', ConexionVerify, AuthorizationVerify, updateAdminComercial);
    router.put('/landing/u/update-news/:id', ConexionVerify, AuthorizationVerify, updateAdminNews);
    router.put('/landing/u/update-academia/:id', ConexionVerify, AuthorizationVerify, updateAdminAcademia);
    router.put('/landing/u/update-aliados/:id', ConexionVerify, AuthorizationVerify, updateAdminAliados);

    router.put('/landing/u/update-services-title/:id', ConexionVerify, AuthorizationVerify, updateAdminServicesTitle);
    router.put('/landing/u/update-services-one/:id', ConexionVerify, AuthorizationVerify, updateAdminServicesOne);
    router.put('/landing/u/update-services-two/:id', ConexionVerify, AuthorizationVerify, updateAdminServicesTwo);
    router.put('/landing/u/update-services-three/:id', ConexionVerify, AuthorizationVerify, updateAdminServicesThree);

    router.put('/landing/u/update-aboutus-conocenos/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsConocenos);
    router.put('/landing/u/update-aboutus-fundador/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsFundador);
    router.put('/landing/u/update-aboutus-objetivos/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsObjetivos);
    router.put('/landing/u/update-aboutus-mision/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsMision);
    router.put('/landing/u/update-aboutus-vision/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsVision);

    router.put('/landing/i/save-gallery/:id', ConexionVerify, AuthorizationVerify, saveGalleryImage)
    router.put('/landing/u/update-gallery/:id', ConexionVerify, AuthorizationVerify, updateGalleryImage)
    router.put('/landing/d/delete-gallery/:id', ConexionVerify, AuthorizationVerify, deleteGalleryImage)

    router.put('/landing/i/save-news-admin/:id', ConexionVerify, AuthorizationVerify, saveNews)
    router.put('/landing/u/update-news-admin/:id', ConexionVerify, AuthorizationVerify, updateNews)
    router.put('/landing/d/delete-news-admin/:id', ConexionVerify, AuthorizationVerify, deleteNews)

    // Admin Academy

    router.get('/academy/g/admin-course', ConexionVerify, AuthorizationVerify, getAdminCourseAcademy);
    router.post('/academy/i/add-course', ConexionVerify, AuthorizationVerify, saveAdminCourse);
    router.delete('/academy/d/delete-course/:id', ConexionVerify, AuthorizationVerify, deleteAdminCourse);
    router.put('/academy/u/update-course/:id', ConexionVerify, AuthorizationVerify, updateAdminCourse);

    router.get('/academy/g/admin-class', ConexionVerify, AuthorizationVerify, getAdminClass);
    router.post('/academy/i/add-class', ConexionVerify, AuthorizationVerify, saveAdminClass);
    router.delete('/academy/d/delete-class/:id', ConexionVerify, AuthorizationVerify, deleteAdminClass);
    router.put('/academy/u/update-class/:id', ConexionVerify, AuthorizationVerify, updateAdminClass);

    // Academy
    router.get('/academy/g/admin', ConexionVerify, getAdminAcademy);
    router.get('/academy/g/athletes', ConexionVerify, getAthletes);
    router.post('/academy/register/athletes', ConexionVerify, registerAthlete);
    router.get('/academy/g/club', ConexionVerify, getClub);
    router.get('/academy/g/search/club/:filter', ConexionVerify, searchClubFilter);
    router.post('/academy/register/club', ConexionVerify, registerClub);
    router.get('/academy/g/coach', ConexionVerify, getCoach);
    router.get('/academy/g/search/coach/:filter', ConexionVerify, searchCoachFilter);
    router.post('/academy/register/coach', ConexionVerify, registerCoach);
    router.get('/academy/g/user_file_access', ConexionVerify, getUserFileAccess);
    router.post('/academy/users/login', ConexionVerify, AuthorizationVerify, validLoginUsersAcademy);
    router.get('/academy/g/courses', ConexionVerify, AuthorizationVerify, getCoursesAcademy);
    router.get('/academy/g/class/menu', ConexionVerify, AuthorizationVerify, getClassMenu);
    router.get('/academy/g/class/content', ConexionVerify, AuthorizationVerify, getClassContent);
    router.get('/academy/g/class/comments', ConexionVerify, AuthorizationVerify, getClassComments);
    router.post('/academy/i/class/post-comments', ConexionVerify, AuthorizationVerify, saveClassComment)
    router.get('/academy/solitude/register/users', ConexionVerify, AuthorizationVerify, getSolitudeUsers);
    router.post('/academy/solitude/approved', ConexionVerify, AuthorizationVerify, approvedSolitude);
    router.post('/academy/solitude/denied', ConexionVerify, AuthorizationVerify, deniedSolitude);

    //External
    router.post('/external/p/send/mail', AuthorizationVerify, sendEmail)

    router.get('/external/g/rest/countries/', AuthorizationVerify, getAllCountriesRestCountries);
    router.get('/external/g/rest/countries/america', AuthorizationVerify, getCountriesAmericaRestCountries);
    router.get('/external/g/restcountries/countries/:region', AuthorizationVerify, getCountriesRegionRestCountries);
    router.get('/external/g/rest/country/data/col', AuthorizationVerify, getDateColombianRestCountries);
    router.get('/external/g/rest/country/data/:contryID', AuthorizationVerify, getDateCityIDRestCountries);

    router.get('/external/g/geon/cities/col/', AuthorizationVerify, getCitiesColombianGeoNames);
    router.get('/external/g/geon/cities/:countryID', AuthorizationVerify, getCitiesOneCountryIDGeoNames);

    router.get('/external/g/rapi/countries/', AuthorizationVerify, getCountriesRapidapi);
    router.get('/external/g/rapi/depart/col/', AuthorizationVerify, getDepartmentColombianRapidapi);
    router.get('/external/g/rapi/cities/depart/:departmentID/:countryID', AuthorizationVerify, getCitiesOneCountryIDAndDepartmentIDRapidapi);

    // Database
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
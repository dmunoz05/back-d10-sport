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
import { getDataNews, saveDataNews } from '../controllers/landing/news.controller.js';
import { getDataGallery } from '../controllers/landing/gallery.controller.js';

// Admin Landing
import { updateAdminAboutUsConocenos, updateAdminAboutUsFundador, updateAdminAboutUsObjetivos, updateAdminAboutUsMision, updateAdminAboutUsVision } from '../controllers/admin/admin-aboutus.controller.js';
import { updateAdminHome, updateAdminNosotros, updateAdminComercial, updateAdminNews, updateAdminAcademia, updateAdminAliados } from '../controllers/admin/admin-home.controller.js'
import { updateAdminServicesTitle, updateAdminServicesOne, updateAdminServicesTwo, updateAdminServicesThree } from '../controllers/admin/admin-services.controller.js'
import { getAdminCourseAcademy, saveAdminCourse, deleteAdminCourse } from '../controllers/admin/admin-course.controller.js';
import { getAdminClass, saveAdminClass, deleteAdminClass } from '../controllers/admin/admin-class.controller.js';
import { saveGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/admin/admin-gallery.controller.js';
import { saveNews, deleteNews } from '../controllers/admin/admin-news.controller.js';
import { getAdminAcademy } from '../controllers/admin/admin.controller.js';

// Academy
import { getAllPermissionsAndRole, getPermissionsByIdUser, getPermissionsByRoleAdmin, getPermissionsByRoleUser } from '../controllers/academy/permissions.controller.js';
import { getSolitudeUsersCoach, getSolitudeUsersClub, approvedSolitude, deniedSolitude } from '../controllers/academy/solitud_register.controller.js';
import { getClassMenu, getClassContent, getClassComments, saveClassComment } from '../controllers/academy/class.controller.js';
import { getCoach, searchCoachFilter, registerCoach } from '../controllers/academy/coach.controller.js';
import { getClub, searchClubFilter, registerClub } from '../controllers/academy/club.controller.js';
import { getAthletes, registerAthlete } from '../controllers/academy/athletes.controller.js';
import { validLoginUsersAcademy } from '../controllers/academy/users.controller.js';
import { getCoursesAcademy } from '../controllers/academy/courses.controller.js';
import { getAllRoles } from '../controllers/academy/role.controller.js';

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
import { uploadFileS3, deleteFileS3, upload, readFileS3, handleMulterError } from '../lib/s3/s3.js';

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

    // Admin Landing
    router.get('/landing/g/contact', ConexionVerify, getDataContact);
    router.put('/landing/u/update-home/:id', ConexionVerify, AuthorizationVerify, updateAdminHome);
    router.put('/landing/u/update-nosotros/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminNosotros);
    router.put('/landing/u/update-comercial/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminComercial);
    router.put('/landing/u/update-news/:id', ConexionVerify, AuthorizationVerify, updateAdminNews);
    router.put('/landing/u/update-academia/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminAcademia);
    router.put('/landing/u/update-aliados/:id', ConexionVerify, AuthorizationVerify, updateAdminAliados);

    router.put('/landing/u/update-services-title/:id', ConexionVerify, AuthorizationVerify, updateAdminServicesTitle);
    router.put('/landing/u/update-services-one/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminServicesOne);
    router.put('/landing/u/update-services-two/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminServicesTwo);
    router.put('/landing/u/update-services-three/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminServicesThree);

    router.put('/landing/u/update-aboutus-conocenos/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsConocenos);
    router.put('/landing/u/update-aboutus-fundador/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminAboutUsFundador);
    router.put('/landing/u/update-aboutus-objetivos/:id', ConexionVerify, AuthorizationVerify, updateAdminAboutUsObjetivos);
    router.put('/landing/u/update-aboutus-mision/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminAboutUsMision);
    router.put('/landing/u/update-aboutus-vision/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, updateAdminAboutUsVision);

    router.put('/landing/i/save-gallery/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, saveGalleryImage)
    router.put('/landing/u/update-gallery/:id', ConexionVerify, AuthorizationVerify, updateGalleryImage)
    router.put('/landing/d/delete-gallery/:id', ConexionVerify, AuthorizationVerify, deleteGalleryImage)

    router.put('/landing/i/save-news-admin/:id', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, saveNews)
    // router.put('/landing/u/update-news-admin/:id', ConexionVerify, AuthorizationVerify, updateNews)
    router.put('/landing/d/delete-news-admin/:id', ConexionVerify, AuthorizationVerify, deleteNews)

    // Admin Academy
    router.get('/academy/g/admin-course', ConexionVerify, AuthorizationVerify, getAdminCourseAcademy);
    router.post('/academy/i/add-course', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, saveAdminCourse);
    router.delete('/academy/d/delete-course/:id', ConexionVerify, AuthorizationVerify, deleteAdminCourse);
    // router.put('/academy/u/update-course/:id', ConexionVerify, AuthorizationVerify, updateAdminCourse);

    router.get('/academy/g/admin-class', ConexionVerify, AuthorizationVerify, getAdminClass);
    router.post('/academy/i/add-class', ConexionVerify, AuthorizationVerify, upload.single('file'), handleMulterError, saveAdminClass);
    router.delete('/academy/d/delete-class/:id', ConexionVerify, AuthorizationVerify, deleteAdminClass);
    // router.put('/academy/u/update-class/:id', ConexionVerify, AuthorizationVerify, updateAdminClass);

    // Academy
    router.get('/academy/g/admin', ConexionVerify, getAdminAcademy);
    router.get('/academy/g/role', ConexionVerify, getAllRoles);
    router.get('/academy/g/athletes', ConexionVerify, getAthletes);
    router.post('/academy/register/athletes', ConexionVerify, registerAthlete);
    router.get('/academy/g/club', ConexionVerify, getClub);
    router.get('/academy/g/search/club/:filter', ConexionVerify, searchClubFilter);
    router.post('/academy/register/club', ConexionVerify, registerClub);
    router.get('/academy/g/coach', ConexionVerify, getCoach);
    router.get('/academy/g/search/coach/:filter', ConexionVerify, searchCoachFilter);
    router.post('/academy/register/coach', ConexionVerify, registerCoach);
    router.post('/academy/users/login', ConexionVerify, AuthorizationVerify, validLoginUsersAcademy);
    router.get('/academy/g/courses', ConexionVerify, AuthorizationVerify, getCoursesAcademy);
    router.get('/academy/g/class/menu', ConexionVerify, AuthorizationVerify, getClassMenu);
    router.get('/academy/g/class/content', ConexionVerify, AuthorizationVerify, getClassContent);
    router.get('/academy/g/class/comments', ConexionVerify, AuthorizationVerify, getClassComments);
    router.post('/academy/i/class/post-comments', ConexionVerify, AuthorizationVerify, saveClassComment)
    router.get('/academy/solitude/register/users/coach', ConexionVerify, AuthorizationVerify, getSolitudeUsersCoach);
    router.get('/academy/solitude/register/users/club', ConexionVerify, AuthorizationVerify, getSolitudeUsersClub);
    router.post('/academy/solitude/approved', ConexionVerify, AuthorizationVerify, approvedSolitude);
    router.post('/academy/solitude/denied', ConexionVerify, AuthorizationVerify, deniedSolitude);
    router.get('/academy/permissions/roles', ConexionVerify, AuthorizationVerify, getAllPermissionsAndRole);
    router.post('/academy/permissions/user/:id_user', ConexionVerify, AuthorizationVerify, getPermissionsByIdUser);
    router.get('/academy/permissions/user/admin', ConexionVerify, AuthorizationVerify, getPermissionsByRoleAdmin);
    router.get('/academy/permissions/user/:role_id', ConexionVerify, AuthorizationVerify, getPermissionsByRoleUser);

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

    //S3
    router.post('/external/p/s3/', AuthorizationVerify, upload.single('file'), handleMulterError, uploadFileS3);
    router.post('/external/d/s3/', AuthorizationVerify, deleteFileS3);
    router.get('/external/g/s3/:bucket/:rute/:filename/', AuthorizationVerify, readFileS3);

    // Database
    router.get('/conect/', ConexionVerify, getConnect);
    return router;
}
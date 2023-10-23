'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 29-07-2022
 * @description This file handles all the custom routes that are required for the Poster Generator to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'post', '/anecdotes', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.posterGenerator.api.uploadAnecdotes);
    setupApiRoute(router, 'post', '/image', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.posterGenerator.api.uploadProfileImage);
    setupApiRoute(router, 'get', '/userProfile', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.posterGenerator.api.getProfile);
//	setupApiRoute(router, 'get', '/profiles',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.posterGenerator.api.profiles);
	setupApiRoute(router, 'put', '/editprofile/:_id',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.posterGenerator.api.editprofile);
//	setupApiRoute(router, 'post', '/generatepid',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.posterGenerator.api.generatePid);
	setupApiRoute(router, 'delete', '/deleteprofile/:id',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.posterGenerator.api.deleteProfile);

	setupApiRoute(router, 'post', '/createTemplate',[], controllers.posterGenerator.api.createTemplate);
	setupApiRoute(router, 'get', '/getTemplate/:uid?',[], controllers.posterGenerator.api.getTemplate);
	setupApiRoute(router, 'put', '/updateTemplate/:id',[...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, fileUploadMiddleware], controllers.posterGenerator.api.updateTemplate);

	setupApiRoute(router, 'post', '/savecanvas/:title/:description',[], controllers.posterGenerator.api.saveCanvas);
	setupApiRoute(router, 'put', '/editCanvas',[], controllers.posterGenerator.api.editCanvas);
	setupApiRoute(router, 'delete', '/deleteTemplate/:id',[], controllers.posterGenerator.api.deleteTemplate);
	return router;
};

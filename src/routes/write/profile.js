"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @date 06-05-2022
 * @author imshawan
 * @description This file handles all the custom routes that are required for the SDLMS profile page to function. 
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	const fileUploadMiddleware = [middleware.maintenanceMode, multipartMiddleware];

    setupApiRoute(router, 'get', '/:uid?', [], controllers.profile.get);
    setupApiRoute(router, 'get', '/:uid/:builder', [], controllers.write.profile.getBuilderData);

    return router;
}
'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 04-07-2023
 * @description This file handles all the routes that are required for the DTPen (an web development platform) to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'get', '/project/:id?', [...middlewares, middleware.authenticateOrGuest], controllers.write.dtPen.getProjects);
    setupApiRoute(router, 'post', '/project', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['title'])], controllers.write.dtPen.createProject);
    setupApiRoute(router, 'put', '/project/:id/:type', [...middlewares, middleware.authenticateOrGuest], controllers.write.dtPen.updateProject);
    setupApiRoute(router, 'post', '/format', [...middlewares, middleware.authenticateOrGuest, middleware.checkRequired.bind(null, ['content','type'])], controllers.write.dtPen.formatCode);

    return router;
}



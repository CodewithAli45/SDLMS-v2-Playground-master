"use strict";

const router = require("express").Router();
const middleware = require("../../middleware");
const controllers = require("../../controllers");
const routeHelpers = require("../helpers");

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author Shubham Bawner
 * @description This file handles all the custom routes that are required for the DtThon to function. 
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'post', '/project', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.createProject);
    setupApiRoute(router, 'put', '/project', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.editProject);
    setupApiRoute(router, 'get', '/project', [], controllers.dtThon.getProjects);
    setupApiRoute(router, 'delete', '/project', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.deleteProject);
    
    setupApiRoute(router, 'post', '/task', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.addTask);
    setupApiRoute(router, 'put', '/task', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.editTask);
    setupApiRoute(router, 'delete', '/task', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.deleteTask);

    setupApiRoute(router, 'post', '/asset', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.addAsset);
    setupApiRoute(router, 'put', '/asset', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.editAsset);
    setupApiRoute(router, 'delete', '/asset', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.deleteAsset);

    setupApiRoute(router, 'post', '/submit', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.submissionInfo);
    setupApiRoute(router, 'get', '/submit', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.getSubmissions);
    setupApiRoute(router, 'put', '/submit', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.makeSubmission);
    setupApiRoute(router, 'put', '/review', [...middlewares, middleware.authenticateOrGuest], controllers.dtThon.reviewSubmission);

    return router;
}
'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/application';
const routes = {
	PERSONA: ENDPOINT + '/persona',
	ASSIGNMENT: ENDPOINT + '/assignment',
	LEADERBOARD: ENDPOINT + '/leaderboard',
	PROJECT: ENDPOINT + '/project',
    DASHBOARD: ENDPOINT + '/dashboard',
	LANDING: ENDPOINT + "/landing",
	APPLICATION: ENDPOINT

}

module.exports = function (app, middleware, controllers) {
	var extendedMiddlewares = [
		middleware.exposeUid,
		middleware.canViewUsers,
		middleware.requireLogin
		];

	// setupPageRoute(
	// 	app,
	// 	`${routes.PERSONA}/:id`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.applicationmanager.core.persona
	// );

	// setupPageRoute(
	// 	app,
	// 	`${routes.ASSIGNMENT}/:id`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.applicationmanager.core.assignment
	// );

	// setupPageRoute(
	// 	app,
	// 	`${routes.LEADERBOARD}/:id`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.applicationmanager.core.leaderboard
	// );

	// setupPageRoute(
	// 	app,
	// 	`${routes.PROJECT}`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.applicationmanager.admin.project
	// );

	// setupPageRoute(
	// 	app,
	// 	`${routes.APPLICATION}/:id`,
	// 	middleware,
	// 	extendedMiddlewares,
	// 	controllers.applicationmanager.admin.application
	// );
// console.log(controllers.applicationManager.dashboard.get)
    setupPageRoute(
		app,
		`${routes.DASHBOARD}`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.dashboard.get
	);
	setupPageRoute(
		app,
		`${routes.LANDING}`,
		middleware,
		extendedMiddlewares,
		controllers.applicationManager.landing.get
	);

}
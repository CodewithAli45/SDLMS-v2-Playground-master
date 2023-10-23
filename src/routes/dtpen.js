'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/dtpen';
const routes = {
    DASHBOARD: ENDPOINT + '/dashboard',
	PROJECT: ENDPOINT + '/projects/:id',
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

    setupPageRoute(
		app,
		`${routes.DASHBOARD}`,
		middleware,
		extendedMiddlewares,
		controllers.dtpen.data.dashboard
	);

    setupPageRoute(
		app,
		`${routes.PROJECT}`,
		middleware,
		extendedMiddlewares,
		controllers.dtpen.data.home
	);

}
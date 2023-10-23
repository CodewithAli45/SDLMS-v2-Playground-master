'use strict';

const winston = require('winston');
const nconf = require('nconf');

var helpers = require('./helpers');
var setupPageRoute = helpers.setupPageRoute;
const ENDPOINT = '/dtvideotech';
const routes = {
	HOME: ENDPOINT + '/',
	
}

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var extendedMiddlewares = [...middlewares, middleware.requireLogin];

	setupPageRoute(
		app,
		`${routes.HOME}`,
		middleware,
		extendedMiddlewares,
		controllers.DTvideo.master.get
	);

}
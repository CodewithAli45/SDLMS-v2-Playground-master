"use strict";

const winston = require("winston");
const nconf = require("nconf");

var helpers = require("./helpers");
var setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	
    setupPageRoute(app, "/profile/:uid?", middleware, middlewares, controllers.profile.get);

}
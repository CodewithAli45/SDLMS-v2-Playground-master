'use strict';

const router = require('express').Router();
const middleware = require('../../middleware');
const controllers = require('../../controllers');
const routeHelpers = require('../helpers');

const setupApiRoute = routeHelpers.setupApiRoute;

/**
 * @author imshawan
 * @date 12-12-2022
 * @description This file handles all the routes that are required for the Global APIs to function.
 */

module.exports = function () {
	const middlewares = [middleware.authenticate];

    setupApiRoute(router, 'post', '/getassets', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.assets.getAssets);
    setupApiRoute(router, 'put', '/assets/sticker/:id', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['type', 'sticker'])], controllers.write.globals.assets.updateAssetSticker);
    
    setupApiRoute(router, 'post', '/getReflectiveComments', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.reflectiveComments.get);
    setupApiRoute(router, 'post', '/insertReflectiveComment', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.reflectiveComments.insertReflectiveComment);
    setupApiRoute(router, 'post', '/insertReflectiveAnswer', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.reflectiveComments.insertReflectiveAnswer);
    setupApiRoute(router, 'post', '/insertReflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.reflectiveComments.insertReflection);
    setupApiRoute(router, 'get', '/getInsightReactions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin], controllers.write.globals.insightReactions.get);
    
    setupApiRoute(router, 'post', '/reflective-comments/:profileId/questions', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['content'])], controllers.write.globals.reflectiveCommentsv2.createQuestion);
    setupApiRoute(router, 'post', '/reflective-comments/:questionId/reflection', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['content'])], controllers.write.globals.reflectiveCommentsv2.createReflection);
    setupApiRoute(router, 'post', '/reflective-comments/:questionId/answer', [...middlewares, middleware.authenticateOrGuest, middleware.isLoggedin, middleware.checkRequired.bind(null, ['content'])], controllers.write.globals.reflectiveCommentsv2.createAnswer);

    return router;
}
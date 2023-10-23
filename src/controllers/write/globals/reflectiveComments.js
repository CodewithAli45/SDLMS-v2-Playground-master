'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const commentsController = module.exports;

commentsController.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveComments.get(req));
};

commentsController.insertReflectiveComment = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveComments.insertReflectiveComment(req));
};

commentsController.insertReflectiveAnswer = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveComments.insertReflectiveAnswer(req));
};

commentsController.insertReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveComments.insertReflection(req));
};

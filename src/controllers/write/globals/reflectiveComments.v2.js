'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const commentsController = module.exports;

commentsController.createQuestion = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveCommentsv2.createQuestion(req));
};

commentsController.createReflection = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveCommentsv2.createReflection(req));
};
commentsController.createAnswer = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.reflectiveCommentsv2.createAnswer(req));
};
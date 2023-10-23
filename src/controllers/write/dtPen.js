'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const dtPen = module.exports;

dtPen.getProjects = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtPen.getProjects(req));
}

dtPen.createProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtPen.createProject(req));
}

dtPen.updateProject = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtPen.updateProjectByType(req));
}
dtPen.formatCode = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.dtPen.formatCode(req));
}
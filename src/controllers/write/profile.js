'use strict';

const api = require('../../api');
const helpers = require('../helpers');

const profileControllers = module.exports;

/**
* @description Profile page operations (GET, CREATE, UPDATE)
* @params req, res
*/

profileControllers.getBuilderData = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.profile.getBuilderData(req));
}
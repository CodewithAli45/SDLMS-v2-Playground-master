'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const insightReactions = module.exports;

insightReactions.get = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.insightReactions.get(req));
};

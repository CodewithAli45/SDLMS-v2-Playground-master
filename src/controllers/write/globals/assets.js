'use strict';

const api = require("../../../api");
const helpers = require("../../helpers");

const assetsController = module.exports;

assetsController.getAssets = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.assets.getAssets(req));
};

assetsController.updateAssetSticker = async (req, res) => {
	helpers.formatApiResponse(200, res, await api.globals.assets.updateAssetSticker(req));
};
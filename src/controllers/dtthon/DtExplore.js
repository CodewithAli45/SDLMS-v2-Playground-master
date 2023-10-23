"use strict";
const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../../controllers/helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const DtExploreController = module.exports;

DtExploreController.get = async function (req, res, next) {
	var DtExplore ={}
    DtExplore.title='DtExplore'
    res.render('sdlms/dtthon/DtExplorePage',{DtExplore})
};
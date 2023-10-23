"use strict";
const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../../controllers/helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const DtStoryController = module.exports;

DtStoryController.get = async function (req, res, next) {
	var DtStoryboard ={}
    DtStoryboard.title='DtStoryboard'
    res.render('sdlms/dtthon/DtStoryboard',{DtStoryboard})
};
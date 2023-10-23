"use strict";
const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../../controllers/helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const DtThonController = module.exports;

DtThonController.get = async function (req, res, next) {
	var DtThon ={}
    DtThon.title='DtThon'
    res.render('sdlms/dtthon/DtThon',{DtThon})
};
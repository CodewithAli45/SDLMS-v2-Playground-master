"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const aProfile = module.exports;

aProfile.get = async function (req, res, next) {
    var aProfile = {};

    aProfile.title = 'Applicant Profile';
    res.render('sdlms/dtthon/aProfile', aProfile);
};
"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const aStoryboard = module.exports;

aStoryboard.get = async function (req, res, next) {
    var aStoryboard = {};

    aStoryboard.title = 'Applicant Storyboard';
    res.render('sdlms/dtthon/aStoryboard', aStoryboard);
};
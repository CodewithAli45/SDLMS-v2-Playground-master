"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const cProfile = module.exports;

cProfile.get = async function (req, res, next) {
    var cProfile = {};

    cProfile.title = 'Creator Profile';
    res.render('sdlms/dtthon/cProfile', cProfile);
};
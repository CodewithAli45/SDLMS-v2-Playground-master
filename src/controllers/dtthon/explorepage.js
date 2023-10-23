"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const explorepage = module.exports;

explorepage.get = async function (req, res, next) {
    var explorepage = {};

    explorepage.title = 'Explorepage';
    res.render('sdlms/dtthon/explorepage', explorepage);
};
"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const { home } = require("..");

const main = module.exports;

main.dashboard = async function (req, res, next) {
    var dashboard = {};

    dashboard.title = 'Dashboard';
    res.render('dtpen/dashboard', dashboard);
};

main.home = async function (req, res, next) {
    var home = {};

    home.title = 'Home';
    res.render('dtpen/home', home);
};
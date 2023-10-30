'use strict';

const winston = require('winston');
const db = require("../database");
const user = require("../user");
const helpers = require('../controllers/helpers');
const groups = require('../groups');
const privileges = require('../privileges');

const mypageController = module.exports;


mypageController.get = async function (req, res, next) {
	let mypagedashboard = {};
    mypageController.title = "Parent Dashboard";

    res.render('sdlms/myPageAli', mypagedashboard);
};


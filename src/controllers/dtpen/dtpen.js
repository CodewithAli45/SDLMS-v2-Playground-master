"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');
const { home } = require("..");
const ObjectId = require("mongodb").ObjectId;

const main = module.exports;

main.dashboard = async function (req, res, next) {
    var dashboard = {};

    dashboard.title = 'Dashboard';
    res.render('dtpen/dashboard', dashboard);
};

main.home = async function (req, res, next) {
    var home = {};
    var id = req.params.id;

    home.title = 'Home';
    if (!ObjectId.isValid(id)) {
        throw new Error("ID is not valid.");
    }

    const key = {
        _key: "project",
        uid: parseInt(req.uid),
        _id: ObjectId(id)
    }

    home.project = await db.findField(db.collections.DTPEN.PROJECT, key)
    console.log(home)
    res.render('dtpen/home', home);
};
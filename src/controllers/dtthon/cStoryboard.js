"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const groups = require('../../groups');
const privileges = require('../../privileges');

const cStoryboard = module.exports;

cStoryboard.get = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    var cStoryboard = {};

    cStoryboard.title = 'Creator Storyboard';
    cStoryboard.project = await db.findField(collectionName, { tid: parseInt(req.params.tid)});
    res.render('sdlms/dtthon/cStoryboard', cStoryboard);
};
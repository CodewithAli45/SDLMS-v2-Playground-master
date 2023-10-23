"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const meta = require('../../meta');

const { ObjectId } = require('mongodb');
const { create } = require("lodash");

const DTvideo = module.exports;
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

const ERROR_IMAGE = 'https://blog.deepthought.education/wp-content/uploads/2022/08/poster_generator_error.png';

DTvideo.master = async function (req, res, next) {
    var master = {};

    master.title = 'Profiles';


    let uid = parseInt(req.uid);

    master.master = await db.findField(templateCollection, { uid: uid, type: 'user:masterimage' });
    master.uid = uid;


    res.render('DTvideoTech/master', master)
}

"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const meta = require('../../meta');
const { ObjectId } = require('mongodb');
const { create } = require("lodash");
const profile = module.exports;
const fs = require('fs');
const ERROR_IMAGE = 'https://blog.deepthought.education/wp-content/uploads/2022/08/poster_page_error.png';

profile.page = async function (req, res, next) {
    var page = {};
    console.log(req.params._id)
    // if (req.params._id) {
    //     page.templateId = req.params._id;
    // }
    // // page.editingTemplate = req.params._id ? page.editingTemplate = true : page.editingTemplate = false;

    page.title = 'Template page';
    let uid = parseInt(req.uid);
    // profiles.profiles = await db.findField(templateCollection, { uid: uid, type: 'user:profileimage' });
    page.uid = uid;
    res.render('profile/profile', page)
}
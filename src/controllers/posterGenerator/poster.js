"use strict";

const winston = require("winston");
const db = require("../../database");
const user = require("../../user");
const helpers = require('../helpers');
const meta = require('../../meta');
const posterGeneratorApi = require('./poster.api');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const constants = require('../../constants');
const path = require("path");


const templateCollection = db.collections.POSTERGENERATOR;
const templateGenerator = db.collections.TEMPLATE;
const ERROR_IMAGE = 'https://blog.deepthought.education/wp-content/uploads/2022/08/poster_generator_error.png';
const BASE = 'posterGenerator'

const posterGenerator = module.exports;

posterGenerator.api = {};

posterGenerator.getProcessedImages = async function (req, res, next) {
    let page = req.params.page;
    var perPage = meta.config.postsPerPage || 20;
    page = !isNaN(page) && page > 1 ? page - 1 : 0;

    const uid = parseInt(req.uid);
    const processedImages = {};

    const collectionName = db.collections.POSTERGENERATOR,
        keys = { type: "user:anecdotes:processed", uid }

    processedImages.title = 'Processed posters';

    const [posterData, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, perPage, page),
        db.countDocuments(collectionName, keys)
    ]);

    let posters = [];

    if (posterData.length) {
        posterData.forEach((elem) => {
            let { anecdotes } = elem;

            if (anecdotes && anecdotes.length) {
                anecdotes.forEach((el) => {
                    posters.push(el);
                })
            }
        });
    }

    processedImages.posters = posters;

    let total = (Math.ceil(count / perPage) || 1);
    let nextPage = (page + 2) > total ? (page + 1) : (page + 2);

    processedImages.pagination = {
        isPrev: page > 0,
        first: `/posters`,
        prev: `/posters/${page}`,
        current: page + 1,
        total: total,
        next: `/posters/${nextPage}`,
        last: `/posters/${total}`,
        isNext: ((page + 2) <= Math.ceil(count / perPage)),
    };

    processedImages.errorImage = ERROR_IMAGE;

    res.render(BASE + '/view_all', processedImages);
};

posterGenerator.uploadAnecdotes = async function (req, res, next) {
    const templatesDir = path.join(constants.paths.baseDir, 'src', 'views', BASE, 'templates');
    var uploadAnecdotes = {};

    uploadAnecdotes.title = 'Upload anecdotes';
    uploadAnecdotes.poster = [];

    let templateName = fs.readdirSync(templatesDir);
    templateName.forEach((element, index) => {
        if (element.includes('.DS_Store')) {
            return;
        } else {
            let e = element.replace(".tpl", "")
            uploadAnecdotes.poster.push(e);
        }
    });

    res.render(BASE + '/upload_anecdotes', uploadAnecdotes);
};

posterGenerator.createProfile = async function (req, res, next) {
    var imageUpload = {};
    let uid = parseInt(req.uid);
    let id = req.params._id;
    if (id) {
        let keys = {
            _id: ObjectId(id),
            type: 'user:profileimage'
        }

        imageUpload.profiles = await db.findField(templateCollection, keys);
        imageUpload.id = id
    }
    imageUpload.title = 'Create profile';
    imageUpload.uid = uid
    res.render(BASE + '/upload_image', imageUpload);
};

posterGenerator.profiles = async function (req, res, next) {
    var profiles = {};

    profiles.title = 'Profiles';


    let uid = parseInt(req.uid);

    profiles.profiles = await db.findField(templateCollection, { uid: uid, type: 'user:profileimage' });
    profiles.uid = uid;


    res.render(BASE + '/profiles', profiles)
}

posterGenerator.templategenerator = async function (req, res, next) {
    var generator = {};
    console.log(req.params._id)
    console.log(req.params)
    generator.templateName = req.params.title;
    generator.templateDescription = req.params.description;
    if (req.params._id) {
        generator.templateId = req.params._id;
    }
    generator.editingTemplate = req.params._id ? generator.editingTemplate = true : generator.editingTemplate = false;

    generator.title = 'Template generator';
    let uid = parseInt(req.uid);
    // profiles.profiles = await db.findField(templateCollection, { uid: uid, type: 'user:profileimage' });
    generator.uid = uid;
    res.render(BASE + '/templategenerator/create', generator)
}

posterGenerator.editTemplate = async function (req, res, next) {
    var editor = {};

    editor.templateId = req.params._id;

    console.log(editor.templateId)
    editor.editingTemplate = req.params._id ? editor.editingTemplate = true : editor.editingTemplate = false;

    editor.title = 'Template editor';
    let uid = req.uid;
    editor.template_data = await db.findField(templateGenerator, { uid: uid, type: 'templates', _id: ObjectId(editor.templateId) });
    editor.uid = uid;
    res.render(BASE + '/templategenerator/edit_template', editor)
}

posterGenerator.list = async function (req, res, next) {
    var list = {};
    list.title = "Template list"
    res.render(BASE + '/templategenerator/list', list)
}

posterGenerator.generate = async function (req, res, next) {
    var generate = {};
    let uid = req.uid;
    generate.template_id = req.params._id;
    generate.title = "Generate templates"
    generate.template_data = await db.findField(templateGenerator, {  type: 'templates', _id: ObjectId(generate.template_id) });
    res.render(BASE + '/templategenerator/generate', generate)
}


// API controllers

posterGenerator.api.uploadProfileImage = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.uploadImage(req));
};

posterGenerator.api.editprofile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.editProfile(req));
};

posterGenerator.api.uploadAnecdotes = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.uploadAnecdotes(req));
};

posterGenerator.api.getProfile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.getProfile(req));
}

posterGenerator.api.profiles = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.getProfileByUid(req));
}

posterGenerator.api.editprofile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.editProfile(req))
}

posterGenerator.api.generatePid = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.generatePid(req))
}

posterGenerator.api.deleteProfile = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.deleteProfile(req))
}

posterGenerator.api.createTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.createTemplate(req))
}

posterGenerator.api.getTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.getTemplate(req))
}
posterGenerator.api.updateTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.updateTemplate(req))
}

posterGenerator.api.saveCanvas = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.saveCanvas(req))
}
posterGenerator.api.editCanvas = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.editCanvas(req))
}
posterGenerator.api.deleteTemplate = async (req, res) => {
    helpers.formatApiResponse(200, res, await posterGeneratorApi.deleteTemplate(req))
}

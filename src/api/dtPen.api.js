'use strict';

const db = require('../database');
const utilities = require("../controllers/utils");
const User = require("../user");
const ObjectId = require("mongodb").ObjectId;
const utils = require('../utils');
const _ = require('lodash');
const beautify = require('beautify');


const collectionName = db.collections.DTPEN.PROJECT;
const validFileDataTypes = ['html', 'css', 'javascript'];
const userFields = ['fullname', 'username', 'picture'];

const penApi = module.exports;

penApi.getProjects = async (req) => {
    const uid = Number(req.uid);
    const { id } = req.params;
    const { query } = req.query;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const keys = { _key: 'project', uid };

    if (id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid Id supplied');
        }

        const project = await db.findField(collectionName, { _id: ObjectId(id), ...keys });
        project.user = await User.getUserFields(project.uid, userFields);

        return project;
    }

    if (query && query.length) {
        keys.title = { $regex: new RegExp(query.trim()), $options: 'i' }
    }

    const [projects, count = 0] = await Promise.all([
        db.getFieldsWithPagination(collectionName, keys, limit, page),
        db.countDocuments(collectionName, keys),
    ]);

    const projectsWithAuthor = await Promise.all(projects.map(async project => {
        project.user = await User.getUserFields(project.uid, userFields);
        return project;
    }));

    return utilities.paginate(`/dtpen${req.url}`, projectsWithAuthor, count, limit, page);
}

penApi.createProject = async (req) => {
    const uid = Number(req.uid);
    const { title, description } = req.body;
    const timestamp = utilities.getISOTimestamp();

    const payload = {}

    payload._key = 'project';
    payload.uid = uid;
    payload.user = 'user:' + uid;
    payload.title = title.trim();
    payload.description = description || null;
    payload.data = {};

    payload.createdAt = timestamp;
    payload.updatedAt = timestamp;

    validFileDataTypes.forEach(type => {
        if (req.body[type]) {
            let { content, isLocked, status } = req.body[type];

            payload.data[type] = {
                type,
                content: utils.stripHTMLTags(content || ''),
                isLocked: isLocked || true,
                status: status || '',
                createdAt: timestamp,
                updatedAt: timestamp,
            }
        } else {
            payload.data[type] = {
                type,
                content: '',
                isLocked: true,
                status: '',
                createdAt: timestamp,
                updatedAt: timestamp,
            }
        }
    });

    return await db.setField(collectionName, payload);
}

penApi.updateProjectByType = async (req) => {
    const { type, id } = req.params;
    const uid = Number(req.uid);
    const { title } = req.body;
    const timestamp = utilities.getISOTimestamp();

    if (!validFileDataTypes.includes(type)) {
        throw new Error('Invalid type: ' + type);
    }

    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid project id supplied');
    }

    const keys = {
        _key: 'project', _id: ObjectId(id)
    };

    const project = await db.findField(collectionName, keys);
    if (!project) {
        throw new Error('No project was found for the supplied project id');
    }

    if (project.uid != uid) {
        throw new Error('You are not authorized to edit this project');
    }

    const payload = {};

    if (title) {
        payload.title = title;
    }

    if (req.body[type]) {
        let { data } = project;
        let { content, isLocked, status } = req.body[type];

        const dataPayload = {};
        dataPayload.content = utils.stripHTMLTags(content);
        dataPayload.updatedAt = timestamp

        if (req.body[type].hasOwnProperty('isLocked')) {
            dataPayload.isLocked = isLocked;
        }

        if (req.body[type].hasOwnProperty('status')) {
            dataPayload.status = status;
        }

        data[type] = _.merge(data[type], dataPayload);

        payload.data = data;
    }

    const acknowledgement = await db.updateField(collectionName, keys, { $set: payload });
    return {
        updated: acknowledgement.result.n === 1,
    };
}


penApi.formatCode = async (req) => {

    try {
        const content = req.body.content;
        const type = req.body.type;

        return beautify(content, { format: type });

    } catch (error) {

        console.log(error);
        return error;
    }

    return ;
}
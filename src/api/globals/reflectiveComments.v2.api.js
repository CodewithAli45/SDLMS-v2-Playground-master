'use strict';

/**
 * @date 02-06-2023
 * @author imshawan
 * @description This file contains all the functionality for reflective comment v2
 */

const db = require('../../database');
const ObjectId = require('mongodb').ObjectId;
const user = require('../../user');
const utilities = require('../../controllers/utils')
const socketIO = require('../../socket.io');

const commentsApi = module.exports;
const collectionName = db.collections.GLOBAL.REFLECTIVE_COMMENTS_V2;


commentsApi.createQuestion = async (req) => {
    const {content} = req.body;
    const {profileId} = req.params;

    const timestamp = utilities.getISOTimestamp();

    const payload = {
        _key: `profile:${profileId}:question`,
        content: content.trim(),
        createdBy: `user:${req.uid}`,
        createdAt: timestamp
    };

    let question = await db.setField(collectionName, payload);

    question = await populateUserData([question]);

    question = question[0]

    socketIO.in('profile_' + profileId).emit('event:question_created', question);

    return question;
}

commentsApi.createReflection = async (req) => {
    const {content} = req.body;
    const {questionId} = req.params;

    const timestamp = utilities.getISOTimestamp();

    const payload = {
        _key: `question:${questionId}:reflection`,
        content: content.trim(),
        createdBy: `user:${req.uid}`,
        createdAt: timestamp
    };

    let reflection = await db.setField(collectionName, payload);

    reflection = await populateUserData([reflection]);

    reflection = reflection[0];

    socketIO.in('question_' + questionId).emit('event:reflection_created', reflection);

    return reflection;
}

commentsApi.createAnswer = async (req) => {
    const {content,profileId} = req.body;

    const {questionId} = req.params;

    const timestamp = utilities.getISOTimestamp();

    const payload = {
        _key: `question:${questionId}:answer`,
        content: content.trim(),
        createdBy: `user:${req.uid}`,
        createdAt: timestamp
    };

    let reflection = await db.setField(collectionName, payload);

    reflection = await populateUserData([reflection]);

    reflection = reflection[0];

    socketIO.in('question_answer_' + profileId).emit('event:answer_created', {
        ...reflection,
        questionId
    });

    return reflection;
}

commentsApi.getReflectionByQuestionId = async (req) => {
    const {questionId} = req.params;
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 50;

    if (!questionId || questionId.length != 24) {
        throw new Error('Invalid question id supplied');
    }

    const searchKeys = {_key: `question:${questionId}:reflection`};
    let question = await db.findField(collectionName, {_id: ObjectId(questionId)});
    question.answer = await db.findField(collectionName, {_key: `question:${questionId}:answer`}, {sort: {createdAt: -1}});
    
    question = await populateUserData([question]);
    question = question[0];



    let [reflections, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, searchKeys, limit, page),
        db.countDocuments(collectionName, searchKeys),
    ]);
    
    reflections = await populateUserData(reflections);

    return utilities.paginate(`/global${req.url}`, {question, reflections}, count, limit, page);
}

commentsApi.getQuestionsByProfileId = async (req) => {
    const {profileId} = req.params;
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 50;

    if (!profileId || profileId.length != 24) {
        throw new Error('Invalid question id supplied');
    }

    const searchKeys = {_key: `profile:${profileId}:question`};

    let [questions, count] = await Promise.all([
        db.getFieldsWithPagination(collectionName, searchKeys, limit, page),
        db.countDocuments(collectionName, searchKeys),
    ]);
    
    questions = await populateUserData(questions);

    questions = await Promise.all(questions.map(async question => {
        question.reflectionsCount = await db.countDocuments(collectionName, {_key: `question:${question._id}:reflection`});
        question.answer = await db.findField(collectionName, {_key: `question:${question._id}:answer`}, {sort: {createdAt: -1}});
        return question;
    }));

    return utilities.paginate(`/global${req.url}`, questions, count, limit, page);
}


async function populateUserData(records) {
    let uids = records.map(el => el.createdBy.split(':')[1]);

    uids = [...new Set(uids)];

    const userData = await user.getUsersFields(uids, ['username', 'fullname', 'picture']);

    return records.map(record => {
        record.createdBy = userData.find(elem => `user:${elem.uid}` == record.createdBy);
        record.createdBy.fullname = record.createdBy.fullname || record.createdBy.displayname;

        return record;
    })
}
"use strict";

const { log } = require('console');
const api = require('../../api');
const db = require('../../database');
const ObjectId = require('mongodb').ObjectId;
const widgets = module.exports;

widgets.cards = async function (req, res, next) {
    res.render('widgets/test/cards', { title: 'Widget' }, 'widget');
};

widgets.comments = async function (req, res, next) {
    const profileId = req.query.profileId;

    const questions = await api.globals.reflectiveCommentsv2.getQuestionsByProfileId({params: {profileId}, query: {}});
    let profile = await db.findField(db.collections.GLOBAL.PROFILES_V2, {_id:ObjectId(profileId)});
    let isSelf = req.uid == profile.uid;
    let title = profile.data.name;
    res.render('widgets/comments/list', { title: title, questions,profileId,isSelf},'widget');
};
widgets.reflections = async function (req, res, next) {
    const questionId = req.params.id;
    const answers = await api.globals.reflectiveCommentsv2.getReflectionByQuestionId({params: {questionId}, query: {}});
    let back = true;
    res.render('widgets/comments/reflections/list', { title: 'Reflections', answers,questionId,back},'widget');
};


const DTPEN_SET = function (name,id,req,res,next){
    res.render('widgets/dtpen/'+name, { title: 'DTPEN-'+name, id : id},'widget');
}

const PAGES = ['dashboard','html','css','js','output'];
PAGES.forEach(name => {
    widgets['dtpen_'+name] = async function (req, res, next) {
        let id = req.params.id;
        log('id', id)

        DTPEN_SET(name,id,req,res,next);

    };
});
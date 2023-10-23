'use strict';

/**
 * @date 03-10-2022
 * @author Fardin Kamal
 * @description This file contains all the functionality for reflective comment
 */

const db = require('../../database');
const ObjectId = require('mongodb').ObjectId;
const user = require('../../user');

const commentsApi = module.exports;
const collectionName = db.collections.GLOBAL.REFLECTIVE_COMMENTS;

const getUserDataFromUid = async (uidArray) => {
	const userFields = ['fullname', 'username', 'picture'];
	return await user.getUsersFields(uidArray, userFields);
};

commentsApi.get = async (req) => {
	const keys = {
		tid: parseInt(req.body.tid),
		task_tid: req.body.task_tid || null,
		owner: parseInt(req.body.owner),
	};
	const reflectiveComments = await db.getFieldsWithPagination(collectionName, keys, 5, 0);
	const uidArray = [];
	reflectiveComments.map((e) => {
		uidArray.push(e.uid);
		uidArray.push(e.answer.uid);
		e.reflections.map((ee) => {
			uidArray.push(ee.uid);
		});
		uidArray.push(e.owner);
	});
	const newUidArray = uidArray.filter(element => element !== undefined);
	const userData = await getUserDataFromUid([...new Set(newUidArray)]);
	reflectiveComments.map((e) => {
		e.fullname = (userData.filter(u => e.uid === u.uid))[0].fullname;
		e.username = (userData.filter(u => e.uid === u.uid))[0].username;
		e.picture = (userData.filter(u => e.uid === u.uid))[0].picture;
		if (Object.keys(e.answer).length > 0) {
			e.answer.fullname = (userData.filter(u => e.answer.uid === u.uid))[0].fullname;
			e.answer.username = (userData.filter(u => e.answer.uid === u.uid))[0].username;
			e.answer.picture = (userData.filter(u => e.answer.uid === u.uid))[0].picture;
		}
		e.reflections.map((reflection) => {
			reflection.fullname = (userData.filter(u => reflection.uid === u.uid))[0].fullname;
			reflection.username = (userData.filter(u => reflection.uid === u.uid))[0].username;
			reflection.picture = (userData.filter(u => reflection.uid === u.uid))[0].picture;
		});
	});
	return reflectiveComments;
};

commentsApi.insertReflectiveComment = async (req) => {
	const currentTime = new Date().getTime();

	const payload = {
		tid: parseInt(req.body.tid),
		task_tid: parseInt(req.body.task_tid) || null,
		uid: parseInt(req.uid),
		question: req.body.question,
		answer: {},
		reflections: [],
		timestamp: currentTime,
		owner: parseInt(req.body.owner),
		type: 'reflective_comment',
	};

	return await db.setField(collectionName, payload);
};

commentsApi.insertReflectiveAnswer = async (req) => {
	const currentTime = new Date().getTime();
	const key = {
		_id: ObjectId(req.body._id),
	};

	const payload = {
		uid: parseInt(req.uid),
		answer: req.body.answer,
		timestamp: currentTime,
	};

	return await db.updateField(collectionName, key, { $set: { answer: payload } });
};

commentsApi.insertReflection = async (req) => {
	const currentTime = new Date().getTime();
	const key = {
		_id: ObjectId(req.body._id),
		task_tid: parseInt(req.body.task_tid) || null,
	};

	const payload = {
		uid: parseInt(req.uid),
		reflection: req.body.reflection,
		timestamp: currentTime,
	};

	return await db.updateField(collectionName, key, { $push: { reflections: payload } });
};

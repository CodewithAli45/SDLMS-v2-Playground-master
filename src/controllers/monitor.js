"use strict";

const winston = require("winston");
const db = require("../database");
const user = require("../user");
const helpers = require('../controllers/helpers');
const groups = require('../groups');
const privileges = require('../privileges');

const monitorBoardController = module.exports;

/**
 * @function get
 * @description Define an asynchronous function to handle GET requests to the monitor board
 * @author Alex 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

monitorBoardController.get = async function (req, res, next) {
	try {
		if(!req.uid) return res.redirect('/login');
		// Create an empty object to store page data
		const pageData = {};
		let profiles = await db.client.collection(db.collections.GLOBAL.PROFILES_V2).find({}).sort({_id: -1}).toArray();
		
		pageData.profiles = profiles;
		// // Define an object to use as keys for the session query
		// const sessionKeys = {
		// 	// Find documents with the type 'session'
		// 	type: 'session',
		// 	// Find sessions where the current user is a member
		// 	members: { $all: [parseInt(userId)] },
		// 	// Find sessions that are not either in the 'stop' state or do not have a state field
		// 	// Find sessions where isLive is either false or 'false', or where isLive does not exist
		// 	$or: [
		// 		{ state: { $ne: ['stop'] } },
		// 		{ state: { $exists: false } },
		// 		{ isLive: { $in: [false, 'false'] } },
		// 		{ isLive: { $exists: false } },
		// 	]
		// };

		// // Use Promise.all to execute multiple asynchronous functions in parallel
		// const [isTeacher, isStudent, session] = await Promise.all([
		// 	// Check if the user is a teacher
		// 	privileges.users.isTeacher(userId),
		// 	// Check if the user is a student
		// 	privileges.users.isStudent(userId),
		// 	// Query the database for session data
		// 	db.findField(collectionName, sessionKeys)
		// ]);

		// // Add data to the pageData object
		// pageData.title = 'Monitor Board';
		// pageData.isTeacher = isTeacher;
		// pageData.isStudent = isStudent;
		// pageData.session = session;
	
		// Render the monitor board page with the pageData object
		res.render('sdlms/monitor', pageData);
	} catch (err) {
		// If an error occurs, pass it to the next middleware function to handle it
		next(err);
	}
};


monitorBoardController.create = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;

	//	The sharer link should basically never expire, therefore we set it to atleast 1 month, 
	//	so that it can be used for a long time

	req.body.link_expiry = Date.now() + (1000 * 60 * 60 * 24 * 30);

	const teacher_uid = parseInt(req.body.teacher_uid || req.uid);
	const classCid = parseInt(req.body.classCategoryId);
	const batchCid = parseInt(req.body.batchCategoryId);
	const mode = req.body.mode;
	const teacherData = await user.getUserFields([teacher_uid], [
		"username",
		"fullname",
		"userslug",
		"picture",//! what if teacher in future updates his photo?
		"status"
	])
	const category = await db.findField(collectionName, { cid: classCid, categoryType: { $exists: true } })
	const sub_category = await db.findField(collectionName, { cid: batchCid, categoryType: 'batch' })
	if (!category) { throw new Error('Invalid Class Cid') }
	if (!sub_category) { throw new Error('Invalid Batch Cid') }

	if (category && category.categoryType != 'class') {
		throw new Error(`Invalid Class cid: ${classCid}, maybe its not a category with the type class`)
	}
	if (sub_category && sub_category.parentCid != classCid) {
		throw new Error(`Invalid Batch cid or maybe its not a part of the class (class category) with cid: ${classCid}`);
	}

	//let members = Array.isArray(JSON.parse(req.body.members)) ? JSON.parse(req.body.members) : [];
	let members = Array.isArray(req.body.members) ? req.body.members : JSON.parse(req.body.members);

	if (!members.find(elem => elem == teacher_uid)) members.push(teacher_uid);

	members = members.map(member => parseInt(member));

	const tid = await db.incrObjectField('global', 'nextTid');
	const currentTime = Date.now();

	let sharePayload = {};
	sharePayload.name = "sharer";
	sharePayload.tid = await db.incrObjectField('global', 'nextTid');;
	sharePayload.type = "class";
	sharePayload.parent_id = tid;
	sharePayload.mode = mode;
	sharePayload.members = members;
	sharePayload.expireAt = (req.body.link_expiry && req.body.link_expiry > currentTime) ? req.body.link_expiry : currentTime + 86400000;
	var _now = currentTime;
	var uuid = "xxxxxxxx-yxxx-yxxx-yxxx".replace(/[xy]/g, (c) => {
		var r = (_now + Math.random() * 16) % 16 | 0;
		_now = Math.floor(_now / 16);
		return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
	sharePayload.uuid = uuid + '-' + currentTime;
	sharePayload.pid = await db.incrObjectField('global', 'nextPid')

	await db.setField(collectionName, sharePayload);
	//console.log(share_resp);


	const payload = {
		uid: parseInt(req.uid),
		tid: parseInt(tid),
		type: "session",
		classCategoryId: classCid,
		category: category.name, // Class category name
		batchCategoryId: batchCid,
		sub_category: sub_category.name, // Batch category name
		topic: req.body.topic ? req.body.topic : "",
		teacher_uid: teacher_uid,
		teacher: teacherData,
		teaser: req.body.teaser,
		relatedSessions: req.body.relatedSessions ? req.body.relatedSessions : 'No related sessions',
		schedule: parseInt(req.body.schedule),
		ended_on: parseInt(req.body.ended_on),
		members: members,
		session_type: req.body.session_type,
		teaching_style: req.body.teaching_style,
		TeachingStyleId: req.body.TeachingStyleId,
		sharer: {
			link: `/sharer?id=${sharePayload.uuid}`,
			id: sharePayload.uuid,
			expireAt: sharePayload.expireAt,
			count: 0
		},
		/** 
		* @author: Shubham Bawner
		* @description: total no of of questions, answers, root of thoughts, words spoken, ... in all TBs of the session
		*/
		sessionSubthreadStats: {},
		createdAt: currentTime,
		updatedAt: currentTime,
	}
	await db.setField(collectionName, payload);



	helpers.formatApiResponse(200, res, { tid: tid, sharer: sharePayload });
}

monitorBoardController.update = async function (req, res, next) {
	const payload = {};
	const key = {
		tid: parseInt(req.body.tid),
		type: "session"
	}
	if (req.body.topic) {
		payload.topic = req.body.topic;
	}
	if (req.body.teaser) {
		payload.teaser = req.body.teaser;
	}
	if (req.body.teaching_style) {
		payload.teaching_style = req.body.teaching_style;
	}
	if (req.body.schedule) {
		payload.schedule = parseInt(req.body.schedule);
	}
	payload.updatedAt = Date.now();

	await monitorBoardController.updateStats(parseInt(req.body.tid))

	helpers.formatApiResponse(200, res, await update(key, payload));
}
/**
 * @author: Shubham Bawner
 * @date: 20th march 22
 * @description: This function is used to update the sessionSubthreadStats, to be called after session is over, in bakend itself, in order to update database and get sessionSubthreadStats from all individual TBs to the session.
 */
monitorBoardController.updateStats = async function (tid) {
	const collectionName = db.collections.DEFAULT;
	const payload = {};
	payload.sessionSubthreadStats = {};

	const tb = await db.findFields(collectionName, { type: 'threadbuilder', topicId: tid });
	console.log(tb, tid)

	payload.sessionSubthreadStats = tb.reduce(function (a, b) {
		return {
			totalQuestions: (a.stats && a.stats.question ? a.stats.question.length : 0) + (b.stats && b.stats.question ? b.stats.question.length : 0),
			totalAnswers: (a.stats && a.stats.answer ? a.stats.answer.length : 0) + (b.stats && b.stats.answer ? b.stats.answer.length : 0),
			totalEureka: (a.stats && a.stats.eureka ? a.stats.eureka.length : 0) + (b.stats && b.stats.eureka ? b.stats.eureka.length : 0),
			totalRoot: (a.stats && a.stats.question ? a.stats.root.length : 0) + (b.stats && b.stats.question ? b.stats.root.length : 0),
			totalCharacters: (a.stats && a.stats.count ? parseInt(a.stats.count.characters) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.characters) : 0),
			totalWords: (a.stats && a.stats.count ? parseInt(a.stats.count.words) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.words) : 0),
			totalThreads: (a.stats && a.stats.count ? parseInt(a.stats.count.threads) : 0) + (b.stats && b.stats.count ? parseInt(b.stats.count.threads) : 0),
		}
	}, 0)

	const key = {
		tid: parseInt(tid),
		type: "session"
	}

	// console.log(payload)
	await update(key, payload);
}

monitorBoardController.deleteSession = async function (req, res, next) {
	const luid = parseInt(req.uid);
	if (!luid || luid < 1) throw new Error("Unauthorized");
	const key = {
		tid: parseInt(req.params.tid),
		type: "session"
	}
	helpers.formatApiResponse(200, res, await deleteItem(key, luid));
}


monitorBoardController.updateClassStatus = async function (req, res, next) {
	const key = {
		tid: parseInt(req.params.tid),
		type: "session"
	}
	const collectionName = db.collections.DEFAULT;
	const currentTime = Date.now();

	const sessionData = await db.findField(collectionName, key);
	if (!sessionData) throw new Error("Session not found");

	const payload = {
		isLive: JSON.parse(req.body.isLive.toLowerCase()),
	};
	if (payload.isLive == false || payload.isLive == 'false') {
		if (!sessionData.isLive && sessionData.state == 'stop') {
			throw new Error('Session is already stopped');
		}
		payload['ended_on'] = currentTime;
	} else if (payload.isLive == true || payload.isLive == 'true') {
		if (sessionData.state == 'stop') { throw new Error('Session is already stopped'); }
		if (sessionData.isLive) { throw new Error('Session is already running'); }
		payload['schedule'] = currentTime;
		payload['ended_on'] = payload['schedule'] + (1000 * 60 * 60);
	}
	helpers.formatApiResponse(200, res, await update(key, payload));
}

async function update(keys, payload) {
	const collectionName = db.collections.DEFAULT;
	let state = await db.updateFieldWithMultipleKeys(collectionName, keys, payload);
	if (!state) { throw new Error("Unauthorized write access!"); }
	return state;
}

async function deleteItem(keys, luid) {
	const isAdmin = await user.isAdministrator(luid);
	const isTeacher = await privileges.users.isTeacher(luid);
	const collectionName = db.collections.DEFAULT;

	if (isAdmin || isTeacher) {
		await db.removeField(collectionName, keys);
		return { deleted: true }
	} else throw new Error("Unauthorized");
}


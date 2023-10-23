'use strict';

var db = require('../database');
var user = require('../user');
var meta = require('../meta');

let Classes = module.exports;

Classes.getClassRoom = async function (classId) {
	const collectionName = db.collections.DEFAULT;
	if (!classId) {
		return  ('INVALID_CLASSID');
	}
	const classRoom = db.findField(collectionName, {
		tid: classId,
		type: "session"
	});
	return classRoom;
}

Classes.startClass = async function (classId, callerUid) {

    const collectionName = db.collections.DEFAULT;
	if (!classId) return  ('INVALID_CLASSID');

	const classRoom = await Classes.getClassRoom(classId);

	if (!classRoom) return  ('CLASS_NOT_FOUND');
	if (classRoom.isLive) return  ('CLASS_ALREADY_RUNNING');
	if (classRoom.state == 'stop') return  ('CLASS_IS_STOPPED');
	if (parseInt(classRoom.teacher_uid, 10) !== parseInt(callerUid, 10)) return  ('NOT_AUTHORIZED');


	const payload = {
		isLive: true,
		schedule: Date.now(),
		ended_on: Date.now() + (1000 * 60 * 60)
	};

	const keys = {
		tid: classId,
		type: "session"
	}

	await db.updateFieldWithMultipleKeys(collectionName, keys, payload);

	return {
        status : "OK",
        data:classRoom
    };
}

Classes.joinClass = async function (classId, uid) {

	if (!classId) return  ('INVALID_CLASSID');
	if (!uid) return  ('INVALID_UID');

	const classRoom = await Classes.getClassRoom(classId);
	const collectionName = db.collections.DEFAULT;

	if (!classRoom) return  ('CLASS_NOT_FOUND');
	if (classRoom.state == 'stop') return  ('CLASS_IS_STOPPED');
	if (parseInt(classRoom.teacher_uid, 10) === parseInt(uid, 10)) return  ('TEACHER_CANNOT_JOIN');

	const userFields = ['username', 'picture', 'fullname', 'uid'];

	const keys = {
		_key: `attendance:${classId}:${uid}`,
		uid: uid
	}

	const userData = await user.getUserFields(uid, userFields);
	const payload = {
		...keys,
		...userData,
		joinedAt: Date.now(),
		type: "attendance"
	};

	const state = await db.updateField(collectionName, keys, payload, {
		upsert: true
	});

	if (state && state.result.upserted) {
		await db.incrementCount(collectionName, {
			_key: `user:${uid}`
		}, 'classes_attended');
	}
	return {
        status:"OK",
        data:userData
    }
}

'use strict';

const classes = require('../sdlms/classes');
const Sockets = require('../socket.io');
const user = require('../user');
const db = require('../database');

var SocketSdlms = {
	class: {
		assets: {
			spreadsheet: {}
		}
	},
	monitor: {},
	comments: {reflections:{}}
}
SocketSdlms.class.enter = async function (socket, data) {

	let classId = data.classId;
	const userFields = ['username', 'picture', 'fullname', 'uid'];
	const userData = await user.getUserFields(socket.uid, userFields);

	joinClassAndNotify(socket, classId, true, userData);

	return {
		status: "OK"
	}
}
function joinClassAndNotify (socket,classId,notify=false,data={}){

	socket.currentClassRooms = socket.currentClassRooms || [];
	leaveCurrentClassRoom(socket, `class:room:${classId}`);
	socket.join(`class:room:${classId}`);
	socket.currentClassRooms.push(`class:room:${classId}`);
	console.log(`class:room:${classId}:: `, Sockets.getCountInRoom(`class:room:${classId}`));
	if(notify) socket.in(`class:room:${classId}`).emit('event:class.joined', data);
	
}
SocketSdlms.class.start = async function (socket, data) {

	if (!socket.uid) throw new Error('You must be logged in to start a class');
	if (!data) throw new Error('Invalid data');
	if (!data.classId) throw new Error('Invalid classId');

	let classId = data.classId;
	let live = await classes.startClass(classId, socket.uid);

	if (live.status == 'OK') {

		joinClassAndNotify(socket, classId);

		(live.data.members || []).forEach(function (uid) {
			socket.in('uid_' + uid).emit('event:class.started', live.data);
		});

	} else {
		throw new Error(live);
	}
	return {
		status: "OK"
	};

};

function leaveCurrentClassRoom(socket, classRoom) {

	if ((socket.currentClassRooms || []).findIndex(e => e == classRoom) > -1) {
		socket.leave(classRoom);
		socket.currentClassRooms = socket.currentClassRooms.filter(e => e != classRoom);
	}

}

SocketSdlms.class.join = async function (socket, data) {

	if (!socket.uid) throw new Error('You must be logged in to start a class');
	if (!data) throw new Error('Invalid data');
	if (!data.classId) throw new Error('Invalid classId');

	let classId = data.classId;
	let joined = await classes.joinClass(classId, socket.uid);

	if (joined.status == 'OK') {
		joinClassAndNotify(socket, classId,true,joined.data);
	}

	return {
		status: "OK"
	};;

};
SocketSdlms.class.assets.update = async function (socket, data) {

	if (!socket.uid) throw new Error('You must be logged in to start a class');
	if (!data) throw new Error('Invalid data');
	if (!data.classId) throw new Error('Invalid classId');
	const collectionName = db.collections.DEFAULT;

	let classId = data.classId;
	// Update attendance

	let payload = {
		$set: { [`stats.${data.asset_type}`]: data.latest }
	}

	await db.updateField(collectionName, { _key: `attendance:${classId}:${socket.uid}` }, payload);

	socket.in(`class:room:${classId}`).emit('event:class.assets.update', data);
}
SocketSdlms.class.assets.spreadsheet.update = function (socket, data, callback) {

	let classId = data.tid;
    socket.in(`class:room:${classId}`).emit('event:spreadsheet.update', data);
};

SocketSdlms.comments.enter = async function (socket, data) {
	let profileId = data.profileId;
	if(!profileId) throw new Error('Invalid profileId');
	socket.join(`profile_${profileId}`);
	console.log(`profile_${profileId}:: `, Sockets.getCountInRoom(`profile_${profileId}`));
	return{
		status: "OK"
	}
}

SocketSdlms.comments.answer = async function (socket, data) {
	let profileId = data.profileId;
	if(!profileId) throw new Error('Invalid profileId');
	socket.join(`question_answer_${profileId}`);
	console.log(`question_answer_${profileId}:: `, Sockets.getCountInRoom(`question_answer_${profileId}`));
	return{
		status: "OK"
	}
}

SocketSdlms.comments.reflections.enter = async function (socket, data) {
	let questionId = data.questionId;
	if(!questionId) throw new Error('Invalid questionId');
	socket.join(`question_${questionId}`);
	console.log(`question_${questionId}:: `, Sockets.getCountInRoom(`question_${questionId}`));
	return{
		status: "OK"
	}
}

module.exports = SocketSdlms;
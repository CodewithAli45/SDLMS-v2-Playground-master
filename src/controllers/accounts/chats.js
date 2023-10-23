'use strict';

const messaging = require('../../messaging');
const meta = require('../../meta');
const user = require('../../user');
const privileges = require('../../privileges');
const helpers = require('../helpers');

const chatsController = module.exports;

chatsController.get = async function (req, res, next) {
	if (meta.config.disableChat) {
		return next();
	}

	const uid = await user.getUidByUserslug(req.params.userslug);
	if (!uid) {
		return next();
	}
	const canChat = await privileges.global.can('chat', req.uid);
	if (!canChat) {
		return next(new Error('[[error:no-privileges]]'));
	}
	const recentChats = await messaging.getRecentChats(req.uid, uid, 0, 19);
	if (!recentChats) {
		return next();
	}

	const menus = {
		left: [{
			icon: '<i class="fas fa-home"></i>',
			title: "Home",
			url: '/user/' + req.params.userslug + '/chats'
		}],
		right: [{
			icon: '<i class="fas fa-home"></i>',
			title: "Home",
			url: '/user/' + req.params.userslug + '/chats'
		}]
	}

	let skeletons = Array(20).fill(0);

	if (!req.params.roomid) {
		return res.render('chats/chat', {
			rooms: recentChats.rooms,
			uid: uid,
			userslug: req.params.userslug,
			nextStart: recentChats.nextStart,
			allowed: true,
			title: '[[pages:chats]]',
			menus: menus,
			skeletons: skeletons
		});
	}
	const room = await messaging.loadRoom(req.uid, { uid: uid, roomId: req.params.roomid });
	if (!room) {
		return next();
	}

	room.rooms = recentChats.rooms;
	room.nextStart = recentChats.nextStart;
	room.title = room.roomName || room.usernames || '[[pages:chats]]';
	room.uid = uid;
	room.userslug = req.params.userslug;
	room.menus = menus;
	room.skeletons = skeletons;
	room.canViewInfo = await privileges.global.can('view:users:info', uid);

	res.render('chats/chat', room);
};

chatsController.redirectToChat = async function (req, res, next) {
	if (!req.loggedIn) {
		return next();
	}
	const userslug = await user.getUserField(req.uid, 'userslug');
	if (!userslug) {
		return next();
	}
	const roomid = parseInt(req.params.roomid, 10);
	helpers.redirect(res, '/user/' + userslug + '/chats' + (roomid ? '/' + roomid : ''));
};

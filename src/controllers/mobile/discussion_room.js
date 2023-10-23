const discussionRoomController = module.exports;

discussionRoomController.get = async function (req, res, next) {
	res.render("mobile/discussion_room/create", {
		title: "classes",
		message: "hello this is working",
	});
};

discussionRoomController.getModListMV = async function (req, res, next) {
	res.render("mobile/discussion_room/modlist_mod", {
		title: "classes",
		message: "hello this is working",
	});
};

discussionRoomController.getModListPV = async function (req, res, next) {
	res.render("mobile/discussion_room/modlist", {
		title: "classes",
		message: "hello this is working",
	});
};

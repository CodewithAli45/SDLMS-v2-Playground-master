const messageController = module.exports;

messageController.getList = async function (req, res, next) {
	res.render("mobile/message/list", {
		title: "Create Event",
		message: "hello this is working",
	});
};

messageController.getChat = async function (req, res, next) {
	res.render("mobile/message/chat", {
		title: "Event chat",
		message: "hello this is working",
	});
};

messageController.getRequest = async function (req, res, next) {
	res.render("mobile/message/request", {
		title: "Event request",
		message: "hello this is working",
	});
};

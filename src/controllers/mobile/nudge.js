const nudgeController = module.exports;

nudgeController.get = async function (req, res, next) {
	res.render("mobile/nudge/create", {
		title: "Nudge Create",
		message: "hello this is working",
	});
};

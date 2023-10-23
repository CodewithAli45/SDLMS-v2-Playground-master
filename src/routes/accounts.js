"use strict";

const winston = require("winston");
const nconf = require("nconf");

var helpers = require("./helpers");
var setupPageRoute = helpers.setupPageRoute;

module.exports = function (app, middleware, controllers) {
	var middlewares = [middleware.exposeUid, middleware.canViewUsers];
	var accountMiddlewares = [
		middleware.exposeUid,
		middleware.canViewUsers,
		middleware.checkAccountPermissions,
	];

	setupPageRoute(app, "/me", middleware, [], middleware.redirectMeToUserslug);
	setupPageRoute(app, "/me/*", middleware, [], middleware.redirectMeToUserslug);
	setupPageRoute(
		app,
		"/uid/:uid*",
		middleware,
		[],
		middleware.redirectUidToUserslug
	);

	setupPageRoute(
		app,
		"/user/:userslug",
		middleware,
		middlewares,
		controllers.accounts.profile.get
	);
	setupPageRoute(
		app,
		"/monitor",
		middleware,
		middlewares,
		controllers.monitor.get
	);
	setupPageRoute(
		app,
		"/live/:topicId",
		middleware,
		middlewares,
		controllers.live.get
	);
	setupPageRoute(
		app,
		"/postclass/:topicId",
		middleware,
		middlewares,
		controllers.postclass.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/following",
		middleware,
		middlewares,
		controllers.accounts.follow.getFollowing
	);
	setupPageRoute(
		app,
		"/user/:userslug/followers",
		middleware,
		middlewares,
		controllers.accounts.follow.getFollowers
	);

	setupPageRoute(
		app,
		"/user/:userslug/posts",
		middleware,
		middlewares,
		controllers.accounts.posts.getPosts
	);
	setupPageRoute(
		app,
		"/user/:userslug/topics",
		middleware,
		middlewares,
		controllers.accounts.posts.getTopics
	);
	setupPageRoute(
		app,
		"/user/:userslug/best",
		middleware,
		middlewares,
		controllers.accounts.posts.getBestPosts
	);
	setupPageRoute(
		app,
		"/user/:userslug/groups",
		middleware,
		middlewares,
		controllers.accounts.groups.get
	);

	setupPageRoute(
		app,
		"/user/:userslug/categories",
		middleware,
		accountMiddlewares,
		controllers.accounts.categories.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/bookmarks",
		middleware,
		accountMiddlewares,
		controllers.accounts.posts.getBookmarks
	);
	setupPageRoute(
		app,
		"/user/:userslug/watched",
		middleware,
		accountMiddlewares,
		controllers.accounts.posts.getWatchedTopics
	);
	setupPageRoute(
		app,
		"/user/:userslug/ignored",
		middleware,
		accountMiddlewares,
		controllers.accounts.posts.getIgnoredTopics
	);
	setupPageRoute(
		app,
		"/user/:userslug/upvoted",
		middleware,
		accountMiddlewares,
		controllers.accounts.posts.getUpVotedPosts
	);
	setupPageRoute(
		app,
		"/user/:userslug/downvoted",
		middleware,
		accountMiddlewares,
		controllers.accounts.posts.getDownVotedPosts
	);
	setupPageRoute(
		app,
		"/user/:userslug/edit",
		middleware,
		accountMiddlewares,
		controllers.accounts.edit.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/edit/username",
		middleware,
		accountMiddlewares,
		controllers.accounts.edit.username
	);
	setupPageRoute(
		app,
		"/user/:userslug/edit/email",
		middleware,
		accountMiddlewares,
		controllers.accounts.edit.email
	);
	setupPageRoute(
		app,
		"/user/:userslug/edit/password",
		middleware,
		accountMiddlewares,
		controllers.accounts.edit.password
	);
	app.use("/.well-known/change-password", function (req, res) {
		res.redirect("/me/edit/password");
	});
	setupPageRoute(
		app,
		"/user/:userslug/info",
		middleware,
		accountMiddlewares,
		controllers.accounts.info.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/settings",
		middleware,
		accountMiddlewares,
		controllers.accounts.settings.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/uploads",
		middleware,
		accountMiddlewares,
		controllers.accounts.uploads.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/consent",
		middleware,
		accountMiddlewares,
		controllers.accounts.consent.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/blocks",
		middleware,
		accountMiddlewares,
		controllers.accounts.blocks.getBlocks
	);
	setupPageRoute(
		app,
		"/user/:userslug/sessions",
		middleware,
		accountMiddlewares,
		controllers.accounts.sessions.get
	);
	app.delete(
		"/api/user/:userslug/session/:uuid",
		[middleware.exposeUid],
		function (req, res, next) {
			// TODO: Remove this entire route in v1.16.0
			winston.warn(
				"[router] `/api/user/:userslug/session/:uuid` has been deprecated, use `DELETE /api/v3/users/:uid/sessions/:uuid` or `DELETE /api/v3/users/bySlug/:userslug/sessions/:uuid` instead"
			);
			if (!res.locals.uid) {
				return next();
			}
			res.redirect(
				`${nconf.get("relative_path")}/api/v3/users/${res.locals.uid
				}/sessions/${req.params.uuid}`
			);
		}
	);

	setupPageRoute(
		app,
		"/notifications",
		middleware,
		[middleware.authenticate],
		controllers.accounts.notifications.get
	);
	setupPageRoute(
		app,
		"/user/:userslug/chats/:roomid?",
		middleware,
		middlewares,
		controllers.accounts.chats.get
	);
	setupPageRoute(
		app,
		"/chats/:roomid?",
		middleware,
		[middleware.authenticate],
		controllers.accounts.chats.redirectToChat
	);
	setupPageRoute(
		app,
		"/customPage",
		middleware,
		middlewares,
		controllers.customPage.get
	);
	setupPageRoute(
		app,
		"/batches",
		middleware,
		middlewares,
		controllers.batches.get
	);
	setupPageRoute(
		app,
		"/batches/:cid",
		middleware,
		middlewares,
		controllers.batches.getByCid
	);
	setupPageRoute(
		app,
		"/parentDashboard",
		middleware,
		middlewares,
		controllers.parentDashboard.get
	);
	setupPageRoute(
		app,
		"/classes",
		middleware,
		middlewares,
		controllers.classes.get
	);
	setupPageRoute(
		app,
		"/sharer",
		middleware,
		middlewares,
		controllers.sharer.get
	);
	setupPageRoute(
		app,
		"/session/microscope/:tid",
		middleware,
		middlewares,
		controllers.microscope.get
	);

	// setupPageRoute(
	// 	app,
	// 	"/DtThon",
	// 	middleware,
	// 	middlewares,
	// 	controllers.DtThon.get
	// );

	setupPageRoute(
		app,
		"/cProfile",
		middleware,
		middlewares,
		controllers.dtthon.cProfile.get
	);

	setupPageRoute(
		app,
		"/aProfile",
		middleware,
		middlewares,
		controllers.dtthon.aProfile.get
	);

	setupPageRoute(
		app,
		"/quizzes",
		middleware,
		middlewares,
		controllers.quiz.get
	);
	setupPageRoute(
		app,
		"/articles",
		middleware,
		middlewares,
		controllers.article.get
	);
	setupPageRoute(
		app,
		"/mobile/events/create",
		middleware,
		middlewares,
		controllers.mobile.events.get
	);
	setupPageRoute(
		app,
		"/mobile/events/details",
		middleware,
		middlewares,
		controllers.mobile.events.getDetails
	);
	setupPageRoute(
		app,
		"/mobile/discussion/create",
		middleware,
		middlewares,
		controllers.mobile.discussion.getCreate
	);
	setupPageRoute(
		app,
		"/mobile/discussion/mod/modlist",
		middleware,
		middlewares,
		controllers.mobile.discussion.getModListMV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/modlist",
		middleware,
		middlewares,
		controllers.mobile.discussion.getModListPV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/mod/rules",
		middleware,
		middlewares,
		controllers.mobile.discussion.getRulesMV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/rules",
		middleware,
		middlewares,
		controllers.mobile.discussion.getRulesPV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/mod/saved",
		middleware,
		middlewares,
		controllers.mobile.discussion.getSaved
	);
	setupPageRoute(
		app,
		"/mobile/discussion/saved",
		middleware,
		middlewares,
		controllers.mobile.discussion.getSaved
	);
	setupPageRoute(
		app,
		"/mobile/discussion/mod/view",
		middleware,
		middlewares,
		controllers.mobile.discussion.getViewMV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/view",
		middleware,
		middlewares,
		controllers.mobile.discussion.getViewPV
	);
	setupPageRoute(
		app,
		"/mobile/discussion/mod/reported",
		middleware,
		middlewares,
		controllers.mobile.discussion.getReported
	);
	setupPageRoute(
		app,
		"/mobile/support/create",
		middleware,
		middlewares,
		controllers.mobile.support.getCreate
	);
	setupPageRoute(
		app,
		"/mobile/support/faq",
		middleware,
		middlewares,
		controllers.mobile.support.getFAQ
	);
	setupPageRoute(
		app,
		"/mobile/support/tickets",
		middleware,
		middlewares,
		controllers.mobile.support.getMyTickets
	);
	setupPageRoute(
		app,
		"/mobile/nudge/create",
		middleware,
		middlewares,
		controllers.mobile.nudge.get
	);
	setupPageRoute(
		app,
		"/mobile/profile/edit",
		middleware,
		middlewares,
		controllers.mobile.profile.getEdit
	);
	setupPageRoute(
		app,
		"/mobile/profile/view",
		middleware,
		middlewares,
		controllers.mobile.profile.getView
	);
	setupPageRoute(
		app,
		"/mobile/article/create",
		middleware,
		middlewares,
		controllers.mobile.article.getCreate
	);
	setupPageRoute(
		app,
		"/mobile/article/view",
		middleware,
		middlewares,
		controllers.mobile.article.getView
	);
	setupPageRoute(
		app,
		"/mobile/post/create",
		middleware,
		middlewares,
		controllers.mobile.post.getCreate
	);
	setupPageRoute(
		app,
		"/mobile/post/view",
		middleware,
		middlewares,
		controllers.mobile.post.getView
	);
	setupPageRoute(
		app,
		"/mobile/message/list",
		middleware,
		middlewares,
		controllers.mobile.message.getList
	);
	setupPageRoute(
		app,
		"/mobile/message/chat",
		middleware,
		middlewares,
		controllers.mobile.message.getChat
	);
	setupPageRoute(
		app,
		"/mobile/message/request",
		middleware,
		middlewares,
		controllers.mobile.message.getRequest
	);
	setupPageRoute(
		app,
		"/cohorts",
		middleware,
		middlewares,
		controllers.cohort.get
	);
	setupPageRoute(
		app,
		"/cohorts/:name",
		middleware,
		middlewares,
		controllers.cohort.getCohortByName
	);
	setupPageRoute(
		app,
		"/myassets/explore/:page?",
		middleware,
		middlewares,
		controllers.assets.get
	);
	setupPageRoute(
		app,
		"/myassets/eaglebuilders/:page?",
		middleware,
		middlewares,
		controllers.assets.eaglebuilders.get
	);
	setupPageRoute(
		app,
		"/myassets/threadbuilders/:page?",
		middleware,
		middlewares,
		controllers.assets.threadbuilders.get
	);
	setupPageRoute(
		app,
		"/myassets/quizes/:page?",
		middleware,
		middlewares,
		controllers.assets.quizes.get
	);
	setupPageRoute(
		app,
		"/myassets/articles/:page?",
		middleware,
		middlewares,
		controllers.assets.articles.get
	);
	setupPageRoute(
		app,
		"/myassets/spreadsheets/:page?",
		middleware,
		middlewares,
		controllers.assets.spreadsheets.get
	);
	setupPageRoute(
		app,
		"/myassets/eaglebuilders/manage/:id",
		middleware,
		middlewares,
		controllers.assets.eaglebuilders.manage
	);
	setupPageRoute(
		app,
		"/myassets/threadbuilders/manage/:id",
		middleware,
		middlewares,
		controllers.assets.threadbuilders.manage
	);
	setupPageRoute(
		app,
		"/myassets/quizes/manage/:id",
		middleware,
		middlewares,
		controllers.assets.quizes.manage
	);
	setupPageRoute(
		app,
		"/myassets/articles/manage/:id",
		middleware,
		middlewares,
		controllers.assets.articles.manage
	);
	setupPageRoute(
		app,
		"/myassets/spreadsheets/manage/:id",
		middleware,
		middlewares,
		controllers.assets.spreadsheets.manage
	);
	setupPageRoute(
		app,
		"/curriculums",
		middleware,
		middlewares,
		controllers.curriculum.get
	);
	setupPageRoute(
		app,
		"/curriculums/:slug",
		middleware,
		middlewares,
		controllers.curriculum.getBySlug
	);
	setupPageRoute(
		app,
		"/cStoryboard/:tid",
		middleware,
		middlewares,
		controllers.dtthon.cStoryboard.get
	);

	setupPageRoute(
		app,
		"/aStoryboard",
		middleware,
		middlewares,
		controllers.dtthon.aStoryboard.get
	);

	setupPageRoute(
		app,
		"/dashboard",
		middleware,
		middlewares,
		controllers.dtthon.dashboard.get
	);

	setupPageRoute(
		app,
		"/explorepage",
		middleware,
		middlewares,
		controllers.dtthon.explorepage.get
	);
	setupPageRoute(
		app,
		"/articleshome",
		middleware,
		middlewares,
		controllers.articles_home.get
	);
	setupPageRoute(
		app,
		"/articleshome/articles/:page?",
		middleware,
		middlewares,
		controllers.articles_home.getArticles
	);
	setupPageRoute(
		app,
		"/articleshome/articles/view/:pid",
		middleware,
		middlewares,
		controllers.articles_home.viewArticle
	);
	setupPageRoute(
		app,
		"/articleshome/search/:page?",
		middleware,
		middlewares,
		controllers.articles_home.search
	);
	setupPageRoute(
		app,
		"/teachingstyles",
		middleware,
		middlewares,
		controllers.teaching_style.get
	);
	setupPageRoute(
		app,
		"/teachingstyles/:slug",
		middleware,
		middlewares,
		controllers.teaching_style.getBySlug
	);
	setupPageRoute(
		app,
		"/widgets/cards",
		middleware,
		middlewares,
		controllers.widgets.cards
	);

	setupPageRoute(
		app,
		"/posters/uploadanecdotes",
		middleware,
		middlewares,
		controllers.posterGenerator.uploadAnecdotes
	);

	setupPageRoute(
		app,
		'/posters/createprofile',
		middleware,
		middlewares,
		controllers.posterGenerator.createProfile
	);

	setupPageRoute(
		app,
		'/posters/createprofile/:_id',
		middleware,
		middlewares,
		controllers.posterGenerator.createProfile
	);

	setupPageRoute(
		app,
		'/posters/:page?',
		middleware,
		middlewares,
		controllers.posterGenerator.getProcessedImages
	);

	setupPageRoute(
		app,
		'/posters/:page?',
		middleware,
		middlewares,
		controllers.posterGenerator.getProcessedImages
	);

	setupPageRoute(
		app,
		'/generator/create/:title?/:description?',
		middleware,
		middlewares,
		controllers.posterGenerator.templategenerator
	);

	setupPageRoute(
		app,
		'/generator/list',
		middleware,
		middlewares,
		controllers.posterGenerator.list
	);

	setupPageRoute(
		app,
		'/generator/edit/:_id',
		middleware,
		middlewares,
		controllers.posterGenerator.editTemplate
	);

	setupPageRoute(
		app,
		'/generator/generate/:_id',
		middleware,
		middlewares,
		controllers.posterGenerator.generate
	);
		
	setupPageRoute(
		app,
		"/widgets/comments",
		middleware,
		middlewares,
		controllers.widgets.comments
	);

	setupPageRoute(
		app,
		"/widgets/comments/:id/reflections",
		middleware,
		middlewares,
		controllers.widgets.reflections
	);

	const PAGES = ['dashboard','html','css','js','output'];
	PAGES.forEach(name => setupPageRoute(app, "/widgets/dtpen/"+name+"/:id", middleware, middlewares, controllers.widgets['dtpen_'+name]));
};
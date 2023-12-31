const spreadsheetsController = module.exports;
const db = require("../../database");
const ObjectId = require('mongodb').ObjectId;
const meta = require('../../meta');


spreadsheetsController.get = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;
	let id = req.query.id,
		page = req.params.page,
		uid = parseInt(req.uid);

	let key = {
		uid: uid,
		type: 'spreadsheet',
	}
	var perPage = meta.config.postsPerPage || 20;
	page = !isNaN(page) && page > 1 ? page - 1 : 0;

	let [data, total] = await Promise.all([
		db.getFieldsWithPagination(collectionName, key, perPage, page),
		db.countDocuments(collectionName, key)
	])
	let tids = data.map(function (item) {
		return (item.tid || item.topicId);
	});


	let topics = (await db.findFields(collectionName, {
		tid: {
			$in: tids
		},
		pid: {
			$eq: null
		}
	}) || []);

	data = data.map(function (sp) {
		sp.topic = topics.find((topic) => topic.tid == sp.tid);
		return sp;
	});

	let pagination = {
		isPrev: page > 0,
		first: `/myassets/spreadsheets`,
		prev: `/myassets/spreadsheets/${page}`,
		current: page + 1,
		total: (Math.ceil(total / perPage) || 1),
		next: `/myassets/spreadsheets/${page + 2}`,
		last: `/myassets/spreadsheets/${(Math.ceil(total / perPage) || 1)}`,
		isNext: ((page + 2) <= Math.ceil(total / perPage)),
	};

	res.render("sdlms/assets/spreadsheets/index", {
		title: "Spreadsheets",
		data: data,
		pagination: pagination
	});
};
spreadsheetsController.manage = async function (req, res, next) {
	const collectionName = db.collections.DEFAULT;
	try {
		let id = req.params.id,
			uid = parseInt(req.uid);

		let key = {
			$or: [{
				'userId': uid
			}, {
				'uid': uid
			}],
			type: 'spreadsheet',
		};

		if (isNaN(id)) {
			key._id = ObjectId(id);
		} else {
			key.pid = Number(id);
		}
		let data = await db.findField(collectionName, key);
		if (!data) throw new Error('Link you have followed is not valid');
		data.topic = await db.findField(collectionName, {
			tid: data.sp,
			pid: {
				$eq: null
			}
		})
		res.render("sdlms/assets/spreadsheets/manage", {
			title: "Spreadsheets",
			data: data
		});
	} catch (error) {
		res.render("sdlms/assets/error", {
			title: "Sharer",
			message: error.message
		});
	}
};
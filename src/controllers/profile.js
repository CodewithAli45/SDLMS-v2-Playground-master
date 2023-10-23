'use strict';

const userProfileController = module.exports;

const users = require('../user');
const db = require('../database');
const api = require('../api');

const {collections} = db;

userProfileController.get = async function (req, res) {
	const { uid = 0 } = req.params;
	const user = await users.getUserFields(uid, []);
	const threadbuilders = await getThreadBuilderStats(uid);
	const liveclass = await getLiveClassStats(uid);
	const dtthon = await getDTthonStats(uid);
	const data = { user, stats: { ...threadbuilders, ...liveclass, ...dtthon } };
	const profile = await getProfile(uid,data.stats);
	data.profile = profile.data;
	data.profileId = profile._id;
	data.isSelf = req.uid == uid;
	data.title = `${user.fullname || user.displayname} - Profile`;
	data.builders = await getBuilderData(uid);
	let buildersLength = Object.keys(data.builders).filter(builder => data.builders[builder].data && data.builders[builder].data.length).length
	data.builders.config ={
		items: Math.floor(3/buildersLength),
		cols: 12/buildersLength,
		margin: buildersLength == 1 ? 10 : 0,
	}
	res.render('profile', data);
};

async function getBuilderData(uid) {
	const {validBuilderTypes} = api.profile;
	let response = {};
	await Promise.all(validBuilderTypes.map(async builder => {
		const fakeRequest = {params: {uid, builder}, query: {}};
		response[builder] = (await api.profile.getBuilderData(fakeRequest))[builder]
	}));
	return response;

}

async function getProfile(uid,stats){
	let profile = await db.findField(collections.GLOBAL.PROFILES_V2, {_key: 'profile:' + uid});

	if (!profile) {
		throw new Error('Profile does not exists!');
	}
	profile.data.stats = (profile.data.stats || []).map(function(_stats,index){
		_stats.value = stats[_stats.type] || 0;
		return _stats;
	});

	return profile;
}

// Threadbuilder stats
async function getThreadBuilderStats(uid) {
	uid = parseInt(uid, 10);
	const matchStage = {
		$match: {
			type: 'threadbuilder',
			$or: [{ uid: uid }, { userId: uid }],
		},
	};
	const projectStage = {
		$project: {
			threadsCount: { $size: { $ifNull: ['$data.threads', '$threads'] } },
			subThreadsCount: {
				$sum: {
					$map: {
						input: { $ifNull: ['$data.threads', '$threads'] },
						as: 'thread',
						in: { $size: { $ifNull: ['$$thread.subthreads', []] } },
					},
				},
			},
			threadsCharacterCount: {
				$sum: {
					$map: {
						input: { $ifNull: ['$data.threads', '$threads'] },
						as: 'thread',
						in: {
							$sum: {
								$map: {
									input: { $ifNull: ['$$thread.subthreads', []] },
									as: 'subthread',
									in: {
										$strLenCP: { $ifNull: ['$$subthread.content', ''] },
									},
								},
							},
						},
					},
				},
			},
			interpretationCharacterCount: {
				$sum: {
					$map: {
						// add condition if content is null
						input: { $ifNull: ['$data.threads', '$threads'] },
						as: 'thread',
						in: {
							$sum: {
								$map: {
									input: {
										$filter: {
											input: '$$thread.subthreads',
											as: 'subthread',
											cond: { $gt: [{ $strLenCP: { $ifNull: ['$$subthread.interpretation', ''] } }, 0] },
										},
									},
									as: 'subthread',
									in: {
										$strLenCP: { $ifNull: ['$$subthread.content', ''] },
									},
								},
							},
						},
					},
				},
			},
			interpretationCount: {
				$sum: {
					$map: {
						// add condition if content is null
						input: { $ifNull: ['$data.threads', '$threads'] },
						as: 'thread',
						in: {
							$size: {
								$filter: {
									input: '$$thread.subthreads',
									as: 'subthread',
									cond: { $gt: [{ $strLenCP: { $ifNull: ['$$subthread.interpretation', ''] } }, 0] },
								},
							},
						},
					},
				},
			},
		},
	};
	const groupStage = {
		$group: {
			_id: null,
			threadBuildersCount: { $sum: 1 },
			threadsCount: { $sum: '$threadsCount' },
			subThreadsCount: { $sum: '$subThreadsCount' },
			threadsCharacterCount: { $sum: '$threadsCharacterCount' },
			interpretationCharacterCount: { $sum: '$interpretationCharacterCount' },
			interpretationCount: { $sum: '$interpretationCount' },
		},
	};

	const threadBuilders = await db.Aggregate(collections.DEFAULT, [
		matchStage,
		projectStage,
		groupStage,
	]);

	return Array.isArray(threadBuilders) && threadBuilders.length ? threadBuilders[0] : {};
}

// Attendence of live class
async function getLiveClassStats(uid) {
	uid = parseInt(uid, 10);

	const matchStage = {
		$match: {
			uid: uid,
			type: 'attendance',
		},
	};

	const groupStage = {
		$group: {
			_id: null,
			attendanceCount: { $sum: 1 },
		},
	};

	const liveClass = await db.Aggregate(collections.DEFAULT, [
		matchStage,
		groupStage,
	]);

	return Array.isArray(liveClass) && liveClass.length ? liveClass[0] : {};
}

// DTthon stats
async function getDTthonStats(uid) {
	uid = parseInt(uid, 10);

	const matchStage = {
		$match: {
			uid: uid,
			$or: [{ type: 'project' }, { type: 'submission' }],
		},
	};

	const groupStage = {
		$group: {
			_id: null,
			dtthons: { $sum: { $cond: [{ $eq: ['$type', 'project'] }, 1, 0] } },
			scorecards: { $sum: { $cond: [{ $eq: ['$type', 'submission'] }, 1, 0] } },
		},
	};

	const dtthon = await db.Aggregate(collections.DEFAULT, [
		matchStage,
		groupStage,
	]);

	return Array.isArray(dtthon) && dtthon.length ? dtthon[0] : {};
	// return dtthon;
}

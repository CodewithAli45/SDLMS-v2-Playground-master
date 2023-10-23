'use strict';

const db = require('../../database');
const utilities = require("../../controllers/utils");
const User = require("../../user");
const ObjectId = require("mongodb").ObjectId;
const utils = require('./utils');

const collectionNames = {
    threadbuilder: db.collections.DEFAULT,
    eaglebuilder: db.collections.DEFAULT,
    article: db.collections.DEFAULT,
    post: db.collections.DEFAULT,
    "observation:reflection": db.collections.GLOBAL.OBSERVATION,
};
const validAssets = ["threadbuilder", "eaglebuilder", "article", "post", "observation:reflection"];
const userFields = [
    "username",
    "fullname",
    "picture",
    "signature",
];

const assetsApi = module.exports;

assetsApi.getAssets = async (req) => {
    let {
        users=[], query="", type="threadbuilder", startDate="", endDate="", contentLength=70
    } = req.body;
    const keys = {type};
    const page = parseInt(req.query.page || req.body.page) || 0;
    const limit = parseInt(req.query.limit || req.body.limit) || 5;
    const {id} = req.query;

    if (id && req.query.type) {
        type = req.query.type;
    }

    if (contentLength && isNaN(contentLength)) {
        throw new Error('content-length must be a number')
    }
    
    if (!validAssets.includes(type)) {
        throw new Error("Invalid asset type: " + type);
    }

    if (id) {
        if (id.length != 24) {
            throw new Error('Invalid Id supplied');
        }

        return await db.findField(collectionNames[type], {_id: ObjectId(id)});
    }

    if (users.length && !Array.isArray(users)) {
        users = [users];
    }
    users = users.map(el => parseInt(el));
    if (users.length) {
        keys['uid'] = {$in: users};
    }

    let regexMatch = { $regex: new RegExp(query.trim()), $options: '$i' };

    if (query) {
        switch (type) {
            case 'threadbuilder':
                keys['$or'] = [{
                    'threads.subthreads.content': regexMatch
                }, {
                    'threads.summary.content': regexMatch
                }];
                break;
    
            case 'eaglebuilder':
                keys['$or'] = [{
                    'tracks.subtracks.content': regexMatch
                }, {
                    'tracks.arguement': regexMatch
                }, {
                    'tracks.transitions.content': regexMatch
                }, {
                    'tracks.transitions.content': regexMatch
                }];
                break;

            case 'post':
            case 'observation:reflection':
                keys['content'] = regexMatch;
                break;

            case 'article':
                keys['$or'] = [{title: regexMatch}, {content: regexMatch}];
                break;
    
            default:
                break;
        }
    }

    if (startDate && endDate) {
        if (isNaN(startDate) || isNaN(endDate)) {
            throw new Error('Start and End dates should be a timestamp (long int values)');
        }

        startDate = new Date(Number(startDate)).toISOString();
        endDate = new Date(Number(endDate)).toISOString();

        keys['$or'] = [{
            createdAt: {$gte: startDate, $lt: endDate}
        }, {
            timestamp: {$gte: startDate, $lte: endDate}
        }]
    }

    const [assets, count=0] = await Promise.all([
        db.getFieldsWithPagination(collectionNames[type], keys, limit, page),
        db.countDocuments(collectionNames[type], keys),
    ]);

    const assetsWithAuthor = await Promise.all(assets.map(async (asset) => {
        let fields = {};
        ['_id', 'uid', 'type', 'createdAt', 'updatedAt','sticker'].forEach(el => fields[el] = asset[el]);

        if (asset.timestamp) {
            fields.createdAt = asset.timestamp;
        }

        if (asset.content) {
            let {content} = asset;

            content = utilities.htmltoText(asset.content);
            fields.content = content.substr(0, parseInt(contentLength));
        }

        if (asset.uid) {
            fields.user = await User.getUserFields(asset.uid, userFields);

            switch(type) {
                case 'observation:reflection':
                    const companyFields = ['name', 'project', 'createdAt'];
                    const profileFields = ['name', 'email', 'companyId', 'role', 'createdAt'];
    
                    let company = {}, profile = await db.findField(collectionNames[type], 
                        {uid: asset.uid, type: 'videoref:profile'}, profileFields);
    
                    if (profile) {
                        company = await db.findField(collectionNames[type], {_id: ObjectId(profile.companyId)}, companyFields);
                    }
    
                    fields.observation = {profile, company};
                    break;

                case 'threadbuilder':
                    {
                        let threads = utils.getThreadsFromThreadbuilder(asset);
                        if (threads.length) {
                            fields.content = threads[0].content;
                        }
                    }
                    break;

                case 'eaglebuilder':
                    {
                        let threads = utils.getThreadsFromEaglebuilder(asset);
                        if (threads.length) {
                            fields.content = threads[0].content;
                        }
                    }
                    break;

                default:
                    break;
            }
        }

        return fields;
    }));

    return utilities.paginate(`/globals${req.url}`, assetsWithAuthor, count, limit, page);
}

assetsApi.updateAssetSticker = async (req) => {
    const uid = parseInt(req.uid); // @imshawan -> Uid check baad me laga denge! Abhi sabko sticker lagaane do. 😁
    // Deepansu -> Ha Kyu nhi ... Sticker lagaane do sabko ... 😁
    // @imshawan -> API fix kar di sir, abhi sab sticker laga payengee!!
    // Deepansu -> I really appreciate your efforts and hardwork, Thank you so much for this ... 😁
    const {id} = req.params;
    const {type, sticker} = req.body;

    if (id.length != 24) {
        throw new Error('Invalid Id supplied');
    }

    if (!validAssets.includes(type)) {
        throw new Error("Invalid asset type: " + type);
    }

    const keys = {
        _id: ObjectId(id),
        type:type
    };

    const asset = await db.findField(collectionNames[type], keys);
    if (!asset) {
        throw new Error('No asset was found with the Id: ' + id);
    }

    const state = await db.updateField(collectionNames[type], keys, { $set: {sticker} });
	return {
		updated: state.result.n === 1,
	};
}
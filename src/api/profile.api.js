"use strict";
var meta = require('../meta');

const _ = require('lodash');
const db = require('../database');
const user = require('../user');
const winston = require('winston');
const ObjectId = require('mongodb').ObjectId;
const nconf = require('nconf');
const utils = require('../controllers/utils');


/**
 * @date 01-06-2023
 * @author imshawan <hello@imshawan.dev>
 * @description Contains all the logic for the profile page to work
 */

const profileApi = module.exports;

const collectionNames = {
    rigor: 'rigor_builder',
    maturity: 'maturity_builder',
    insight: 'insight_spotter'
}
const builderTypes = {
    rigor: 'reason',
    maturity: 'maturity',
    insight: 'insight'
}

const validBuilderTypes = Object.keys(builderTypes);
const DEFAULT_BUILDER_DATA_COUNT = 10;
const PAGE = 0;
const ORDER_OF_SORTING = {_id: -1};

profileApi.validBuilderTypes = validBuilderTypes;

profileApi.getBuilderData = async (req) => {
    const {builder} = req.params;
    let uid = parseInt(req.params.uid);
    let page = parseInt(req.query.page) || PAGE;
    let limit = parseInt(req.query.limit) || DEFAULT_BUILDER_DATA_COUNT;

    if (!validBuilderTypes.includes(builder)) {
        throw new Error(`Invalid builder type ${builder}`);
    }

    const searchKeys = {uid, type: builderTypes[builder]};

    const [builderCount, builderAssets] = await Promise.all([
        db.countDocuments(collectionNames[builder], searchKeys),
        db.getFieldsWithPagination(collectionNames[builder], searchKeys, limit, page, ORDER_OF_SORTING)
    ]);

    return {
        [builder]: {
            count: builderCount,
            data: builderAssets
        }
    };
}
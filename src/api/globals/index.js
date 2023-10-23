'use strict';

const globalApis = module.exports;

globalApis.assets = require('./assets.api');
globalApis.reflectiveComments = require('./reflectiveComments.api');
globalApis.insightReactions = require('./insightReactions');
globalApis.reflectiveCommentsv2 = require('./reflectiveComments.v2.api');
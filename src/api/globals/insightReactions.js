'use strict';

/**
 * @date 09-03-2023
 * @author Purnima Kumar
 * @description This file contains all the functionality for Insight Spotter 
 */

const db = require('../../database');
const ObjectId = require('mongodb').ObjectId;
const user = require('../../user');

const insightReactions = module.exports;
const collectionName = db.collections.INSIGHTREACTIONS.REACTIONS;

insightReactions.get = async (req) => {
  const reaction = req.query.reaction;
  return db.findFields(collectionName, {name: reaction});
};
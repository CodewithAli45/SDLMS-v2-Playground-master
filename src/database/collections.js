/**
 * @date 30-04-2022
 * @author imshawan
 * @description This file contains all the valid collections in the database.
 * Please use this file for adding the new collection names here.
 */

const DEFAULT = 'objects'; // Default collection name used by nodebb

const SDLMS = {
	CURRICULUM: 'curriculums',
    THREADBUILDER: 'threadbuilders',
    ARTICLES_HOME: 'articles_home',
    TEACHING_STYLE: 'teaching_styles',
    POLL: 'polls',
};

const GLOBAL = {
    COMMENT: 'comments',
    ENQUIRY: 'enquiries',
    RUBRIC: 'rubrics',
    REQUESTS: 'requests_logs',
    TOC: 'tocs',
    // TASK:"tasks",
    JOURNAL: 'journals',
    FAQ: 'faqs',
    LEARNING_AGENDA: 'learning_agendas',
    COMMUNITYBUILDER: 'community_builders',
    CONTENT: 'contents',
    OBSERVATION: 'observations',
    GENERATORS: 'generators',
    REFLECTIVE_COMMENTS: 'reflective_comments',
    REFLECTIVE_COMMENTS_V2: 'reflective_comments_v2',
    INSIGHT_SPOTTER: 'insight_spotter',
    APPLICATION_MANAGER: 'applications',
    PROFILES_V2: 'profiles_v2'
}

const INSIGHTREACTIONS = {
    REACTIONS: 'reactions',
}

const MOBILE = {

};

const DT_THON = {

};

const DTPEN = {
    PROJECT: 'dtpen_projects'
}

const POSTERGENERATOR = 'poster_generator';
const TEMPLATE = 'templates'

const PAYMENTS = {

};


module.exports = {
    DEFAULT, SDLMS, MOBILE, DT_THON, PAYMENTS,POSTERGENERATOR,TEMPLATE, GLOBAL, INSIGHTREACTIONS,
    DTPEN,
};

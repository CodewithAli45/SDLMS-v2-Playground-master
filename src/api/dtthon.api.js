"use strict";
var meta = require('../meta');

const groups = require('../groups');
const _ = require('lodash');
const categories = require('../categories');
const db = require('../database');
const user = require('../user');
const topics = require('../topics');
const plugins = require('../plugins');
const slugify = require('../slugify');
const winston = require('winston');
const Uploader = require('../controllers/FIleUpload');
const ObjectId = require('mongodb').ObjectId;
const nconf = require('nconf');
const axios = require('axios');
const { privileges } = require('../controllers/admin');
const userPrivileges = require('../privileges');
const utils = require('../controllers/utils');


const dtthon = module.exports;


/** 
    * @author: Shubham Bawner
    * @description: crud for project
*/

/**for testing: "tid": 370 */

dtthon.createProject = async function (req, res, next) {
    try {

        //db.creditDetails.insertOne({test: "test"});
        console.log("createProject", req.body);
        let tag = req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : JSON.parse(req.body.tags)) : [];


        if (!req.body.title) throw new Error("title not found!");
       
        let tid = await db.incrObjectField("global", "nextTid");

        let payload = {

            mainPid: 0,
            lastposttime: 0,
            postcount: 0,
            viewcount: 0,
            cid: parseInt(req.body.cid),
            uid: req.uid, // recruiter uid
            mainPid: 0,
            title: req.body.title || "",//*

            globalTags: tag || [], //! store slugified tag names as: tag:<slugified_tag_name>, use _key aspect of tag    

            type: "project",
            tasks: [],//*
            status: req.body.status || "draft", // published, draft, closed, visible

            short_description: req.body.short_description || "",//*
            description: req.body.description || "",//*
            start_time: null,//*
            //end_time: (Array.isArray(req.body.end_time) ? req.body.end_time : JSON.parse(req.body.end_time)).map(N => parseInt(N)),
            learning_outcomes: req.body.learning_outcomes ? (Array.isArray(req.body.learning_outcomes) ? req.body.learning_outcomes : JSON.parse(req.body.learning_outcomes)) || [] : [],
            pre_requisites: req.body.pre_requisites ? (Array.isArray(req.body.pre_requisites) ? req.body.pre_requisites : JSON.parse(req.body.pre_requisites)) || [] : [],
            uploaded_images: req.body.uploaded_images ? (Array.isArray(req.body.uploaded_images) ? req.body.uploaded_images : JSON.parse(req.body.uploaded_images)) : [],

            tools: req.body.tools ? (Array.isArray(req.body.tools) ? req.body.tools : JSON.parse(req.body.tools)) : [],
            assets: req.body.assets ? (Array.isArray(req.body.assets) ? req.body.tools : JSON.parse(req.body.assets)) : [],
        }

        tid = await createDtThonTopic(payload, tid);
        console.log(payload)
        return { tid: tid };
    } catch (e) { 
        console.error(e); 
        throw new Error(e.message);;
    }

}

/**
 * published: see and make submission
 * visible: see but not make submission
 * draft: not visible
 * closed: not visible, end time is noted while closing it.
 */

dtthon.editProject = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");

        const keys = {
            uid: luid,
            tid: parseInt(req.body.tid)
        }
        let parsedData = {};

        if (req.body.content) parsedData.content = req.body.content;
        if (req.body.title) parsedData.title = req.body.title;
        if (req.body.short_description) parsedData.topic_tid = req.body.short_description;
        if (req.body.description) parsedData.description = req.body.description;
        if (req.body.start_time) parsedData.start_time = req.body.start_time;
        //if (req.body.end_times) parsedData.end_time = req.body.end_times;
        if (req.body.uploaded_images) parsedData.uploaded_images = req.body.uploaded_images;
        if (req.body.pre_requisites) parsedData.uploaded_images = req.body.pre_requisites;
        if (req.body.learning_outcomes) parsedData.uploaded_images = req.body.learning_outcomes;
        if (req.body.status) {
            parsedData.status = req.body.status;
            if (req.body.status == "published") {
                parsedData.start_time = Date.now();
            }
            if (req.body.status == "closed") {
                parsedData.end_time = Date.now();
            }
        }

        let state = await db.updateFieldWithMultipleKeys(collectionName, keys, parsedData);
        if (!state) { throw new Error("Unauthorized write access!"); }
        return state;
    } catch (e) { console.error(e); throw new Error(e.message); ;}
}

dtthon.getProjects = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        //get 1 project with a tid
        console.log(req.body)
        // let requirments = req.body.requirments ? (Array.isArray(req.body.requirments) ? req.body.requirments : JSON.parse(req.body.requirments)) : [];

        if (req.query.tid) {
            let tid = parseInt(req.query.tid);
            if (!tid || tid < 1) throw new Error("Invalid tid");

            let keys = {
                tid: tid,
                status: { $regex: "published|visible" }
            }

            let Project = await db.findField(collectionName, keys);

            if (!Project) { throw new Error("No Project found!"); }
            Project.recruiter = await user.getUserFields([Project.uid], [
                "username",
                "fullname",
                "userslug",
                "picture",
            ]);
            return Project;
        }

        //(get all projects for perticular filters, no login needed)

        const isRecruiter = req.query.isRecruiter ? JSON.parse(req.query.isRecruiter.toLowerCase()) : false;
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limitBy) || 5;
        let keys = {
            type: "project",
            status: { $regex: "published|closed" }
        }



        if (req.query.fromDate || req.query.toDate || req.query.from || req.query.to) keys = { ...keys, ...getKeysByTime(req, isRecruiter ? "timestamp" : "start-time") }
        if (req.query.tags) {
            let tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
            keys = { ...keys, globalTags: { $regex: `${tags.join("$|")}$` } } // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web 
            //console.log(`tag:${req.query.tags.join("$|tag:")}$`)
        }
        // did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
        if (isRecruiter) {
            keys.uid = req.uid;
            keys.status = { $regex: "published|closed|draft" }
        }
        if (req.query.cid) keys.cid = parseInt(req.query.cid);

        
        let Projects = null;
        
        Projects = await db.getFieldsWithPagination(collectionName, keys, limit, page, {timestamp:-1})
        let count = await db.countDocuments(collectionName, keys);

        if (!Projects) { throw new Error("Unauthorized write access!"); }
        if (!isRecruiter) {
            Projects = await Promise.all(Projects.map(async (elem) => {
                let recruiter = await user.getUserFields([elem.uid], [
                    "username",
                    "fullname",
                    "userslug",
                    "picture",
                ]);
                return { ...elem, recruiter: recruiter }
            }));
        }
            
        Projects = await Promise.all(Projects.map(async (elem) => {
            let macrodata = {};
            macrodata.applicant_count = await db.countDocuments(collectionName, { type: "submissionInfo", tid: elem.tid }); //count of applicants

            macrodata.pending_count = await db.countDocuments(collectionName, 
                { type: "submissionInfo", tid: elem.tid,  "submission_history.eval_status":"pending"}
            ); //count of pending applicants
            macrodata.reAsigned_count = await db.countDocuments(collectionName, 
                { type: "submissionInfo", tid: elem.tid,  "submission_history.eval_status":"re-asigned"}
            ); //count of pending applicants


            // macrodata.pending_count = 50; //count of  applicants

            return { ...elem, macrodata:macrodata }
        }));
        
        return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
    } catch (e) { console.error(e);throw new Error(e.message); }

}
dtthon.getCustomProjects = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        //get 1 project with a tid
        let requirments = req.query.requirments 
        console.log(requirments)
        if(!Array.isArray(requirments)) requirments = [requirments]

        if(!requirments.length) throw new Error("Invalid requirments passed!");

        //(get all projects for perticular filters, no login needed)

        const isRecruiter = req.query.isRecruiter ? JSON.parse(req.query.isRecruiter.toLowerCase()) : false;
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limitBy) || 5;
        let keys = {
            type: "project",
            status: { $regex: "published|closed" }
        }



        if (req.query.fromDate || req.query.toDate || req.query.from || req.query.to) keys = { ...keys, ...getKeysByTime(req, isRecruiter ? "timestamp" : "start-time") }
        if (req.query.tags) {
            let tags = Array.isArray(req.query.tag) ? req.query.tag : [req.query.tag];
            keys = { ...keys, globalTags: { $regex: `${tags.join("$|")}$` } } // $ sign in regex is for newline, this is added for not getting webdevelopement when searching for tag web 
            //console.log(`tag:${req.query.tags.join("$|tag:")}$`)
        }
        // did not use internal functionality of isRecruiter, because: recruiter may want to see all projects on forum that are not made by him (just like applicant)
        if (isRecruiter) {
            keys.uid = req.uid;
            keys.status = { $regex: "published|closed|draft" }
        }
        if (req.query.cid) keys.cid = parseInt(req.query.cid);

        
        let Projects = null;
        
            let requirmentsKey = {}
            requirments.forEach(requirment => {
                requirmentsKey[requirment] = `$${requirment}`
            })
            console.log(requirmentsKey, keys)
            Projects = await db.Aggregate(collectionName, [{$match:keys},{$sort:{timestamp:-1}},{$skip:page * limit},{$limit:limit} , {$project:requirmentsKey}])
            //console.log(Projects, typeof projects)
        
        let count = await db.countDocuments(collectionName, keys);

        if (!Projects) { throw new Error("Unauthorized write access!"); }
        if (!isRecruiter && requirments.indexOf("recruiter") != -1) {
            Projects = await Promise.all(Projects.map(async (elem) => {
                let recruiter = await user.getUserFields([elem.uid], [
                    "username",
                    "fullname",
                    "userslug",
                    "picture",
                ]);
                return { ...elem, recruiter: recruiter }
            }));
        }
            
        if(requirments.indexOf("macrodata") > -1)
        Projects = await Promise.all(Projects.map(async (elem) => {
            let macrodata = {};
            macrodata.applicant_count = await db.countDocuments(collectionName, { type: "submissionInfo", tid: elem.tid }); //count of applicants

            macrodata.pending_count = await db.countDocuments(collectionName, 
                { type: "submissionInfo", tid: elem.tid,  "submission_history.eval_status":"pending"}
            ); //count of pending applicants
            macrodata.reAsigned_count = await db.countDocuments(collectionName, 
                { type: "submissionInfo", tid: elem.tid,  "submission_history.eval_status":"re-asigned"}
            ); //count of pending applicants


            // macrodata.pending_count = 50; //count of  applicants

            return { ...elem, macrodata:macrodata }
        }));
        
        return utils.paginate(`/apps${req.url}`, Projects, count, limit, page);
    } catch (e) { console.error(e);throw new Error(e.message); }

}

dtthon.deleteProject = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try{ 
    let tid = parseInt(req.body.tid);
    if (!tid || tid < 1) throw new Error("Invalid tid");
    let uid = parseInt(req.uid);
    if (!uid || uid < 1) throw new Error("unauthorised!");

    let keys = {
        tid: tid,
        type: "project",
        uid: req.uid
    }

    let state = await db.removeField(collectionName, keys);
    if (state.result.n === 1) { return { deleted: true } }
    else { return { deleted: false } }

} catch (e) { console.error(e); throw new Error(e.message);}

}

/** 
    * @author: Shubham Bawner
    * @description: crud for task
*/
dtthon.addTask = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("Tid of a project is required");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project"
        }

        console.log(req.body.task, typeof req.body.task)
        console.log(JSON.parse(req.body.task))

        let task = JSON.parse(req.body.task);
        if(!task) throw new Error("Task is required");
        let task_id = await db.incrObjectField('global', 'nextPid'); // task id
        let taskData = {
            task_id: task_id,
            task_title: task.task_title?task.task_title: "", 
            task_description: task.task_description?task.task_description: "", 
            // tools: task.tools ? Array.isArray(task.tools) ?  task.tools :JSON.parse(task.tools) : [],
            // assets: task.assets ? Array.isArray(task.assets) ?task.assets: JSON.parse(task.assets) : [],
            tools: task.tools ?  task.tools : [],
            assets: [],
        }

        let state = await db.update(collectionName, keys, { $push: { tasks: taskData } });
        if (!state) { throw new Error("Unauthorized write access!"); }

        console.log(taskData)
        return { task_id: task_id };
    } catch (e) { console.error(e); throw new Error(e.message);; }
}

//? I am not verifying what data they are sending, not even keys...
dtthon.editTask = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("Tid of a project is required");
        const task_id = parseInt(req.body.task_id);
        if (!task_id) throw new Error("task_id of a task to be edited is required");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project",
            "tasks.task_id": task_id
        }

        let task = req.body.task
        if(typeof task == "string") task = JSON.parse(task);

        const taskData = {}

        for (let key in task) {
            taskData[`tasks.$.${key}`] = task[key]
        }

        console.log(taskData)

        return await db.update(collectionName, keys, { $set: { ...taskData } });

    } catch (e) { console.error(e); throw new Error(e.message);}
}

dtthon.deleteTask = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("Tid of a project is required");
        const task_id = parseInt(req.body.task_id);
        if (!task_id) throw new Error("cid of a task to be edited is required");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project",
        }
        console.log(keys)
        return await db.update(collectionName, keys, { $pull: { tasks: { task_id: task_id } } });

    } catch (e) { console.error(e); throw new Error(e.message);;}

}


/** 
    * @author: Shubham Bawner
    * @description: crud for Asset
*/
dtthon.addAsset = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("tid of a project is required to add asset to its tasks");
        const task_id = parseInt(req.body.task_id);
        if (!task_id) throw new Error("task_id of a task is required to add asset to it");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project",
            "tasks.task_id": task_id
            // "tasks.$.assets.asset_id": asset_id
        }

        console.log(req.body,keys, typeof req.body.asset)
        console.log(JSON.parse(req.body.asset))

        let asset = JSON.parse(req.body.asset);
        if(!asset) throw new Error("Asset is required");
        if(!asset.asset_title) throw new Error("asset title is required");
        // if(!asset.asset_content) throw new Error("asset content title is required");
        let asset_id = await db.incrObjectField('global', 'nextPid'); // task id
        let assetData = {
            asset_id: asset_id,
            asset_title: asset.asset_title ,
            asset_description: asset.asset_description?asset.asset_description: "", 
            asset_type: asset.asset_type?asset.asset_type: "display_asset", // input_asset or display_asset
            asset_content: asset.asset_content// tb, eb, article, reflection, quiz, other
        }

        if(asset.asset_type == "display_asset"){
            assetData.display_asset_url = asset.asset_url?asset.asset_url: "";
        }
        
        let state = await db.update(collectionName, keys, { $push: { "tasks.$.assets": assetData } });
        if (!state) { throw new Error("Unauthorized write access!"); }

        console.log(assetData)
        return { asset_id: asset_id };
    } catch (e) { console.error(e); throw new Error(e.message);; }
}

//? I am not verifying what data they are sending, not even keys...
dtthon.editAsset = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("tid of a project is required to edit asset to its tasks");
        const task_id = parseInt(req.body.task_id);
        if (!task_id) throw new Error("task_id of a task is required to edit asset from it");
        const asset_id = parseInt(req.body.asset_id);
        if (!asset_id) throw new Error("asset_id of a task is required to edit");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project",
        }

        let asset = req.body.asset
        if(typeof asset == "string") asset = JSON.parse(asset);

        const assetData = {}

        for (let key in asset) {
            assetData[`tasks.$[outer].assets.$[inner].${key}`] = asset[key]
        }

        console.log(assetData)

        let arrayFilterOptions = {arrayFilters: [{"outer.task_id" : task_id}, {"inner.asset_id" : asset_id}]}
        
        let query = [keys, { $set: { ...assetData }}, arrayFilterOptions]

        console.log(query)

        return {"modified": await db.updateField(collectionName, ...query)};

    } catch (e) { console.error(e); throw new Error(e.message);}
}

dtthon.deleteAsset = async function (req, res, next) {
    const collectionName = db.collections.DEFAULT;
    try {
        const luid = parseInt(req.uid);
        if (!req.uid || luid < 1) throw new Error("Unauthorized");
        const tid = parseInt(req.body.tid);
        if (!tid) throw new Error("Tid of a project is required");
        const task_id = parseInt(req.body.task_id);
        if (!task_id) throw new Error("cid of a task to be edited is required");
        const asset_id = parseInt(req.body.asset_id);
        if (!asset_id) throw new Error("asset_id of a task is required to edit");

        const keys = {
            uid: luid,
            tid: tid,
            type: "project",
        }
        console.log(keys)
        let arrayFilterOptions = {arrayFilters: [{"outer.task_id" : task_id}]}
        return {"deleted":await db.updateField(collectionName, keys, {$pull: {"tasks.$[outer].assets": {"asset_id": asset_id} }}, arrayFilterOptions)};

    } catch (e) { console.error(e); throw new Error(e.message);;}

}


//create submission info object
dtthon.submissionInfo = async function (req) {
    const collectionName = db.collections.DEFAULT;
    try {
    const uid = req.uid;
    const tid = parseInt(req.body.tid);
    const timestamp = req.timestamp || Date.now();

    if (!uid || uid < 1) {
        throw new Error('error:invalid-uid');
    }
    if (!tid || tid < 1) {
        throw new Error('error:invalid-tid');
    }

    let status = await db.findField(collectionName, { type: "project", tid: tid });
    console.log(status)
    if (status['status'] != "published") {
        throw new Error('no published project with given tid found ! : ' + tid);
    }
    // if (req.toPid && !utils.isNumber(req.toPid)) {
    //     throw new Error('error:invalid-pid');
    // }
    let recruiter_uid = await db.getObjectField('topic:' + tid, 'uid');
    if(!recruiter_uid) throw new Error("Invalid project! attached recruiter not found !");
    
    let userName = await db.getObjectField('user:' + uid, 'username');

    if(!req.body.submit_time || !Date(req.body.submit_time)) throw new Error("Invalid submit time!");

    const pid = await db.incrObjectField('global', 'nextPid');
    let postData = {
        pid: pid,
        uid: uid,
        tid: tid,
        timestamp: timestamp,
        type: "submissionInfo",
        attachment_type: "project",
        attachment_id: tid,
        recruiter_uid: recruiter_uid,
        name: userName, // name of the user
        selected_submit_time: req.body.submit_time,
        latest_task_submit_time: req.body.latestSubmissionTime,
        submission_history: []
    };

    // if (req.toPid) {
    //     postData.toPid = req.toPid;
    // }
    // if (req.ip && meta.configs.trackIpPerPost) {
    //     postData.ip = req.ip;
    // }
    // if (req.handle && !parseInt(uid, 10)) {
    //     postData.handle = req.handle;
    // }


    await db.setObject('post:' + postData.pid, postData);

    //,ysterious nodebb operations... ;)
    const topicData = await topics.getTopicFields(tid, ['cid', 'pinned']);
    postData.cid = topicData.cid;
    await Promise.all([
        db.incrObjectField('global', 'postCount'),
        //User.onNewPostMade(postData),
        //Posts.uploads.sync(postData.pid),
    ]);

    console.log(postData)
    return { tid: postData.tid, pid: postData.pid };

} catch (e) { console.error(e);throw new Error(e.message); }


};

dtthon.getSubmissions = async function (req) {
    const collectionName = db.collections.DEFAULT;
    try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limitBy) || 5;
    let isRecruiter = req.query.isRecruiter ? JSON.parse(req.query.isRecruiter.toLowerCase()) : false;
    
    isRecruiter = isRecruiter && req.uid ? await userPrivileges.users.isRecruiter(req.uid) : false;
    
    const uid = parseInt(req.uid)
    if (!uid || uid < 1) throw new Error("unauthorised");
    let keys = {
        type: "submissionInfo",
        uid: uid
    }
    if (isRecruiter){ 
        if(! await userPrivileges.users.isRecruiter(req.uid)) throw new Error("unauthorised as a recruiter");
        let tid = parseInt(req.query.tid);
        if(!tid){ throw new Error("tid required") }
        keys.tid = tid
    };
    let count = 0;
    let submissions = await db.getFieldsWithPagination(collectionName, keys, limit, page, {timestamp:-1});

    if (!submissions) { count = await db.countDocuments(collectionName, keys) }
    return utils.paginate(`/apps${req.url}`, submissions, count, limit, page);
} catch (e) { console.error(e); throw new Error(e.message);}

}

dtthon.makeSubmission = async function (req) {
    const collectionName = db.collections.DEFAULT;
try{ 
    //console.log(req.body)

    const timestamp = req.timestamp || Date.now();
    const uid = req.uid
    if (!uid || uid<1) {
        throw new Error('invalid-uid');
    }

    
    const submission_pid = parseInt(req.body.submission_pid)
    if(!submission_pid || submission_pid < 1) throw new Error("invalid submission-pid");
    
    const submissionInfo = await db.findField(collectionName, {pid: submission_pid, type: "submissionInfo"});
    if(!submissionInfo) throw new Error("invalid submission-pid provided");

    
    const tid = submissionInfo.tid;
    const project = await db.findField(collectionName, {tid: tid, type: "project"});
    if(project.status!="published") throw new Error("currently this project is not accepting submissions!");


    console.log(submissionInfo)
    
    if(!req.body.task_submissions ) 
    throw new Error("invalid task-submissions");

    const task_submissions = JSON.parse(req.body.task_submissions);
    const task_submissions_keys = Object.keys(task_submissions);
    const task_submissions_length = task_submissions_keys.length;

    if(task_submissions_length > 1) 
    throw new Error("currently only one task submission is allowed at a time ");
    if(task_submissions_length < 1)
    throw new Error("no task submission found");
   
    for(let task_id in task_submissions){
        // const task = await db.findField(collectionName, 
        //     {tid:tid, type:"project", "tasks.task_id":parseInt(task_id) }
        // );
        if(!project.tasks.find(task => task.task_id == parseInt(task_id))) 
        throw new Error("invalid task-id provided :"+task_id);

        if(!task_submissions[task_id] || task_submissions[task_id].length < 1)
        throw new Error("please provide link to submission: "+task_id);



        submissionInfo["submission_history"].forEach(submission => {
            console.log(submission['task_submissions'])
            if(submission['task_submissions'][parseInt(task_id)]){
                if(submission['eval_status'] != 're-asigned' ){
                    throw new Error("submission already submitted for this task, not yet re-asigned");
                }
            }
        })


    }
    

    const submission_id = await db.incrObjectField('global', 'nextPid');
    let submission = {
        timestamp: timestamp,
        submission_id: submission_id,
        eval_status: req.body.eval_status?req.body.eval_status:"pending",
        //response_url: req.body.response_url,
        submit_time: Date.now(),
        task_submissions: JSON.parse(req.body.task_submissions)
    };
    
    let key = { type: "submissionInfo", pid: submission_pid, uid: uid }
    console.log(key, submission)
    let status = await db.update(collectionName, key, { $push: {submission_history : submission}, $set: { latest_task_submit_time: submission.submit_time } });

    return {status:status, submission_id: submission.submission_id};

}catch(e){
    console.log(e)
    throw new Error(e.message);
}
}

dtthon.reviewSubmission = async function (req) {
    const collectionName = db.collections.DEFAULT;
    try{ 
    const uid = parseInt(req.uid);
    const submission_pid = parseInt(req.body.pid);
    const submission_id = parseInt(req.body.submission_id);
    const review_status = req.body.review_status;
    console.log(req.body, submission_pid, submission_id, review_status)
    if(!uid || uid<1){
        throw new Error('invalid-uid');
    }
    if(!submission_pid || submission_pid<1){
        throw new Error('error:invalid-pid');
    }
    if(!submission_id || submission_id<1){
        throw new Error('error:invalid-submission_id');
    }
    if(!review_status || typeof review_status !== "string"){
        throw new Error('error:invalid-review_status');
    }

    let key = { type: "submissionInfo", pid: submission_pid,recruiter_uid: uid, "submission_history.submission_id": submission_id }  


    let status = await db.update(collectionName, key, { $set: { "submission_history.$.eval_status": review_status } });

    console.log(status, key)
    
    if(status)
    return {status:"success"};
    else return {status:"failure"};

}catch(e){
    console.log(e)
    throw new Error(e.message);
}
}


    /**
         * //! under construction !!
         * @author Shubham Bawner
         * @desc creates dtThon project as a topic, that is associated with multiple cids 
         */
    const createDtThonTopic = async function (data, tid) {
        try{ 
        // This is an internal method, consider using Topics.post instead
        const timestamp = data.timestamp || Date.now();

        tid = tid ? tid : await db.incrObjectField('global', 'nextTid');

        let topicData = {
            tid: tid,
            ...data,
            slug: tid + '/' + (slugify(data.title) || 'topic'),
            timestamp: timestamp,

            //! note that data has to have:
            // uid: data.uid,
            // cid: data.cid,//! needs to be an array of cids
            // mainPid: 0,
            // title: data.title,
            // slug: tid + '/' + (slugify(data.title) || 'topic'),
            // lastposttime: 0,
            // postcount: 0,
            // viewcount: 0,
        };

        if (data.picture) {
            topicData.picture = data.picture;
        }
        if (data.type) {
            topicData.type = data.type;
        }

        const result = await plugins.hooks.fire('filter:topic.create', { topic: topicData, data: data });
        topicData = result.topic;
        await db.setObject('topic:' + topicData.tid, topicData);

        for (let i = 0; i < topicData.cid.length; i++) {
            let cid = topicData.cid[i];
            await Promise.all([
                db.sortedSetsAdd([
                    'topics:tid',
                    'cid:' + cid + ':tids',
                    'cid:' + cid + ':uid:' + topicData.uid + ':tids',
                ], timestamp, topicData.tid),
                db.sortedSetsAdd([
                    'topics:views', 'topics:posts', 'topics:votes',
                    'cid:' + cid + ':tids:votes',
                    'cid:' + cid + ':tids:posts',
                ], 0, topicData.tid),
                categories.updateRecentTid(cid, topicData.tid),
                user.addTopicIdToUser(topicData.uid, topicData.tid, timestamp),
                db.incrObjectField('category:' + cid, 'topic_count'),
                db.incrObjectField('global', 'topicCount'),
                Topics.createTags(data.tags, topicData.tid, timestamp),
            ]);
        }
        console.log('----topicData----', topicData);

        plugins.hooks.fire('action:topic.save', { topic: _.clone(topicData), data: data });
        return topicData.tid;
    }catch(e){
        console.log(e)
        throw new Error(e.message);
    }
    };

//--- helper function

let getKeysByTime = (req, parameter) => {
    try{ 

    let from = (!isNaN(parseInt(req.query.from)) && JSON.stringify(req.query.from).length >= 12)
        ? parseInt(req.query.from) : Date.now() - (3600000 * 24 * 7) //default period 1 week, 3600000 is no. of milliseconds in 1 hour
    let to = (!isNaN(parseInt(req.query.to)) && JSON.stringify(req.query.to).length >= 12)
        ? parseInt(req.query.to) : Date.now()  //default period 1 week, 3600000 is no. of milliseconds in 1 hour

    let customFromDate = undefined, customToDate = undefined;

    if (req.query.fromDate) {
        customFromDate = req.query.fromDate.split('/') // pass as "yyyy/mm/dd"
        customFromDate[1]--;//month is by default taken from 0(0 is Jan), but query is to be passed as general date(Jan is 1) 
        from = !isNaN(new Date(...customFromDate).getTime()) ? new Date(...customFromDate).getTime() : from;
    } if (req.query.toDate) {
        customToDate = req.query.toDate.split('/')  // pass as "yyyy/mm/dd"
        customToDate[1]--;//month is by default taken from 0(0 is Jan), but query is to be passed as general date(Jan is 1) 
        to = !isNaN(new Date(...customToDate).getTime()) ? new Date(...customToDate).getTime() : to;
    }
    const keys = {
        $and: [
            { [parameter]: { $gte: from } },
            { [parameter]: { $lte: to } },
        ]
    };
    return keys;
}catch(e){
    console.log(e)
    throw new Error(e.message);
}
}

/* //TODO LIST  dtthons.api.js
3. //TODO add field validation for tasks, assets ...
3. //TODO remove unwanted console logs
3. //TODO lock tb after submission
3. //TODO submission to asset
*/

/* //TODO LIST  sdl.api.js
 * TODO delete Comment api is not working
 * TODO testing left for creating with toPid
 */

/* //TODO LIST payments...
1. need different collection for payments
2. need razorpay transaction (make payment)
3. need transaction history, track of all the transactions(buy, sell, etc)(maybe refunds, bonuses ...)
3.1 need each transaction details to be stored, id of payment from razorpay, purchase id from our side, etc properly
4. need catalogue of all products currently purchased by the user
5. need CRUD for products
6. need locking mechanism for transactions, when a payment/purchase is hapening we need to lock the same user from making any other payment/purchase
*/
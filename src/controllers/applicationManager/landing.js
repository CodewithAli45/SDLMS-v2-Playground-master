"use strict";

const landing = module.exports;
const db = require("../../database");

landing.get = async function (req, res, next) {
    var landing = {};
    // console.log("err")
    landing.title = 'landing application manager';
    // landing.sidebar = utils.sidebar(sidebar, 'landing',{
    //     classes: 'active'
    // });

    res.render('applicationManager/landing', landing);
};

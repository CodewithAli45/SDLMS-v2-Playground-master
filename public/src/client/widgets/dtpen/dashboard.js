"use strict";

define("forum/widgets/dtpen/dashboard", ['api'], function (api) {

    const DASHBOARD = {};
    const Logger = new ConsoleLogger('DTPEN-DASHBOARD');


    /**
     * Initialize the DASHBOARD.
     */
    DASHBOARD.init = async function () {
        Logger.log('init');


    }

    return DASHBOARD;

});

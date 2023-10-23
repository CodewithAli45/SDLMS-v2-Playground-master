"use strict";

define("forum/sdlms/monitor", ['api'], function (api) {

    const Monitor = {};
    const Logger = new ConsoleLogger('Monitor');



    /**
     * Initialize the monitor.
     */
    Monitor.init = async function () {
        Logger.log('init');
        // $(".owl-carousel").owlCarousel({
        //     items:4,
        //     margin:15,
        //     responsive:{
        //         0:{
        //             items:1
        //         },
        //         576:{
        //             items:2
        //         },
        //         768:{
        //             items:3.5
        //         },
        //         1400:{
        //             items:4
        //         }
        //     }
        // });
    }

    /**
     * Get the next session.
     *
     * @returns {Object|null} The next session or null if there is no next session.
     */
    Monitor.getNextSession = async function () {
        Logger.log('getNextSession');
        try {
            return ajaxify.data.session || null;
        } catch (err) {
            Logger.error(`Error getting next session: ${err.message}`);
            return null;
        }
    }

    /**
     * Get sessions of a given type.
     *
     * @param {string} type - The type of sessions to get.
     * @returns {Promise} A promise that resolves with an array of sessions.
     */
    Monitor.getSessions = async function (type) {
        if (!type) {
            Logger.error('getSessions: type is required');
            return [];
        }
        Logger.log('getSessions', type);
        try {
            return await api.get(`/sdlms/sessions/${type}`);
        } catch (err) {
            Logger.error(`Error getting sessions: ${err.message}`);
            return [];
        }
    }

    /**
     * Add event listeners to the monitor.
     */
    Monitor.events = function () {
        Logger.log('events');
        $('#monitor').on('click', '.session', function (e) {
            // Handle click event.
        });
    }

    return Monitor;

});

"use strict";

define("forum/chats/rooms", [], function () {

    let Rooms = {};
    const Logger = new ConsoleLogger('CHAT-ROOMS');


    Rooms.init = async function () {
        Logger.log('init');
        Rooms.events();
    }

    Rooms.events = function () {
        Logger.log('events');

        $('.create-discussion-room').off('submit').on('submit', async function (e) {
            e.preventDefault();

            let formData = new FormData(this);

            // doAjax()
            $(this).find('button').prop('disabled', true);

            let res = await doAjax({
                url: "/app/createroom",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
            });

            if(res.status.code != "ok") Logger.log(res);

            $(this).find('button').prop('disabled', true);

            $(window).trigger('action:room.created', res.response);
        });

        $('.create-discussion-room').off('reset').on('reset', function (e) {
            $(this).find('button').prop('disabled', false);
        });

        app.imagePicker();
    }

    return Rooms;
});

"use strict";

define("forum/chats/chat", [
    'forum/chats/recents',
    'forum/chats/messages',
    'forum/chats/rooms'
], function (Recents,Messages,Rooms) {

    let Chat = {};
    const Logger = new ConsoleLogger('CHAT');


    Chat.init = async function () {
        Logger.log('init');
        Recents.init();
        Messages.init();
        Rooms.init();

        Chat.events();
    }

    Chat.events = function(){
        Logger.log('events');
        
    }
   
    return Chat;
});

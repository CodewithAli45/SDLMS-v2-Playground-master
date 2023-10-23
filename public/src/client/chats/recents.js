"use strict";


define("forum/chats/recents", ["benchpress"], function (Benchpress) {
    const Recents = {
        START: 0, // Start index for loading chats
        LIMIT: 20, // Maximum number of chats to load
        COUNTER: 0, // Counter for tracking the number of times chats are loaded
        EVENTS: {
            GET: "modules.chats.getRecentChats", // Event name for retrieving recent chats
        },

        Logger: new ConsoleLogger("CHAT-RECENT"), // Logger instance for logging messages

        init: async function () {
            this.Logger.log("init"); // Log initialization
            this.events(); // Set up event listeners
            this.render(); // Render the initial chat data
        },

        events: function () {
            // Event handler for when a chat message is sent
            $(window).off("action:chat.sent").on("action:chat.sent", (event, data) =>
                this.updateLastMessage(data)
            );

            // for Adding new Room
            $('.add-new-room').off('click').on('click', () => {
                $('.create-room').show();
                $('.room-messages').removeClass('col-sm-8').addClass('col-sm-5');
            });

            $('#chat-list').off('click', '.chat[data-room-id]').on('click', '.chat[data-room-id]', function(e){
                const roomId = $(this).attr('data-room-id');
                $(window).trigger('action:recent.show', {roomId});
            });

            $(window).off('action:room.created').on('action:room.created', (event, data) => {
                this.addNewRoom(data);
                $('.create-room').hide();
                $('.room-messages').removeClass('col-sm-5').addClass('col-sm-8');
                $('.create-discussion-room').trigger('reset');
            });

        },

        addNewRoom: async function (data) {
            let room = this.sanitizeRoom(data);
            let result = await Benchpress.render("chats/partials/recent", { rooms: [room] });
            $("#chat-list").prepend(result);
            this.formatTimestamps();
        },

        updateLastMessage: function (message) {
            message = this.sanitizeRoom(message); // Sanitize the message
            if (!message) return; // If the message is invalid, abort
            this.Logger.log("updateLastMessage", message); // Log the update
            $(`.chat[data-room-id="${message.roomId}"] .chat-user-message`).text(message.lastMessage).attr("title", message.lastMessage); // Update the last message in the chat UI
            $(`.chat[data-room-id="${message.roomId}"] .chat-user-time-text`).attr("data-time", message.lastMessageTime); // Update the last message timestamp in the chat UI
            this.moveRoomToTop(message.roomId); // Move the room to the top of the chat list
            this.formatTimestamps(); // Format the timestamps in the chat UI
        },

        moveRoomToTop: function (roomId) {
            this.Logger.log("moveRoomToTop", roomId); // Log the room movement
            let $room = $(`.chat[data-room-id="${roomId}"]`);
            $room.prependTo($("#chat-list")); // Move the room to the top of the chat list in the UI
        },

        render: async function () {
            const data = await this.load(); // Load chat data
            const rooms = data.rooms.map(this.sanitizeRoom).filter(Boolean); // Sanitize and filter chat rooms
            const result = await Benchpress.render("chats/partials/recent", { rooms }); // Render the chat template with the sanitized data
            $("#chat-list")[this.COUNTER ? "append" : "html"](result); // Append or replace the chat list HTML based on load counter

            if (!this.COUNTER) {
                $(window).trigger('action:recent.show', data.rooms[0]);
                this.Logger.log('action:recent.show', data);
            }

            this.COUNTER++; // Increment the load counter
            this.START = data.nextStart || this.START; // Update the start index for loading chats
            this.Logger.log(this.COUNTER, this.START, this.LIMIT); // Log load counter, start index, and limit
            this.formatTimestamps(); // Format the timestamps in the chat UI
        },

        formatTimestamps: function () {
            $('[data-time]').each(function () {
                const time = $(this).attr('data-time');
                const format = $(this).attr('data-format') || 'hh:mm A';
                $(this).text(moment(Number(time)).format(format));
            });
        },
        sanitizeRoom: function (room) {
            if (!room.teaser) {
                room.teaser = {
                    content: room.content || "",
                    timestamp: room.timestamp || "",
                    user: room.fromUser || { displayname: "" }
                }
            }
            console.log("ABS",room);
            const { lastUser, teaser, roomName, name, unread: hasUnread, usernames, description = "" } = room;
            let lastMessage = teaser ? `${teaser.user.displayname}: ${teaser.content}` : usernames; // Format the last message
            lastMessage = lastMessage ? lastMessage : description;
            const lastMessageTime = teaser ? teaser.timestamp : "";
            const roomId = Number(room.roomId);
            const thumbnail = room.thumbnail || "";
            if (!roomId) return null;
            return {
                roomId,
                roomName: roomName || name,
                usernames,
                lastMessage,
                lastMessageTime,
                hasUnread,
                thumbnail,
            };
        },

        load: function () {
            return new Promise((resolve) => {
                socket.emit(this.EVENTS.GET, {
                    uid: ajaxify.data.uid,
                    after: this.START,
                    stop: this.LIMIT,
                }, (err, data) => {
                    if (err) {
                        this.Logger.error(err); // Log any errors during chat loading
                        data = {
                            rooms: [],
                            nextStart: this.START,
                        };
                    }
                    resolve(data);
                });
            });
        },
    };

    return Recents;
});

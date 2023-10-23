'use strict';

define('forum/chats/messages', ['benchpress'], function (Benchpress) {
    const Messages = {
        roomId: 0, // ID of the current chat room
        room: {}, // Object representing the current chat room
        SENDING: false, // Flag indicating if a message is currently being sent
        EVENTS: { // Event names used for communication with the server
            GET: 'modules.chats.loadRoom', // Event to load chat room data
            SEND: 'modules.chats.send', // Event to send a message
            RECEIVE: 'event:chats.receive', // Event to receive a new message,
            LEAVE: 'modules.chats.leave', // Event to leave a chat room
            GET_MESSAGES: 'modules.chats.getMessages' // Event to get messages
        },
        MAX_MESSAGE_LENGTH: 1000, // Maximum length of a chat message
        Logger: new ConsoleLogger('CHAT-MESSAGES'), // Logger object for logging messages
        OFFSET: 100, // offset for loading more messages
        LOADING: false, // Flag indicating if messages are currently being loaded
        $container: null, // jQuery object representing the chat window
        MESSAGES_PER_PAGE: 49, // Number of messages to load per page
        HAS_MORE_MESSAGES: true, // Flag indicating if there are more messages to load
        SCORLLING_TO_BOTTOM: false, // Flag indicating if the chat window is being scrolled to the bottom

        init() {
            this.Logger.log('init');
            this.$container = $('#messages-container');
            this.events();
        },

        events() {
            // Handle events related to chat functionality
            this.handleTextarea();
            // Handle click event on the send message button
            $('.send-message-button').off('click').on('click', () => this.sendMessage());

            // Handle event to show the recent chat
            $(window).off('action:recent.show').on('action:recent.show', (event, data) => {
                this.Logger.log('action:recent.show', data);
                if (!data.roomId || this.roomId === data.roomId || this.LOADING) return;
                if (this.roomId) socket.emit(this.EVENTS.LEAVE, this.roomId);
                this.roomId = data.roomId;
                this.render();
                app.enterRoom(this.roomId);
                if ($('.chat-actions-container').hasClass('emoji-shown')) {
                    $('#emojiPicker').trigger('click');
                }
                socket.emit('modules.chats.markRead', this.roomId);
            });

            // Handle event to receive a new message
            socket.off(this.EVENTS.RECEIVE).on(this.EVENTS.RECEIVE, (data) => {
                this.receiveMessage(data);
            });

            // Handle click event on the emoji picker
            $('#emojiPicker').off('click').on('click', () => {
                $(this).toggleClass('active');
                $('.chat-actions-container').toggleClass('emoji-shown');
                $('#message').trigger('input');
                this.setEmojiPicker();
            });



        },

        handleScroll() {

            $('#scroll-to-bottom').addClass('d-none');

            $('#scroll-to-bottom').off('click').on('click', () => {
                this.scrollToBottom();
            });

            // Handle scroll event on the chat window
            this.$container.off('scroll').on('scroll', () => {
                // Handle scroll event on the chat window

                if (this.isAtBottom()) {
                    $('#scroll-to-bottom').addClass('d-none');
                }else {
                    $('#scroll-to-bottom').removeClass('d-none');
                }

                if (this.isAtTop() && !this.LOADING && !this.SCORLLING_TO_BOTTOM) {
                    // Load more messages if the chat window is scrolled to the top
                    this.loadMoreMessages();

                }
            });
        },
        setEmojiPicker() {
            // Set up the emoji picker functionality

            if (this.picker) return; // If the picker is already initialized, return

            this.picker = picmo.createPicker({
                rootElement: $('.emoji-picker')[0],
                emojisPerRow: Math.floor($('.emoji-picker').width() / 45),
                showPreview: false,
                visibleRows: 3
            });

            // Event listener for emoji selection
            this.picker.addEventListener('emoji:select', (e) => {
                const { emoji } = e;
                const cursorPos = $('#message').prop('selectionStart');
                const v = $('#message').val();
                const textBefore = v.substring(0, cursorPos);
                const textAfter = v.substring(cursorPos, v.length);

                $('#message').val(textBefore + emoji + textAfter);
                $('#message').trigger('input');
            });
        },

        async receiveMessage(data) {
            // Handle receiving a new message

            if (Number(data.roomId) != this.roomId) return; // Ignore messages not related to the current room

            const message = this.sanitizeMessages(data.message);
            this.Logger.log('receiveMessage', message);
            if (!message) return; // Ignore empty messages
            this.room.messages.push(message);

            // Render the new message using Benchpress template
            const result = await Benchpress.render('chats/partials/message', {
                ...this.room,
                messages: [message]
            });

            this.$container.append(result);
            this.scrollToBottom();


        },

        scrollToBottom() {
            // Scroll the chat window to the bottom
            this.SCORLLING_TO_BOTTOM = true;
            this.$container.scrollTop(this.$container[0].scrollHeight);
            this.formatTimestamps();
            this.SCORLLING_TO_BOTTOM = false;
        },

        async render() {
            // Render the chat room
            this.LOADING = true;
            const data = await this.load();
            if (data.messages.length < this.MESSAGES_PER_PAGE) this.HAS_MORE_MESSAGES = false;
            data.messages = data.messages.map(this.sanitizeMessages).filter(Boolean);
            this.room = data;
            this.setRoom();
            // Render the chat messages using Benchpress template
            const result = await Benchpress.render('chats/partials/message', data);

            this.$container.html(result);
            $(`.chat[data-room-id]`).removeClass('active');
            $(`.chat[data-room-id=${this.roomId}]`).addClass('active').removeClass('unread-message');
            this.scrollToBottom();
            this.LOADING = false;

            // put a delay on the scroll event to prevent it from firing too often

            setTimeout(() => {
                this.Logger.log('handleScroll');
                this.handleScroll();
            }, 1000);
        },

        formatTimestamps() {
            // Format timestamps in the chat messages

            $('[data-time]').each(function () {
                const time = $(this).attr('data-time');
                const format = $(this).attr('data-format') || 'hh:mm A';
                $(this).text(moment(Number(time)).format(format));
            });
        },

        setRoom() {
            // Set the chat room information in the chat header

            const $chatHeader = $('.room-messages .chat-header');
            $chatHeader.find('.chat-user-name').text(this.room.name || '');
            $chatHeader.find('.message-sub-header').text(this.room.description || '');
            $chatHeader.find('.skeleton').removeClass('skeleton');
            $chatHeader.find('.chat-user-image img').attr('src', this.room.thumbnail || '');
        },

        sanitizeMessages(message) {
            // Sanitize chat messages

            Messages.Logger.log('sanitizeMessages', message);

            let { content, fromUser, timestamp, system, self } = message;
            fromUser = fromUser.displayname || fromUser.username;
            self = system ? false : self;

            if (String(content).trim().length === 0) return null; // Ignore empty messages

            return {
                content,
                fromUser,
                timestamp,
                system,
                self
            };
        },

        handleTextarea() {
            // Handle textarea input for composing messages

            const $message = $('#message');
            const $messageRemaining = $('.message-remaining');

            $message.off('input').on('input', function () {
                // Adjust the height of the textarea based on its content

                this.style.height = 'auto';
                this.style.height = `${this.scrollHeight}px`;
                const maxHeight = parseInt($(this).css('max-height'));
                this.style.overflowY = this.scrollHeight > maxHeight ? 'auto' : 'hidden';
                Messages.$container.css('height', `calc(100% - ${$('.send-message').height() + 33}px)`);

                // Update the message length counter and handle maximum length

                const messageLength = String($message.val()).trim().length;
                const messageRemaining = Messages.MAX_MESSAGE_LENGTH - messageLength;
                $messageRemaining.text(messageRemaining);
                $messageRemaining.toggleClass('text-danger', messageRemaining < 0);
                if (messageRemaining < 0) {
                    $messageRemaining.text(0);
                    $message.val(String($message.val()).trim().substr(0, Messages.MAX_MESSAGE_LENGTH));
                }
                Messages.scrollToBottom();
            });

            $message.off('keydown').on('keydown', function (e) {
                // Handle Enter key press to send a message

                if (e.keyCode === 13 && !e.shiftKey) {
                    e.preventDefault();
                    Messages.sendMessage();
                }
            });

            $message.trigger('input');
        },

        sendMessage() {
            // Send a chat message

            if (this.SENDING) {
                return this.Logger.log('Already sending message');
            }

            const $message = $('#message');
            const message = $message.val().trim();

            if (message.length > this.MAX_MESSAGE_LENGTH) {
                return this.Logger.log(`Message too long, max length is ${this.MAX_MESSAGE_LENGTH} characters, you have ${message.length}`);
            }

            if (message.length === 0) {
                return this.Logger.log('Message is empty');
            }

            this.SENDING = true;
            $message.val('');
            $message.trigger('input');
            this.setButtonState($('.send-message-button'), true);

            // Emit the SEND event to send the message to the server
            socket.emit(this.EVENTS.SEND, {
                roomId: this.roomId,
                message
            }, (err, data) => {
                this.SENDING = false;
                if (err) {
                    $message.val(message);
                    $message.trigger('input');
                    return this.Logger.log('Error sending message', err);
                }

                this.Logger.log('Message sent', data);
                this.setButtonState($('.send-message-button'), false);

                // Trigger the chat sent event
                $(window).trigger('action:chat.sent', data);

                // Toggle the emoji picker if it is open
                if ($('.chat-actions-container').hasClass('emoji-shown')) {
                    $('#emojiPicker').trigger('click');
                }
            });
        },

        setButtonState(button, loading) {
            // Set the state of the send message button

            if (loading) {
                button.attr('disabled', true);
                button.find('i').removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');
            } else {
                button.attr('disabled', false);
                button.find('i').removeClass('fa-spinner fa-spin').addClass('fa-paper-plane');
            }
        },

        isAtTop() {
            // Check if the chat window is scrolled to the top

            return this.$container.scrollTop() < this.OFFSET;
        },

        isAtBottom() {
            // Check if the chat window is scrolled to the bottom

            return this.$container.scrollTop() + this.$container.innerHeight() >= this.$container[0].scrollHeight;
        },

        async loadMoreMessages() {
            // Load more messages in the chat window
            if (!this.HAS_MORE_MESSAGES || this.LOADING || this.SCORLLING_TO_BOTTOM){
                this.Logger.log(`Skipping loadMoreMessages, HAS_MORE_MESSAGES: ${this.HAS_MORE_MESSAGES}, LOADING: ${this.LOADING}, SCORLLING_TO_BOTTOM: ${this.SCORLLING_TO_BOTTOM}`);
                return;
            } 

            this.LOADING = true;
            const start = this.room.messages.length;
            const data = await this.load(start, true);
            if (data.messages.length < this.MESSAGES_PER_PAGE) this.HAS_MORE_MESSAGES = false;
            data.messages = data.messages.map(this.sanitizeMessages).filter(Boolean);
            this.room.messages = [...data.messages, ...this.room.messages];
            const result = await Benchpress.render('chats/partials/message', {
                ...this.room,
                messages: data.messages
            });

            let lastMessage = this.$container.find('.single-message').first();
            this.$container.prepend(result);
            lastMessage[0].scrollIntoView({ behavior: 'auto' });
            this.LOADING = false;
            this.formatTimestamps();

        },

        load(start = 0, isMessage = false) {
            // Load chat room data from the server
            try {
                return new Promise((resolve, reject) => {
                    socket.emit(this.EVENTS[isMessage ? 'GET_MESSAGES' : 'GET'], {
                        roomId: Number(this.roomId),
                        start,
                        uid: ajaxify.data.uid
                    }, (err, data) => {
                        if (err || !data) {
                            return reject(err);
                        }
                        data = isMessage ? {
                            messages: data,
                        } : data;

                        resolve(data);
                    });
                });
            } catch (error) {
                this.Logger.log('Error loading chat room', error);

                return {
                    messages: []
                }
            }
        }
    };

    return Messages;
});

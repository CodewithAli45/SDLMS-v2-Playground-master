"use strict";

define("forum/widgets/comments/list", ['api'], function (api) {

    const Comments = {
        profileId: null
    };
    const Logger = new ConsoleLogger('COMMENTS');



    /**
     * Initialize the Comments.
     */
    Comments.init = async function () {
        Logger.log('init');
        this.events();
        this.profileId = ajaxify.data.profileId;

        socket.emit('sdlms.comments.enter', {
            profileId: this.profileId
        }, function (err, res) {
            Logger.log('sdlms.comments.enter', err, res);
        });

        socket.emit('sdlms.comments.answer', {
            profileId: this.profileId
        }, function (err, res) {
            Logger.log('sdlms.comments.answer', err, res);
        });

        $('.back').hide();
        if(ajaxify.data.isSelf){
            $('.card').addClass('pointer');
        }

        if(self != top){
            $('.widgets-header').remove();
            $('.widgets-body').css('height','100vh')
        }

        if(!$('#list .card').length){
            $('#list').html('<img src="https://res.cloudinary.com/dtvioluzf/image/upload/v1685718588/6974855_4380_1_2_vpqxdy.jpg" class="h-100 no-content">').addClass('text-center')
        }
    }


    Comments.events = function () {
        $('.send-comment').off('submit').on('submit', this.submitComment);

        socket.off('event:question_created').on('event:question_created', (question) => {

            if (question._key != `profile:${this.profileId}:question`) return;
            if ($(`.card[data-id="${question._id}"]`).length) return;
            $('#list .no-content').remove()
            $('#list').removeClass('text-center')

            app.parseAndTranslate('widgets/comments/single', {
                questions: {
                    data: [question]
                }
            }, (html) => {
                $('#list').prepend(html);
                app.timeago();
                $(`[data-id="${question._id}"]`)[0].scrollIntoView();
                ajaxify.data.questions.data.push(question);
                if(ajaxify.data.isSelf){
                    $('.card').addClass('pointer');
                }
                $('#list').find('.card').first().off('click').on('click', function () {
                    Comments.handleCardClick(this);
                });
            });
        });

        socket.off('event:answer_created').on('event:answer_created', (answer) => {
            let id = answer.questionId;
            $(`[data-answer="${id}"]`).html(`<p class="card-text text-ellipse-4"><b>A:</b> ${answer.content}</p>`)
        });

        app.timeago();

        $('.card[data-id]').off('click').on('click', function () {
            Comments.handleCardClick(this);
        });
    }

    Comments.handleCardClick = function (ele) {
        if (!ajaxify.data.isSelf) return;
        let id = $(ele).data('id');
        if (Comments.getById(id).answer) return;

        Comments.setSelected(id);
        Comments.selectedId = id;
    }
    Comments.getById = function (id) {
        return ajaxify.data.questions.data.find(question => question._id == id)
    }
    Comments.setSelected = function (id) {
        $('.card').removeClass('selected');
        $(`.card[data-id="${id}"]`).addClass('selected');

        let text = $(`.card[data-id="${id}"] .card-text`).html();
        $('.selected-question').html(text);

    }
    Comments.disable = function () {
        $('#commentArea,.send-comment button').attr('disabled', true);
    }

    Comments.enable = function () {
        $('#commentArea,.send-comment button').attr('disabled', false);
    }

    Comments.reset = function () {
        $('#commentArea').val('');
        Comments.selectedId = null;
        $('.selected-question').html('Select a question');
    }

    Comments.submitComment = async function (e) {
        e.preventDefault();
        let content = $('#commentArea').val();
        if (!content) return;

        if (ajaxify.data.isSelf && !Comments.selectedId) return alert('Please select a question first');

        let data = { content, profileId: Comments.profileId };

        Comments.disable();

        api.post(`/globals/reflective-comments/${Comments.selectedId ? Comments.selectedId : Comments.profileId}/${Comments.selectedId ? 'answer' : 'questions'}`, data)
            .then((res) => {
                Comments.reset();
            }).catch((err) => {
                Logger.log(err);
            }).finally(() => {
                Comments.enable();
            });

    }

    return Comments;

});

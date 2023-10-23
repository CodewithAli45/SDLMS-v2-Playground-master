"use strict";

define("forum/widgets/comments/reflections/list", ['api'], function (api) {

    const Reflections= {
        questionId: null,
        profileId: null,
    };
    const Logger = new ConsoleLogger('COMMENTS-REFLECTIONS');



    /**
     * Initialize the Reflections.
     */
    Reflections.init = async function () {
        Logger.log('init');
        this.events();
        this.questionId = ajaxify.data.questionId;

     

        socket.emit('sdlms.comments.reflections.enter', {
            questionId: this.questionId
        }, function (err, res) {
            Logger.log('sdlms.comments.reflections.enter', err, res);
        });

        $('.back').show();

        this.refreshCount();

        if(self != top){
            $('.widgets-header').remove();
            $('.widgets-body').css('height','100vh')
        }

    }


   Reflections.refreshCount = function () {
     $("[data-count='reflections']").text($('#list .card').length)
   }
   
    Reflections.events = function () {
        $('.send-comment').off('submit').on('submit', this.submitReflection);

        socket.off('event:reflection_created').on('event:reflection_created',  (reflection) => {
            Logger.log('event:reflection_created', reflection);
            
            if(reflection._key != `question:${this.questionId}:reflection`) return;
            if($(`.card[data-id="${reflection._id}"]`).length) return;

            reflection.reflectionsCount = 0;
            app.parseAndTranslate('widgets/comments/reflections/single', {
                answers: {
                    data: {
                        reflections: [reflection]
                    }
                }
            },(html) => {
                $('#list').prepend(html);
                app.timeago();
                Reflections.refreshCount();
                $(`[data-id="${reflection._id}"]`)[0].scrollIntoView();
            });
        });
        app.timeago();
    }

    Reflections.disable = function () {
        $('#commentArea,.send-comment button').attr('disabled', true);
    }

    Reflections.enable = function () {
        $('#commentArea,.send-comment button').attr('disabled', false);
    }

    Reflections.reset = function () {
        $('#commentArea').val('');
    }

    Reflections.submitReflection = async function (e) {
        e.preventDefault();
        let content = $('#commentArea').val();
        if (!content) return;

        let data = { content };

        Reflections.disable();

        api.post(`/globals/reflective-comments/${Reflections.questionId}/reflection`, data)
            .then((res) => {
                Reflections.reset();
            }).catch((err) => {
                Logger.log(err);
            }).finally(() => {
                Reflections.enable();
            });
    

    }
 
    return Reflections;

});

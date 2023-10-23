"use strict";

/* globals define */

define("forum/postergenerator/view_all", function () {
	var view_all = {};

	view_all.init = () => {};

    let { posters, errorImage } = ajaxify.data;

    if (posters && Array.isArray(posters) && posters.length) {
        $.each(posters, function (index, element) {
            
            let bodyText = element.designation;
            let { success, image } = element;

            if (!success) {
                bodyText = element.message;
                image = errorImage;
            }
            $('.posters-container').append(`
                <div id="anecdote-card" data-image="${image}" class="align-items-center d-flex justify-content-between mt-3 p-1 px-4 rounded shadow-sm anecdote-card" role="button">
                    <div class="d-flex">
                        <p class="mb-0 my-auto">
                            <i class="fa fa-${success ? 'arrow-circle-o-down' : 'times-circle-o'}" style="color: ${success ? 'limegreen' : 'red'}; font-size: 38px;" aria-hidden="true"></i>
                        </p>
                        <div class="mb-0 ml-lg-4 ml-sm-3 ml-3 bold-font py-2">
                            <span class="" style="color: #0029ff;">
                                ${element.name}
                            </span>
                            <p class="font-weight-400">
                                ${bodyText}
                            </p>
                        </div>
                    </div>
                    <img height="100px" width="160px" style="border-radius: 0%;" src="${image}" alt="">
                </div>
            `)
        })

        $('.sdlms-pagination').show();
    }

    $('body').on('click', '#anecdote-card', function () {
        location.href = $(this).data('image');
    })

    $("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
        $(".sdlms-sessions").removeClass("active");
        $(this).addClass("active");
        location.href = location.origin + `/${$(this).data("state")}`;
    });

    $("[createanecdote]").off("click").on("click",function(){
        ajaxify.go("/posters/uploadanecdotes")
    })
	return view_all;
    
});
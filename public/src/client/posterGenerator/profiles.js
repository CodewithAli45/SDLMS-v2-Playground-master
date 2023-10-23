"use strict";

/* globals define */

define("forum/postergenerator/profiles", ["api", "sdlms/pagination"], function (api) {
    var profiles = {};
    profiles.init = () => {
        let uid = ajaxify.data.uid;

        $("[createnewprofile]").off("click").on("click",function(){
            ajaxify.go(`/posters/createprofile`)
        })

        function paginateProfiles(url) {
            $(".project-cards").empty();
            let cardTemplate = Template.postercards();
            api.get(url, {}).then((res) => {
                res.data.map((ev, index) => {
                    $(".project-cards").append(cardTemplate.posterCard.profileCard(ev));
                    if (ev.isActive)
                        $(`#card-${ev.tid}`).find(`.active-state`).empty().append(`<span class="pr-1 light-text" style="font-size: var(--sdlms-font-size-14);">Active</span><i class="fa fa-check-circle" style="color: #2bc60c;" aria-hidden="true"></i>`)
                    if (ev.status == "Draft")
                        $(`#card-${ev.tid}`).find(`.hidden-detail`).empty().append(`<div>Congratulations!!! <br> You have already added  ${ev.tasks.length} tasks.</div>`);

                    else if (ev.status == "Published")
                        $(`#card-${ev.tid}`).find(`.hidden-detail`).empty().append(`<div>Number of Tasks : ${ev.tasks.length}</div><div>Published Date : ${moment(ev.publishedAt ? ev.publishedAt : ev.start_time).format("DD MMM, YYYY")}</div>`);
                });
                pagination.paginate(res)
            });
        };

        let pagination = new Pagination({
            target: '#dashboard-pagination',
            onChange: paginateProfiles
        });

        paginateProfiles(`/poster/userProfile?limit=8`);

        console.log(uid)

        $("[tabheader]").off("click").on("click", ".sdlms-sessions", function () {
            $(".sdlms-sessions").removeClass("active");
            $(this).addClass("active");
            location.href = location.origin + `/${$(this).data("state")}`;
        });

        $('#profiles-search-bar').off('keyup').on('keyup', function (e) {
            let name = $("input[type='text']").val();
            if (name.length > 3)
                paginateProfiles(`/poster/userProfile?limit=8&name=${name}`)
            else if (name.length < 1) {
                paginateProfiles(`/poster/userProfile?limit=8`)
            }
        })

        $("body").off("click").on("click","[project-cards]",function(){
            let id = $(this).data('id')
            ajaxify.go(`/posters/createprofile/${id}`)

        })

        console.log('hell')
    };


    return profiles;
});
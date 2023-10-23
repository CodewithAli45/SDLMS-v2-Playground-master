'use strict';

define('forum/profile', function () {
    var Profile = {};

    const Logger = new ConsoleLogger('PROFILE');

    Profile.init = function () {
        animateNumbers();
        initOwlCarousel();
        bindQuickViewLinks();
        bindWidgetsRefresh();
                
    };

    function animateNumbers() {
        $('[animate-numbers]').each(function () {
            var max = parseInt($(this).attr('animate-numbers'), 10);
            utils.animateNumbers($(this), 0, max, 0);
        });
    }

    function initOwlCarousel() {
        $(".owl-carousel").each(function () {
            $(this).owlCarousel({
                navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
                ...$(this).data(),
            });
        });
    }

    function bindQuickViewLinks() {
        $('.user-quick-view li[href]').off('click').on('click', function () {
            var href = $(this).attr('href');
            location.hash = href;
        });

        $('#showComments').off('click').on('click',function(){
            $('#comments')[0].scrollIntoView();
        });
    }

    function bindWidgetsRefresh() {
        $(window).on('widgets:open widgets:close', function () {
            setTimeout(function () {
                $(".owl-carousel").each(function () {
                    $(this).trigger('refresh.owl.carousel');
                });
            }, 300);
        });
    }

    return Profile;
});

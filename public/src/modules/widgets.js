'use strict';

define('widgets', ['api'], function (api) {


    const Widgets = {};
    const { context = 'page' } = ajaxify.data;
    const logger = new ConsoleLogger('Widgets');

    Widgets.loaded = {};

    Widgets.init = async function () {
        if (context === 'widget') {
            logger.log('Widget context detected, skipping widgets.js');
            return this;
        }


        await Widgets.load();
        Widgets.events();
        Widgets.renderLeftSidebar();

        return this;
    };

    Widgets.load = async function () {
        // load all widgets
        let widgets = await this.get();
        if (!widgets) return;

        logger.log(widgets)
        let html = widgets.map(Widgets.singleHTML).join('');
        $('#widgetList').append(html);

    };

    Widgets.singleHTML = (widget) => {
        return `<li class="list-group-item text-center" title="${widget.title}" widget-item="${widget.url}">${widget.icon}</li>`
    }

    Widgets.render = function (url, force = false) {
        if (!this.isOpened()) this.open();

        $('.right-sidebar-iframe').hide();
        if (Widgets.loaded[url] && !force) return Widgets.loaded[url].show();

        let $iframe = $('<iframe/>', {
            src: `/widgets/${url}`,
            class: 'right-sidebar-iframe',
            frameborder: 0,
            allowfullscreen: true,
            style: 'display:none'
        });

        Widgets.loaded[url] = $iframe;
        $('#rightSideBarContainer').append($iframe);
        $iframe.show();
    };

    Widgets.getActive = () => {
        return $('.right-sidebar-iframe:visible').attr('src');
    };

    Widgets.events = () => {
        const events = {
            open: () => $('body').addClass('right-sidebar-opened') && $(window).trigger('widgets:open', { isOpened: true }),
            close: () => $('body').removeClass('right-sidebar-opened') && $(window).trigger('widgets:close', { isOpened: false }),
            toggle: () => $('body').toggleClass('right-sidebar-opened') && $(window).trigger('widgets:toggle', { isOpened: this.isOpened() }),
            isOpened: () => $('body').hasClass('right-sidebar-opened')
        };

        Object.keys(events).forEach(event => {
            Widgets[event] = events[event];
        });

        $(document)
            .off('click', '[widget-item]')
            .on('click', '[widget-item]', function (e) {

                let url = $(this).attr('widget-item');
                if (!url) return;

                $('[widget-item]').removeClass('active');
                $(this).addClass('active');
                Widgets.render(url);
            });

        $('.close-right-sidebar').off('click').on('click', () => {
            Widgets.close();
            $('[widget-item]').removeClass('active');
        });

    };

    Widgets.refresh = () => {
        if (!Widgets.isOpened()) return;
        let url = Widgets.getActive();
        if (!url) return;
        Widgets.render(url, true);
    };


    Widgets.get = async () => {

        try {
            return ajaxify.data.menus.right
        } catch (error) {

        }
        return [];
    }

    Widgets.renderLeftSidebar = () => {
        if (!(ajaxify.data.menus || {}).left) {
            $('left-sidebar ul').empty();
            return
        }

        $('left-sidebar ul').html(ajaxify.data.menus.left.map(function (item) {
            return `<li class="list-group-item d-flex align-items-center">
                        <a href="${item.url}">
                            <span class="item-icon">${item.icon}</span>
                            <span class="item-name">${item.title}</span>
                        </a>
                    </li>`
        }).join(''));
    }

    return Widgets;
});

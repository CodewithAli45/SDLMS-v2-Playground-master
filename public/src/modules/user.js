'use strict';

define('user', ['api'], (api) => {
    const User = {
        cache: {},
        timeout: null
    };
    const Logger = new ConsoleLogger('User');

    User.init = () => {
        User.createInfoCard();
        User.bindEvents();

    };

    User.bindEvents = () => {
        $(document.body).on('mouseenter', '[data-user]', async (e) => {
            if (User.infoCard && User.infoCard.is(':visible')) return;
            const uid = $(e.currentTarget).data('user');
            if (!uid) return;
            if ($(e.currentTarget).attr('fetching')) return;
            $(e.currentTarget).attr('fetching', true);

            try {
                const user = User.cache[uid] || await api.get(`/users/${uid}`);
                if (!user) return;
                User.cache[uid] = user;
                User.updateInfoCard(user, e.currentTarget);
            } catch (err) {
                Logger.error(err);
            } finally {
                $(e.currentTarget).removeAttr('fetching');
            }
        });
    };

    User.hide = (target) => {
        // if mouse is over the info card or the target, don't hide
        if (User.infoCard.is(':hover') || $(target).is(':hover')) {
            User.timeout = setTimeout(() => {
                User.hide(target);
            }, 500);
            return;
        }
        User.infoCard.hide();
    };

    User.createInfoCard = function () {
        User.infoCard = $(`<div class="user-card p-3" style="display:none">
        <div class="user-card-header mb-3 d-flex">
            <div class="user-card-avatar">
                <img src=""  >
            </div>
            <div class="user-card-name ps-3 w-100">
                <a href="/user/"></a>
                <div class="user-card-username text-muted">@</div>
            </div>
        </div>
        <div class="user-card-body">
            <div class="user-card-bio mb-3"></div>
            <div class="user-card-info d-flex justify-content-around">
                <div class="user-card-info-item text-center">
                    <div class="user-card-info-item-label">Info</div>
                    <div class="user-card-info-item-value">19</div>
                </div>
                <div class="user-card-info-item text-center">
                    <div class="user-card-info-item-label">Info 2</div>
                    <div class="user-card-info-item-value">20</div>
                </div>
                <div class="user-card-info-item text-center">
                    <div class="user-card-info-item-label">Info 3</div>
                    <div class="user-card-info-item-value">49</div>
                </div>
            </div>
        </div>
        </div>`);
    };

    User.updateInfoCard = (user, target) => {
        if (!User.infoCard) return;

        const { picture, username, fullname, signature, info1, info2, info3 } = user;

        User.infoCard.appendTo(target);
        User.infoCard.find('img').attr('src', picture).attr('alt', username);
        User.infoCard.find('.user-card-name a').attr('href', `/user/${user.userslug}`).text(fullname);
        User.infoCard.find('.user-card-username').text(`@${username}`);
        User.infoCard.find('.user-card-bio').text(signature);
        User.infoCard.find('.user-card-info-item-value:eq(0)').text(info1);
        User.infoCard.find('.user-card-info-item-value:eq(1)').text(info2);
        User.infoCard.find('.user-card-info-item-value:eq(2)').text(info3);

        const { top, left } = $(target).offset();
        const height = $(target).height();
        const width = $(target).width();
        User.infoCard.css({ top: `${top + height}px`, left: `${left + width}px` }).show();
        User.timeout = setTimeout(() => {
            User.hide(target);
        }, 500);
    };

    User.get = async (query = {}) => {

        let users = [];
        try {

            users = await $.ajax({
                url: `/api/users`,
                data: query,
            });

            users = users.users;

        } catch (err) {
            Logger.error(err);
        }

        return users;

    }

    User.mention = (target, options = {}) => {

        $(target).each((index, el) => {
            if($(el).attr('id')) return;
            $(el).attr('id', `temp-mentiony-${Math.random().toString(36).substr(2, 9)}`);
        });

        $(target).mentiony({
            onDataRequest: async function (mode, query, callback) {
                let users = await User.get({ searchBy: 'username', query });
                users = users.map(user => {
                    return {
                        id: user.uid,
                        name: user.fullname || user.displayname,
                        slug: user.userslug,
                        avatar: user.picture,
                        info: "",
                        href: `/user/${user.userslug}`,
                    }
                });
                callback(users);
            },
            ...options
        })
    }
    return User;
});







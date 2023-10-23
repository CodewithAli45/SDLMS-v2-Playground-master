<div class="account" style="margin-top: 0%;">

    <!-- IMPORT partials/breadcrumbs.tpl -->

    <div class="profile row">
        <div class="col-xs-12">
            <div class="user-info" data-uid="{uid}">
                <div class="col-3">
                    <!-- IF picture -->
                    <img id="user-current-picture" class="user-avatar" src="{picture}" alt="{username}" />
                    <!-- ENDIF picture -->
                </div>
                <div class="col-3">
                    <h1 class="fullname font-poppins sdlms-text-black-20px">
                        <!-- IF fullname -->{fullname}
                        <!-- ELSE -->{username}
                        <!-- ENDIF fullname -->
                    </h1>
                    <h4 class="username font-poppins sdlms-text-tertiary-18px" style="color: #a2a2a2;">
                        <!-- IF !banned -->@{username}
                        <!-- ELSE -->[[user:banned]]
                        <!-- ENDIF !banned -->
                    </h4>
                </div>
                <!-- IF isAdminOrGlobalModeratorOrModerator -->
                <!-- IF banned -->
                <div class="text-center">
                    <!-- IF banned_until -->
                    [[user:info.banned-until, {banned_until_readable}]]
                    <!-- ELSE -->
                    [[user:info.banned-permanently]]
                    <!-- ENDIF banned_until -->
                </div>
                <!-- ENDIF banned -->
                <!-- ENDIF isAdminOrGlobalModeratorOrModerator -->


                <!-- IF loggedIn -->
                <!-- IF !isSelf -->
                <!-- IF !banned -->
                <!-- IF !config.disableChat -->
                <a component="account/chat" href="#" class="btn btn-primary btn-sm"><i
                        class="fa fa-fw fa-comment-o"></i> Chat</a>
                <!-- ENDIF !config.disableChat -->
                <a id="follow-btn" component="account/follow" href="#"
                    class="btn btn-success btn-sm <!-- IF isFollowing -->hide<!-- ENDIF isFollowing -->">[[user:follow]]</a>
                <a id="unfollow-btn" component="account/unfollow" href="#"
                    class="btn btn-warning btn-sm <!-- IF !isFollowing -->hide<!-- ENDIF !isFollowing -->">[[user:unfollow]]</a>
                <!-- ENDIF !banned -->
                <!-- ENDIF !isSelf -->
                <!-- ENDIF loggedIn -->
            </div>

            <!-- IF aboutme -->
            <span component="aboutme" class="text-center aboutme">{aboutmeParsed}</span>
            <!-- ENDIF aboutme -->
        </div>
        <div class="row px-3" style="margin-top: 2rem;">
            <div class="text-center">
                <!-- IF isAdmin -->
                <h4 style="font-weight: bolder;" class="font-poppins sdlms-text-black-20px pr-1">Member of : </h4>
                <!-- ELSE -->
                <h4 style="font-weight: bolder;" class="font-poppins sdlms-text-tertiary-20px pr-1">Student of : </h4>
                <!-- END -->
            </div>
            <!-- BEGIN groups -->
            <div class="text-center">
                <h5 class="font-poppins sdlms-text-tertiary-20px pl-1"><strong>
                    <a href="{config.relative_path}/groups/{groups.name}" style="text-decoration: none;"
                        class="text-muted col-xs-4 text-center font-poppins sdlms-text-tertiary-20px"> {groups.name} </a> </strong>
                </h5>
            </div>

            <!-- END groups -->
        </div>
    </div>
    <!-- IMPORT partials/account/menu.tpl -->

    <div class="row">
        <div class="col-xs-12 account-block hidden">
            <div class="account-picture-block text-center">
                <span>
                    <span class="account-username pl-3"> {username}</span>
                </span>

                <!-- IF !isSelf -->
                <!-- IF isFollowing -->
                <a component="account/unfollow" href="#" class="btn btn-warning btn-sm">[[user:unfollow]]</a>
                <!-- ELSE -->
                <a component="account/follow" href="#" class="btn btn-success btn-sm">[[user:follow]]</a>
                <!-- ENDIF isFollowing -->
                <!-- ENDIF !isSelf -->
            </div>
        </div>
    </div>
    <div id="user-action-alert" class="alert alert-success hide"></div>


    <div class="card-temp">
        <ul style="list-style-type: none;" class="col-xs-12">
            <h4 class="font-poppins sdlms-text-black-18px"> Articles </h4>
            <hr />
            <div style="display: flex; overflow:hidden;">

                <!-- BEGIN posts -->
                <!-- IF posts.isMainPost -->
                <!-- IF (posts.typeOfAsset == "topic") -->
                <li style="display: block; width:100%; " class="liclass">
                    <div class="card-body p-0">
                        <div class="card-title font-poppins sdlms-text-black-16px" style="font-weight: bolder;">
                            {posts.topic.title}
                        </div>
                        <div class="card-text font-poppins sdlms-text-black-16px" style="max-width:75%">
                            {posts.miniContent}
                        </div>
                        <div>
                            <a href="{config.relative_path}/topic/{posts.topic.slug}">read more...</a>
                        </div>
                        <div class="card-subtitle text-muted font-poppins">
                            {posts.category.name}
                        </div>
                    </div>
                </li>
                <!-- ENDIF (posts.typeOfAsset == "topic") -->
                <!-- ENDIF posts.isMainPost -->
                <!-- END posts -->
            </div>

        </ul>
    </div>
</div>
    <div class="card-temp">
        <ul style=" list-style-type: none;" class="col-xs-12">
            <h4 class="font-poppins sdlms-text-black-18px">Quizzes</h4>
            <hr />
            <div style="display: flex; overflow:hidden;">
                <!-- BEGIN posts -->
                <!-- IF posts.isMainPost -->
                <!-- IF (posts.typeOfAsset == "quiz") -->

                <li style="display: block; width:100%; padding-right: 5%;" class="liclass">
                    <div class="card-body p-0">
                        <div class="card-title font-poppins sdlms-text-black-16px" style="font-weight: bolder;">
                            {posts.topic.title}
                        </div>
                        <div style="margin-top: 5px;" class="font-poppins sdlms-text-tertiary-16px">{posts.questions}</div>
                        <div class="font-poppins sdlms-sub-text-primary-16px">
                            <a href="{config.relative_path}/topic/{posts.topic.slug}">read more...</a>
                        </div>
                        <div class="card-subtitle text-muted font-poppins sdlms-text-tertiary-16px">
                            Quiz
                        </div>
                    </div>
                </li>

                <!-- ENDIF (posts.typeOfAsset == "quiz") -->
                <!-- ENDIF posts.isMainPost -->
                <!-- END posts -->
            </div>
        </ul>
    </div>

    <div class="card-temp">
        <ul style="list-style-type: none;" class="col-xs-12">
            <h4 class="font-poppins sdlms-text-black-18px"> Reflections </h4>
            <hr />
            <div style="display: flex; overflow:hidden;">

                <!-- BEGIN posts -->
                <!-- IF posts.isMainPost -->
                <!-- IF (posts.topic.cid == "6") -->
                <li style="display: block; width:100%; " class="liclass">
                    <div class="card-body">
                        <div class="card-title font-poppins sdlms-text-tertiary-16px" style="font-weight: bolder;">
                            {posts.topic.title}
                        </div>
                        <div class="card-text font-poppins sdlms-text-tertiary-16px">
                            {posts.miniContent}
                        </div>
                        <div class="font-poppins sdlms-sub-text-primary-16px">
                            <a href="{config.relative_path}/topic/{posts.topic.slug}">read more...</a>
                        </div>
                        <div class="card-subtitle text-muted font-poppins sdlms-text-tertiary-16px">
                            {posts.category.name}
                        </div>
                    </div>
                </li>
                <!-- ENDIF (posts.topic.cid == "6") -->
                <!-- ENDIF posts.isMainPost -->
                <!-- END posts -->
            </div>

        </ul>
    </div>
<style>
    .liclass {
        display: none;
        min-width: calc(100% / 5)
    }

    .liclass:nth-child(-n+5) {
        display: block;
    }
    .card-title {
        font-size: 17px;
        margin-bottom: 8px;
    }
    h4 {
        font-weight: 600;
        font-size: 23px;
    }
    ul {
        margin-top: 30px;
    }
    hr {
        height: 1px;
        border: none!important;
        background-color:gray;
    }
</style>
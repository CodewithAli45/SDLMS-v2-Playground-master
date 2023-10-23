<div class="p-3 pe-4 d-flex align-items-center position-relative chat-header">
    <input type="text" class="form-control" id="searchChats" aria-describedby="searchChats">
    <i class="fas fa-search search-room"></i>

    <div class="dropdown">
        <i class="fas fa-ellipsis-v ms-3 dropdown-toggle more-chat-actions" data-bs-toggle="dropdown"
            aria-expanded="false"></i>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item add-new-room" href="#">New Room</a></li>
        </ul>
    </div>
</div>
<ul class="list-group chat-body" id="chat-list">

    <!-- BEGIN skeletons -->

    <li class="list-group-item align-items-center chat d-flex" data-room-id="2">
        <div class="chat-user-image skeleton">
            <img
                src="https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg">
        </div>
        <div class="chat-user-body ps-3">
            <div class="chat-user-name skeleton"> John Doe </div>
            <div class="chat-user-message text-ellipse skeleton"> Lorem ipsum dolor sit amet, consectetur
                adipisicing
                elit.
            </div>
        </div>
    </li>

    <!-- END skeletons -->

</ul>
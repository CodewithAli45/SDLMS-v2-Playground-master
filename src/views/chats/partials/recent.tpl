<!-- BEGIN rooms -->
<li class="list-group-item align-items-center position-relative chat d-flex <!-- IF rooms.hasUnread --> unread-message <!-- END rooms.hasUnread -->"
    data-room-id="{rooms.roomId}">
    <div class="chat-user-image">
        <img src="{rooms.thumbnail}"
            onerror="this.src='https://blog.deepthought.education/wp-content/uploads/2022/04/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg'">
    </div>
    <div class="chat-user-body ps-3">
        <div class="chat-user-name"> {rooms.roomName} </div>
        <div class="chat-user-message text-ellipse" title="{rooms.lastMessage}">{rooms.lastMessage}</div>
    </div>
    <div class="chat-user-attr d-flex align-items-center">
        <div class="chat-user-time-text" data-format="hh:mm A" data-time="{rooms.lastMessageTime}">
            {rooms.lastMessageTime} </div>
        <!-- IF rooms.hasUnread -->
        <div class="chat-user-unread-count"></div>
        <!-- END rooms.hasUnread -->
    </div>
</li>
<!-- END rooms -->
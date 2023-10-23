<!-- BEGIN messages -->
<!-- IF messages.system -->
<div class="single-message system">
    <div class="message-body">
        <div class="message-text" title="{messages.content}">{messages.content}</div>
    </div>
</div>
<!-- ELSE -->
<div class="single-message <!-- IF messages.self --> outgoing <!-- ELSE --> incoming <!-- END messages.self --> ">
    <div class="message-owner">{messages.fromUser}</div>
    <div class="message-body">
        <div class="message-text" title="{messages.content}">{messages.content}</div>
        <div class="message-time" data-format="hh:mm A" data-time="{messages.timestamp}"> {messages.timestamp} </div>
    </div>
</div>
<!-- END messages -->
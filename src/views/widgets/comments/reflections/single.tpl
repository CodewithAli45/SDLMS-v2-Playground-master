<!-- BEGIN answers.data.reflections -->
<div class="card mb-3" data-id="{answers.data.reflections._id}">
    <div class="card-body" style="">
        <div class="d-flex">
            <div class=" align-items-center d-flex mb-2 user-informantion">
                <img src="{answers.data.reflections.createdBy.picture}"
                    onerror="this.src='https://sdlms.deepthought.education/assets/uploads/files/profile_images/default_profile-image-from-rawpixel-id-476994-jpeg.jpg'"
                    class="rounded-circle user-image mr-2" alt="" style="height: 40px;">
                <p class="m-0 ps-2 username" style="font-weight: 600;">{answers.data.reflections.createdBy.fullname}</p>
            </div>
           
        </div>
        <p class="card-text"><b>A:</b> {answers.data.reflections.content}</p>
        <div class="col-12 d-flex justify-content-end " data-timeago="{answers.data.reflections.createdAt}"></div>
    </div>
</div>
<!-- END reflections.data.reflections -->
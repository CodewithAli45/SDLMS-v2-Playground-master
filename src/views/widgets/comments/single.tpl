 <!-- BEGIN questions.data -->
<div class="card mb-3" data-id="{questions.data._id}">
    <div class="card-body" style="">
        <div class="d-flex">
            <div class=" align-items-center d-flex mb-2 user-informantion">
                <img src="{questions.data.createdBy.picture}"
                    onerror="this.src='https://sdlms.deepthought.education/assets/uploads/files/profile_images/default_profile-image-from-rawpixel-id-476994-jpeg.jpg'"
                    class="rounded-circle user-image mr-2" alt="" style="height: 40px;">
                <p class="m-0 ps-2 username" style="font-weight: 600;">{questions.data.createdBy.fullname}</p>
            </div>
            
        </div>
        <p class="card-text text-ellipse-2"><b>Q:</b> {questions.data.content}</p>
        <div data-answer="{questions.data._id}">
        <!-- IF questions.data.answer.content -->
        <p class="card-text text-ellipse-4"><b>A:</b> {questions.data.answer.content}</p>
        <!-- ENDIF questions.data.answer.content -->
        </div>
        <div class="d-flex">
            <div class=" col-6 d-flex">
                <a href="/widgets/comments/{questions.data._id}/reflections">{questions.data.reflectionsCount} Reflections</a>
            </div>
            <div class="col-6 d-flex justify-content-end" data-timeago="{questions.data.createdAt}"></div>
        </div>
    </div>
</div>
 <!-- END questions.data -->
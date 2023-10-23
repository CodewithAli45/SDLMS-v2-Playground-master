<main class="comments h-100">
    <button onclick="history.back()"><i class="fas fa-chevron-left mr-2"></i> Back</button>
    <section class="p-3">

        <div class="card mb-3" data-id="{answers.data.question._id}">
            <div class="card-body" style="">
                <div class="d-flex">
                    <div class=" align-items-center d-flex mb-2 user-informantion">
                        <img src="{answers.data.question.createdBy.picture}"
                            onerror="this.src='https://sdlms.deepthought.education/assets/uploads/files/profile_images/default_profile-image-from-rawpixel-id-476994-jpeg.jpg'"
                            class="rounded-circle user-image mr-2" alt="" style="height: 40px;">
                        <p class="m-0 ps-2 username" style="font-weight: 600;">
                            {answers.data.question.createdBy.fullname}
                        </p>
                    </div>

                </div>
                <p class="card-text"><b>Q:</b> {answers.data.question.content}</p>
                <div data-answer="{answers.data.question._id}">
                    <!-- IF answers.data.question.answer.content -->
                    <p class="card-text"><b>A:</b> {answers.data.question.answer.content}</p>
                    <!-- ENDIF answers.data.question.answer.content -->
                </div>
                <div class="col-12 d-flex justify-content-end " data-timeago="{answers.data.question.createdAt}"></div>
            </div>
        </div>

        <h4> Reflections (<span data-count="reflections"></span>)</h4>
        <div id="list">
            <!-- IMPORT widgets/comments/reflections/single.tpl -->
        </div>

        <form class="send-comment bg-grey-light w-100 p-3 py-2">
            <div class="mb-3">
                <label for="commentArea" class="form-label">Reflect</label>
                <textarea required class="form-control" id="commentArea" rows="3"></textarea>
            </div>
            <button type="submit" class="button-tertiary px-2 py-1"><i class="fas fa-paper-plane"></i></button>
        </form>
    </section>
</main>
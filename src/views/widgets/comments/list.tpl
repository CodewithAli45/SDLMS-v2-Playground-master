<main class="comments h-100">

    <section class="p-3">

        <div id="list">
            <!-- IMPORT widgets/comments/single.tpl -->
        </div>

        <!-- IF !isSelf -->
        <form class="send-comment bg-grey-light w-100 p-3 py-2">
            <div class="mb-3">
                <label for="commentArea" class="form-label">Ask a question</label>
                <textarea required class="form-control" id="commentArea" rows="3"></textarea>
            </div>
            <button type="submit" class="button-tertiary px-2 py-1"><i class="fas fa-paper-plane"></i></button>
        </form>
        <!-- ENDIF !isSelf -->

        <!-- IF isSelf -->
        <form class="send-comment bg-grey-light w-100 p-3 py-2">
            <div class="text-ellipse-2 selected-question">Select a Question</div>
            <div class="mb-3">
                <label for="commentArea" class="form-label">Answer</label>
                <textarea required class="form-control" id="commentArea" rows="3"></textarea>
            </div>
            <button type="submit" class="button-tertiary px-2 py-1"><i class="fas fa-paper-plane"></i></button>
        </form>
        <!-- ENDIF isSelf -->
    </section>
</main>
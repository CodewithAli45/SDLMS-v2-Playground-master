<div class="p-3 pe-4 d-flex align-items-center position-relative chat-header">
    <h3>Create Room</h3>
</div>
<div class="chat-body px-3">
    <form class="create-discussion-room">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input required type="text" name="name" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea required class="form-control" name="description" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label">Thumbnail</label>
            <label class="thumbnail image-picker" for="fileThumbnail">
                <i class="fas fa-image"></i>
                <div class="image-preview"></div>
                <input required id="fileThumbnail" type="file" name="files[thumbnail]" class="form-control">
            </label>
        </div>

        <div class="d-flex justify-content-end">
            <button type="submit" class="py-1 px-3 button-primary">Create</button>
        </div>

    </form>
</div>
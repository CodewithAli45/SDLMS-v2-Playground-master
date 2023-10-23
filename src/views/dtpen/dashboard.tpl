<!-- IMPORT library/sweetalert2.tpl -->
<style>
    .project-card {
        background: #f5f5f5;
        border-radius: 10px;
    }

    .project-card-header {
        font-size: larger;
        font-weight: 400;
    }

    .create-project-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-button-background-color) !important;
        color: var(--primary-button-text-color) !important;
    }

    .create-project-text {
        font-size: x-large;
        font-weight: bold;
    }
</style>

<div class="align-content-center justify-content-center px-2 row project-cards">
    <!-- <div class="col-md-3 m-2 p-2 project-card">
        <div class="p-2">
            <div class="project-card-header">To-Do List Application</div>
            <div class="d-flex pr-4 justify-content-end">3 months ago</div>
        </div>
    </div> -->
</div>

<button class="button-tertiary create-project-button border-0" type="button" data-bs-toggle="modal"
    data-bs-target="#createProjectModal">
    <i class="fa-plus fas create-project-text" aria-hidden="true"></i>
</button>

<div class="modal fade" id="createProjectModal" tabindex="-1" aria-labelledby="createProjectModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="d-flex justify-content-end me-3 mt-3">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="new-project">
                <div class="mx-3 my-2">
                    <label for="projectValue" class="form-label">Enter name of your Project</label>
                    <input class="form-control" name="title" id="projectValue" value="Peter Drucker">
                </div>
                <div class="d-flex justify-content-center m-4">
                    <button type="submit" id="create-pro" class="btn button-secondary">Create</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- IMPORT library/DrawJS.tpl -->
<style>
    .card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
        overflow: hidden;
        background-color: #FFF;
        transition: transform 0.3s;
        cursor: pointer;
        position: relative;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .card-img-top {
        height: 200px;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }

    .card-body {
        padding: 20px;
    }

    .card-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }

    .card-text {
        font-size: 16px;
        color: #666;
        line-height: 1.4;
    }

    .card-buttons {
        position: relative;
    }

    .button-container {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
    }

    .edit-button,
    .generate-button {
        display: inline-block;
        margin-left: 5px;
    }

    /* .card-buttons {
        display: none;
        margin-top: 10px;
       
    }

    .card:hover .card-buttons {
        display: flex;
        flex-direction: row;
        transition: ease-in;
    } */
</style>
<section id="create">

    <div class="d-flex w-100 flex-wrap">


        <div class="d-flex justify-content-center">
            <div id="canvas-tools-area" class="position-relative">

            </div>
        </div>
        <div class="col-md-9 p-3 canvas-area overflow-auto">
            <div class="row" id="template-list">

            </div>

        </div>
        <div class="col-md-3 canvas-attribute ps-3" auto-height="#create">
            <form id="template-form">
                <div class="mb-3">
                    <label class="form-label" for="templateName">Template Name</label>
                    <input type="text" class="form-control" placeholder="Template Name" name="templateName"
                        id="templateName">
                </div>

                <!-- <div class="mb-3">
                    <label class="form-label" for="templateSize">Template Size</label>
                    <select class="form-select" id="templateSize">
                        <option selected>Choose...</option>
                        <option value="1200x1000" disabled>A4</option>
                        <option value="1200x1000" disabled>A5</option>
                        <option value="1200x1000" disabled>A6</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                 <div class="mb-3 d-flex" id="customSize">
                    <div class="w-50 pe-2">
                        <label class="form-label" for="templateWidth">Width (in PX)</label>
                        <input type="number" class="form-control" placeholder="Width" id="templateWidth">
                    </div>
                    <div class="w-50 ps-2">
                        <label class="form-label" for="templateHeight">Height (in PX)</label>
                        <input type="number" class="form-control" placeholder="Height" id="templateHeight">
                    </div>
                </div> -->

                <div class="mb-3">
                    <label class="form-label" for="templateDescription">Template Description</label>
                    <textarea class="form-control" placeholder="Template Description" name="templateDescription"
                        id="templateDescription" rows="5"></textarea>
                </div>

                <div class="w-100">
                    <button type="submit" id="create-template" class="button-primary d-block w-100">Create New
                        Template</button>
                </div>
            </form>
        </div>

    </div>
</section>
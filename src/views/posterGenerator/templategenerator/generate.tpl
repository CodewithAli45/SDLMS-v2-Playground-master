<!-- IMPORT library/DrawJS.tpl -->
<!-- IMPORT library/JsZip.tpl -->
<script src="https://cdn.jsdelivr.net/npm/progressbar.js@1.1.0/dist/progressbar.min.js"></script>

<style>
    .progress-bar {
        width: 100%;
        height: 10px;
        background: #f1f1f1;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .progress-fill {
        height: 100%;
        background: #3498db;
        border-radius: 5px;
        transition: width 0.5s;
    }

    .percentage {
        position: absolute;
        top: -20px;
        right: 0;
        color: #555;
    }
</style>
<section id="create">
    <button class="mb-2" id="back-button">Back</button>
    <div class="d-flex w-100 flex-wrap">


        <div class="d-flex justify-content-center">
            <div id="canvas-tools-area" class="position-relative">

            </div>
        </div>
        <div class="col-md-9 canvas-area  d-flex align-items-center overflow-auto justify-content-center"
            id="canvas-editor">

            <div id="canvas-editor-area" class="p-4  d-flex align-items-center justify-content-center">
            </div>
        </div>
        <div class="col-md-3 canvas-attribute ps-3" auto-height="#create">
            <form id="template-form">
                <!-- <div class="mb-3">
                    <label class="form-label" for="templateName">Template Name</label>
                    <input type="email" class="form-control" placeholder="Template Name" name="templateName"
                        id="templateName">
                </div> -->

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
                    <label class="form-label" for="csvFile">CSV File</label>
                    <input type="file" class="form-control" name="csvFile" id="csvFile">
                </div>
                <!-- <div class="mb-3">
                    <label class="form-label" for="templateDescription">Template Description</label>
                    <textarea class="form-control" placeholder="Template Description" name="templateDescription"
                        id="templateDescription" rows="5"></textarea>
                </div> -->

                <div class="w-100">
                    <button type="submit" id="generate-template" class="button-primary d-block w-100"
                        disabled>Generate</button>
                </div>
            </form>
            <div id="progress-label"></div>
            <div id="progress-bar-container"></div>

        </div>

    </div>
</section>
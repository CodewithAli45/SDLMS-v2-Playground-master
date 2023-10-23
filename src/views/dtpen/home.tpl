<!-- IMPORT library/sweetalert2.tpl -->
<style>
    #content {
        padding: 0 !important;
        width: 100% !important;
    }

    /* .tabs {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .tablink:hover {
        background-color: #f1f1f1;
    }

    .tablink.active {
        background-color: #ddd;
    }

    .tabcontent {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    textarea {
        width: 100%;
        height: calc(100% - 50px);
        resize: none;
        border: none;
        background-color: #f7f7f7;
        font-family: "Courier New", Courier, monospace;
    }

    iframe {
        width: 100%;
        height: calc(100% - 50px);
        border: none;
    } */

    .active {
        border-bottom: 3px solid var(--tertiary-background-color) !important;
        box-shadow: 2px 2px 10px rgba(0, .25, 0, .15);
        background: var(--secondary-background-color);
    }

    .tablink {
        background: var(--secondary-background-color);
        border-radius: 0px !important;
    }

    .code-editor {
        border: none;
        overflow: auto;
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        resize: none;
        /*remove the resize handle on the bottom right*/
    }

    .project-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-button-background-color) !important;
        color: var(--primary-button-text-color) !important;
        width: 56px;
        height: 56px;
        border-radius: 50%
    }

    .save-project-icon {
        font-size: x-large;
        font-weight: bold;
    }
</style>


<div class="d-flex flex-column h-100 overflow-hidden">
    <div class="d-flex justify-content-between mb-2 w-100">
        <button class="p-2 btn tablink w-100 active" data-type="html">HTML</button>
        <button class="tablink p-2 btn w-100" data-type="css">CSS</button>
        <button class="tablink p-2 btn w-100" data-type="js">JS</button>
        <button class="tablink p-2 btn w-100" data-type="output">Output</button>
    </div>

    <div id="html" class="h-100 w-100 tabcontent" style="display: block;">
        <!-- <textarea id="htmlCode" class="code-editor form-control h-100 language-html" rows="10"
            placeholder="Enter HTML code"></textarea> -->
        <iframe style="height:100%;width:100%" src="/widgets/dtpen/html/{project._id}"></iframe>
    </div>
    <div id="css" class="h-100 w-100 tabcontent d-none">
        <!-- <textarea id="cssCode" class="form-control h-100 language-css code-editor" rows="10"
            placeholder="Enter CSS code"></textarea> -->
        <iframe style="height:100%;width:100%" src="/widgets/dtpen/css/{project._id}"></iframe>
    </div>
    <div id="js" class="h-100 w-100 tabcontent d-none">
        <!-- <textarea id="jsCode" class="form-control h-100 language-javascript code-editor" rows="10"
            placeholder="Enter JS code"></textarea> -->
        <iframe style="height:100%;width:100%" src="/widgets/dtpen/js/{project._id}"></iframe>
    </div>

    <div id="output" class="h-100 tabcontent w-100 d-none">
        <iframe style="height:100%;width:100%" src="/widgets/dtpen/output/{project._id}"></iframe>
    </div>

    <button class="button-tertiary save-project-button project-button border-0" data-id="{project._id}" type="button">
        <i class="fa fa-floppy-o save-project-icon" aria-hidden="true"></i>
    </button>

    <a href="/dtpen/dashboard" data-ajaxify="true" class="border-0 button-tertiary project-button" id="dashboard-btn"
        type="button" style="bottom: 97px;">
        <i class="fa fa-list-ul p-3" aria-hidden="true" style="font-size: larger;"></i>
    </a>
</div>
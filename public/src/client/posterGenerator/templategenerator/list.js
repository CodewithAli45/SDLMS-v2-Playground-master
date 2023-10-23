'use strict';

define('forum/posterGenerator/templategenerator/list', ['api'], function (api) {
    var list = {};
    const Logger = new ConsoleLogger('CANVAS');
    list.init = () => {
        console.log('here in list')

        list.events()

    };
    list.events = () => {

        $("body").on("click", ".edit-button", function (e) {
            let id = $(this).data("id")
            location.href = `/generator/edit/${id}`
        })

        $("body").on("click", ".generate-button", function (e) {
            let id = $(this).data("id")
            location.href = `/generator/generate/${id}`
        })

        $("body").on("click", "save-template", function (e) {
            e.preventDefault();

            api.post("/poster/createTemplate", payload)
                .then(res => {
                    Logger.log(res)
                    notify("Template Created", 'success')
                })
                .catch(err => {
                    Logger.log(err)
                    notify(`Error:${err.message}`, "error")
                })
        })

        $("body").on("click", "#create-template", function (e) {
            e.preventDefault()
            var title = $("#templateName").val();
            var description = $("#templateDescription").val();
            location.href = `/generator/create/${title}/${description}`
        })

        api.get("/poster/getTemplate", {})
            .then(res => {
                res.map(item => {
                    $("#template-list").append(templates.card(item))
                })
                Logger.log(res)
            })
            .catch(err => Logger.log(err))

        $("body").on("click", ".delete-button", function (e) {
            let id = $(this).data("id");
            api.del("/poster/deleteTemplate/" + id)
                .then(res => {
                    console.log(res)
                    location.reload()
                })
                .catch(err => console.log(err))
        })
    }

    const templates = {
        card: function (data) {
            return `<div class="col-md-4 col-12">
            <div class="card cursor templateCards" data-id="${data._id}">
                <img src="https://via.placeholder.com/300" class="card-img-top" alt="${data.templateName}">
                <div class="card-body">
                    <h5 class="card-title">${data.templateName}</h5>
                    <p class="card-text">${data.description}</p>
                </div>
                <div class="button-container d-flex">
                    
                    <button class="button-primary generate-button " data-id="${data._id}">Generate</button>
                    <button class="button-secondary edit-button ms-1" data-id="${data._id}">Edit</button>
                    <button class="delete-button ms-1" data-id="${data._id}">Delete</button>
            </div>
            </div>
        </div>`;
        },


    };
    return list
});
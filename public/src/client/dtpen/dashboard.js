'use strict';

define('forum/dtpen/dashboard', ['api'], function (api) {
    var dashboard = {};
    const Logger = new ConsoleLogger('DTpen');
    dashboard.init = () => {

        dashboard.loadProjects();
        dashboard.events();

    };
    dashboard.events = () => {
        $('#new-project').off('submit').on('submit', function (e) {
            e.preventDefault();
            const form = $(this).serializeArray();
            let data = {};

            form.forEach(function (value) {
                data[value.name] = value.value;
            });
            Logger.log(data)
            dashboard.save(data);

        });

        $("body").on("click", ".project-card", function () {
            let id = $(this).data('id');
            location.href = "/dtpen/projects/" + id;
        })

    }
    dashboard.save = (payload) => {
        api.post('/dtpen/project', payload)
            .then((resp) => {
                if (resp) {
                    Swal.fire({
                        icon: 'Success',
                        title: 'Success',
                        text: 'Project Created',
                        showConfirmButton: false, // Hide the confirm button
                        timer: 3000, // Auto-close the notification after 3 seconds (3000 milliseconds)
                        toast: true, // Display the notification as a toast
                        position: 'top-end', // Position the toast at the top-right corner
                        // You can further customize the appearance and behavior as needed
                    });

                    location.href = '/dtpen/projects/' + resp._id;

                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred',
                    showConfirmButton: false, // Hide the confirm button
                    timer: 3000, // Auto-close the notification after 3 seconds (3000 milliseconds)
                    toast: true, // Display the notification as a toast
                    position: 'top-end', // Position the toast at the top-right corner
                    // You can further customize the appearance and behavior as needed
                });
                Logger.log("Project creation failed : ", error)
            });
    };

    dashboard.loadProjects = () => {
        api.get("/dtpen/project/", {})
            .then(res => {
                Logger.log(res)
                res.data.map(project => {
                    $('.project-cards').append(dashboard.templates.editor.code(project))
                })

            })
            .catch(err => Logger.log(err))
    }

    dashboard.templates =
    {
        editor: {
            code: (data) => {
                return `<div class="col-md-3 m-2 p-2 project-card" data-id="${data._id}">
                <div class="p-2">
                    <div class="project-card-header">${data.title}</div>
                    <div class="d-flex pr-4 pt-2 justify-content-end">${moment(data.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</div>
                </div>
            </div>`
            }
        }
    }
    return dashboard
});
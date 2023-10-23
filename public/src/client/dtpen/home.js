'use strict';

define('forum/dtpen/home', ['api'], function (api) {
    var home = {};
    const Logger = new ConsoleLogger('DTpen');

    home.defaultHtml = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>JS Bin</title>
    </head>
    <body>
    
    </body>
    </html>`;

    home.init = () => {
        Logger.log('home');
        $("body").find(".modal-backdrop").remove();

        home.loadContent(ajaxify.data.project._id);
        home.events();
    };

    home.openTab = (e, tabName) => {

        $(".tablink").removeClass("active");
        $(e.currentTarget).addClass('active');
        $(".tabcontent").addClass('d-none');
        $("#" + tabName).removeClass('d-none');
        // if (tabName === "output") {
        //     home.updateOutput();
        // }
    };


    home.updateOutput = () => {
        var htmlCode = $("#htmlCode").val();
        var cssCode = $("#cssCode").val();
        var jsCode = $("#jsCode").val();

        var outputFrame = $("#outputFrame")[0];
        var output = outputFrame.contentDocument || outputFrame.contentWindow.document;

        output.open();
        output.write(
            `<html>
             <head>
               <style>${cssCode}</style>
             </head>
             <body>
               ${htmlCode}
               <script>${jsCode}</script>
             </body>
           </html>`
        );
        output.close();
    };

    // home.save = debounce((id, type, payload) => {
    //     if (!['html', 'css', 'javascript'].includes(type)) {
    //         return console.error('Invalid type: ' + type);
    //     }
    //     api[id ? 'put' : 'post']('/dtpen/project/' + id ? (`${id}/${type}`) : '', payload)
    //         .then((resp) => { })
    //         .catch((error) => { });
    // }, 5000);

    home.events = () => {

        // $("#htmlCode").on("input", home.updateOutput);
        // $("#cssCode").on("input", home.updateOutput);
        // $("#jsCode").on("input", home.updateOutput);

        $("#html").show();
        $(".tablink").on("click", function (e) {
            let type = $(this).data('type');
            home.openTab(e, type);
        })

        $(".save-project-button").on('click', function (e) {
            let id = $(this).data("id");
            let { _id } = ajaxify.data.project;
            let html = JSON.parse(localStorage.getItem(['dtpen_', _id, '_html'].join('')));
            let css = JSON.parse(localStorage.getItem(['dtpen_', _id, '_css'].join('')));
            let js = JSON.parse(localStorage.getItem(['dtpen_', _id, '_js'].join('')));

            if (html) {
                Logger.log('in save button', html.content)
                let payload = {
                    "html": {
                        "content": html.content
                    }
                }
                api.put(`/dtpen/project/${id}/html`, payload)
                    .then(res => {
                        Swal.fire({
                            icon: 'Success',
                            text: 'Done',
                            showConfirmButton: false, // Hide the confirm button
                            timer: 3000, // Auto-close the notification after 3 seconds (3000 milliseconds)
                            toast: true, // Display the notification as a toast
                            position: 'top-end', // Position the toast at the top-right corner
                            // You can further customize the appearance and behavior as needed
                          });
                    })
                    .catch(err => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Something went wrong',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        Logger.log(err)
                    })
            }
            if (css) {
                let payload = {
                    "css": {
                        "content": css.content
                    }
                }
                api.put(`/dtpen/project/${id}/css`, payload)
                    .then(res => {
                        Swal.fire({
                            icon: 'Success',
                            text: 'Done',
                            showConfirmButton: false, // Hide the confirm button
                            timer: 3000, // Auto-close the notification after 3 seconds (3000 milliseconds)
                            toast: true, // Display the notification as a toast
                            position: 'top-end', // Position the toast at the top-right corner
                            // You can further customize the appearance and behavior as needed
                          });
                    })
                    .catch(err => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Something went wrong',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        Logger.log(err)
                    })
            }
            if (js) {
                let payload = {
                    "javascript": {
                        "content": js.content
                    }
                }
                api.put(`/dtpen/project/${id}/javascript`, payload)
                    .then(res => {
                        Swal.fire({
                            icon: 'Success',
                            text: 'Done',
                            showConfirmButton: false, // Hide the confirm button
                            timer: 3000, // Auto-close the notification after 3 seconds (3000 milliseconds)
                            toast: true, // Display the notification as a toast
                            position: 'top-end', // Position the toast at the top-right corner
                            // You can further customize the appearance and behavior as needed
                          });
                    })
                    .catch(err => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Something went wrong',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        Logger.log(err)
                    })
            }

        })
    }

    home.loadContent = (id) => {
        const types = {
            html: 'html',
            css: 'css',
            js: 'javascript'
        }
        api.get(`/dtpen/project/${id}`, {})
            .then(res => {
                const { data } = res;
                Logger.log("data", data)
                if (data) {
                    Object.keys(types).forEach(type => {
                        let obj = data[types[type]];
                        Logger.log("obj", obj)
                        let STORAGE_KEY = ['dtpen_', id, '_', type].join('');
                        let storage = localStorage.getItem(STORAGE_KEY);

                        if (storage) {
                            if (obj.updatedAt > storage.updatedAt) {
                                // onj is latest
                                localStorage.setItem(STORAGE_KEY, JSON.stringify({ updatedAt: obj.updatedAt, content: obj.content }));
                            }
                            else if (obj.updatedAt < storage.updatedAt) {
                                //storage is latest

                            }
                            else {
                                //both are same
                            }
                        }
                        else {
                            Logger.log("obj", obj)
                            localStorage.setItem(STORAGE_KEY, JSON.stringify({ updatedAt: obj.updatedAt, content: obj.content }));
                        }




                        // localStorage.setItem(STORAGE_KEY, String(obj.content || '_'));
                    });
                }
            })
            .catch(err => {
                Logger.log(err)
            })
    }



    // home.templates =
    // {
    //     editor: {
    //         code: (type) => {
    //             return `<div id="html" class="flex-grow-1 tabcontent" style="display: block;">
    //             <textarea id="${type}" class="form-control h-100" rows="10" placeholder="Enter ${type} code"></textarea>
    //         </div>`
    //         }
    //     }
    // }
    return home
});
"use strict";
/* globals define */

define("forum/postergenerator/upload_image", ['translator'], function (translator) {
    var upload_image = {};

    upload_image.init = () => {
        const id = ajaxify.data.id;
        $("#pfp-input").on("change", function () {
            $("#pfp-input-label").text("Change picture");

            const imgUrl = URL.createObjectURL(this.files[0])
            $("#pfp-preview").attr("src", imgUrl);
        })

        $("#delete-profile").on("click",function(){
            doAjax({
                type: 'DELETE',
                url: `/poster/deleteprofile/${id}`,
                data: false,
                cache: false,
                contentType: false,
                processData: false,
            }).then(function (response) {
               notify("Deleted Successfully","success");
               ajaxify.go("/poster/profiles")
            }).catch((err) => {
               notify("Something went wrong","error")
            })
        })
        $("[back-btn]").on("click",function(){
            ajaxify.go("poster/profiles")
        })

        $('form').on('submit', function (e) {
            e.preventDefault();
            
            console.log(id)
            if(id){
            $('body').find('#create-profile').attr('disabled', true);
            let formData = new FormData(this);
                doAjax({
                    type: 'PUT',
                    url: `/poster/editprofile/${id}`,
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                }).then(function (response) {
                    notify('Profile updated successfully!', 'success');
                    ajaxify.go('/poster/profiles')
                }).catch((err) => {
                    let { responseJSON } = err;
                    if (responseJSON && responseJSON.status.message) {
                        translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    }
                    else return notify('Oops! Some error occured while updating the profile', 'error');
                }).finally(() => {
                    $('form').trigger('reset');
                    $('body').find('#create-profile').attr('disabled', false);
                    $("#pfp-input-label").text("Upload picture");
                    $("#pfp-preview").attr("src", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
                })
            }
            else{
                    if (!upload_image.checkRequiredFields(true, ['image'])) return;

              $('body').find('#create-profile').attr('disabled', true);
            
            let formData = new FormData(this);
                doAjax({
                    type: 'POST',
                    url: "/poster/image",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                }).then(function (response) {
                    notify('Profile was created successfully!', 'success');
                    ajaxify.go('/poster/profiles')
                }).catch((err) => {
                    let { responseJSON } = err;
                    if (responseJSON && responseJSON.status.message) {
                        translator.translate(responseJSON.status.message).then((msg) => notify(msg, 'error'));
                    }
                    else return notify('Oops! Some error occured while updating the profile', 'error');
                }).finally(() => {
                    $('form').trigger('reset');
                    $('body').find('#create-profile').attr('disabled', false);
                    $("#pfp-input-label").text("Upload picture");
                    $("#pfp-preview").attr("src", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
                })
            }
        });

        (function () {
            'use strict'
          
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
          
            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
              .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                  }
          
                  form.classList.add('was-validated')
                }, false)
              })
          })();
    };

    upload_image.checkRequiredFields = function (notifyUser = false, fields = []) {
        let emptyFields = [];
        $.each($('.form-group').find('[required]'), function (index, elem) {
            if (!$(elem).val()) {
                emptyFields.push($(elem).data('name'));
            }
        });
        if (notifyUser) {
            fields.forEach((field) => {
                if (emptyFields.includes(field)) {
                    notify(`${field} is required.`, 'error');
                }
            })
        }

        return emptyFields.length === 0;
    }

    return upload_image;

});
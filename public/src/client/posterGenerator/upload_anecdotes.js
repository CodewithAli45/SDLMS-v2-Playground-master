"use strict";

/* globals define */

define("forum/postergenerator/upload_anecdotes", ['translator', 'api', 'sdlms/jquery_csv',"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js"], function (translator, api) {
	var upload_anecdotes = {};

	let csvContents = [];

	upload_anecdotes.init = () => {

		$(".candidate-block-60").on("click", function () {
			$(".active-block-100").removeClass("active-block-100");
		});

		$("[back-btn]").off("click").on("click",function(){
			ajaxify.go("/poster/profiles")
		})

		$("#option-form").on("click", function () {
			$("#create-anecdote").prop("disabled", false);
			$("#create-anecdote").prop("value", "Submit Anecdote");

			$("#option-csv").addClass("inactive-block-40").removeClass("active-block-100").removeClass("candidate-block-60");

			$(this).removeClass("candidate-block-60").addClass("active-block-100");
		});

		$("#download-btn").on("click", function (e) {
			e.preventDefault();
			location.href = "https://doc.deepthought.education/csv/poster_generator_template.csv";
		});

		$("#option-csv").on("click", function () {
			$("#create-anecdote").prop("disabled", false);
			$("#create-anecdote").prop("value", "Upload CSV");

			$("#option-form").addClass("inactive-block-40").removeClass("active-block-100").removeClass("candidate-block-60");

			$(this).removeClass("candidate-block-60").addClass("active-block-100");
		});

		$("#csv-upload").on("change", function () {
			const fileName = $(this).val().replace(/.*[\/\\]/, '');

			$("#csv-upload-label").text(fileName)
		})

		$("body").on("change", '[type="file"]', function () {
			var file = this.files[0];
			var reader = new FileReader();
			reader.onload = function () {
				csvContents = $.csv.toObjects(this.result);
			};
			// reader.readAsDataURL(file);
			reader.readAsBinaryString(file);
		});


		$('[name="participant_name"]').on('keyup', function () {
			let text = $(this).val();
			if (text.length < 2) return;
			
			api.get('/poster/userProfile', {name: text, limit: 10})
				.then((resp) => {
					let {data=[]} = resp;
					
					if (data && data.length) {
						let options = data.map(el => `<option value="${el.name}">${el.name}</option>`);
						$('#users-area').empty().append(upload_anecdotes.template(options.join('\n'))).show();
					} else {
						$('#users-area').hide();
					}
				})
				.catch((err) => {
					$('#users-area').hide()
					notify(err.message, 'error');
				});
		});

		$('form').on('submit', function (e) {
			e.preventDefault();
			$('body').find('#create-anecdote').attr('disabled', true);

			let name = $('[name="name"]').val();
			let anecdote = $('[name="anecdote"]').val();
			let event_name = $('[name="event_name"]').val();
			let template = $('[name="template"]:selected').val();

			if(!!name && !!anecdote && !!event_name && !!template && !!csvContents){
				$('body').find('#create-anecdote').attr('disabled', true);
				api.post("/poster/anecdotes", { name, anecdote, event_name, template, csvContents }).then(function () {
				ajaxify.go("/posters/profiles");
				notify('Anecdote(s) uploaded successfully', 'success');
			}).catch((err) => {
				let { message } = err;
				if (message) {
					translator.translate(message).then((msg) => notify(msg, 'error'));
				}
			}).finally(() => {
				$('form').trigger('reset');
				csvContents = [];
				$('body').find('#create-anecdote').attr('disabled', false);
			})
			}else {
				return alert("Please Fill The Fields");
		}

			// doAjax({
			//     type: 'POST',
			//     url: "/poster/anecdotes",
			//     data: formData,
			//     cache: false,
			//     contentType: false,
			//     processData: false,
			// }).then(function (response) {
			//     notify('Anecdote(s) uploaded successfully', 'success');
			// }).catch((err) => {
			//     let { responseJSON } = err;
			//     if (responseJSON && responseJSON.status.message) {
			//         translator.translate(responseJSON.status.message).then((msg) => {notify(msg, 'error'); console.log(msg);});
			//     }
			//     else return notify('Oops! Some error occured while uploading the anecdote(s)', 'error');
			// }).finally(() => {
			//     location.reload();
			// })
			// $('[participant-select]').select2({
            //     containerCssClass: "custom-container shads-light",
            //     dropdownCssClass: "custom-dropdown shads-light",
            //     placeholder: "Search",
            //         ajax: {
            //             url: '/poster/userProfile?limit=10',
            //             dataType: 'json',
            //             data: function (params) {
            //                 var query = {
            //                     name: params.term,   //params term is basically the characters you type 
            //                     type:"user:profileimage"
            //                 }
            //                 return query;
            //             }, 
            //             processResults: function (data) {
            //                 return {
            //                     results: data.response.data.map((item,index)=>{
            //                         return {
            //                             id:item._id,
            //                             text:item.name
            //                         }
            //                     })
            //                 };
            //             }
            //         }
            // });
		});
	};

	upload_anecdotes.template = function (options) {
		// return `
		// 	<select required class="cursor-pointer label-radius align-item-center form-control pl-3 select2-hidden-accessible" name="name" tabindex="-1" aria-hidden="true">
		// 		${options}
		// 	</select>
		// `;
		return `<datalist id="participants" >
					${options}
	  			</datalist>`
	}

	return upload_anecdotes;

});
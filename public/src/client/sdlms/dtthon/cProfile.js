"use strict";

/* globals define */

define("forum/sdlms/dtthon/cProfile", ["api"], function (api) {
	var cProfile = {};
	cProfile.init = function () {
		//CREATOR PROFILE PAGE
		console.log("Hello");

		var learning_outcomes = [];
		var pre_requisites = [];
		var type;
		var tasks = [];
		var cid;

		var listItem1 = `<div class="col-12 pl-0 pr-0 taskAdded">
      <div class=" add-more-values px-2 pr-4 py-1 mt-1 sdlms-text-tertiary-14px">`;
		var listItem2 = `</div>
      <svg class="sdlms-floating-right delete" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#0029FF" />
      </svg>
    </div>`;

		//to add values in the learning outcomes
		$("#learnTask")
			.next()
			.on("click", function () {
				if ($("#learnTask").val() == "") {
					alert("You Can't add a Empty Task");
				} else {
					learning_outcomes.push($("#learnTask").val());
					$("#learnAddedTasks").append(
						listItem1 + $("#learnTask").val() + listItem2
					);
					$("#learnTask").val("");
					var newTaskAdded = $("#learnAddedTasks").find(".taskAdded").last();
					newTaskAdded.find(".delete").on("click", function () {
						$(this).parent().remove();
					});
				}
			});

		//to add values in pre requisites
		$("#preReqTask")
			.next()
			.on("click", function () {
				if ($("#preReqTask").val() == "") {
					alert("You Can't add a Empty Task");
				} else {
					pre_requisites.push($("#preReqTask").val());
					$("#preReqAddedTasks").append(
						listItem1 + $("#preReqTask").val() + listItem2
					);
					$("#preReqTask").val("");
					var newTaskAdded1 = $("#preReqAddedTasks").find(".taskAdded").last();
					newTaskAdded1.find(".delete").on("click", function () {
						$(this).parent().remove();
					});
				}
			});

		// to count character in description box
		$(".discript-textarea").on("keyup", function () {
			var characterCount = $(this).val().length,
				current = $("#current"),
				maximum = $("#maximum"),
				theCount = $("#the-count");

			current.text(characterCount);
		});

		//to show custom commitment box
		$("body").on("click", ".custom-dropdown", function () {
			$("#id_commitment").hide();
			$(".custom-commit").show();
		});

		//to show dropdown box
		$("body").on("click", ".custom-arrow", function () {
			$("#id_commitment").show();
			$(".custom-commit").hide();
		});

		//to minus the values of stages
		$(".minus").on("click", function () {
			var $input = $(this).parent().find("input");
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.on("change");
			return false;
		});

		// to add the value of stages
		$(".plus").on("click", function () {
			var $input = $(this).parent().find("input");
			$input.val(parseInt($input.val()) + 1);
			$input.on("change");
			return false;
		});

		//to set category
		$("body").on("click", ".p", function () {
			type = "project";
			cid = 1;
		});
		$("body").on("click", ".c", function () {
			type = "course";
			cid = 2;
		});
		$("body").on("click", ".s", function () {
			type = "selection";
			cid = 3;
		});

		$("body").on("click", "#create-profile", function (event) {
			event.preventDefault();

			//not to add empty values
			if (($("#pTitle").val() == "") && ($("#pDescription").val() == "")) {
				alert("Make sure you have a title and description");
		
			} else {
            
			//to add values in tasks	
			for (var i = 0; i < $("#stages").val(); i++) {
				tasks.push(" ");
			}

			let data = {
				cid: cid,
				title: $("#pTitle").val(),
				uploaded_images: JSON.stringify({
					name: "",
					url: $("#imageURL").val(),
					description: "",
				}),
				description: $("#pDescription").val(),
				pre_requisites: JSON.stringify(pre_requisites),
				learning_outcomes: JSON.stringify(learning_outcomes),
				status: "publish",
				type: type,
				tasks: JSON.stringify(tasks)
			};

			api.post(`/apps/project`, data).then(function (res) {
				console.log(res);
				location.href = `/cStoryboard/${res.tid}`; //redirect to the story board
			});

		}

		});
	};
	return cProfile;
});

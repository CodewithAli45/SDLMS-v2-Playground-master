"use strict";

/* globals define */

define("forum/mobile/discussion/create", function () {
	var create = {};

	create.init = function () {
		// show rr modal
		$("body").on("change", "#dr-participant-criteria", function () {
			if ($(this).val() == "rr") {
				$("#rr-modal").modal("show");
				$("#rr-modal").addClass("show");
			}
		});

		// rr modal
		let incrementBtn = $(".inc-btn");
		let decrementBtn = $(".dec-btn");
		let rrVal = $("#rr-select");
		let newVal = 5;

		incrementBtn.on("click", () => {
			if (rrVal.val() < 10) newVal = parseFloat(rrVal.val()) + 1;
			else newVal = 10;

			rrVal.val(newVal);
		});

		decrementBtn.on("click", () => {
			if (rrVal.val() > 0) newVal = parseFloat(rrVal.val()) - 1;
			else newVal = 0;

			rrVal.val(newVal);
		});

		// show categories modal
		$("#dr-category").on("click", function (event) {
			event.preventDefault();
			$("#categories-modal").modal("show");
			$("#categories-modal").addClass("show");
		});

		// categories modal working
		$("body").on("click", "[sub-category]", function (e) {
			$(this).toggleClass("selected");
			console.log(e);
			console.log(
				$(this).parent("li").prev("li").find("[sub-category] p").text()
			);
			let parent = $(this).parents(".collapse").first();
			let parentCategory = parent.prev("[category]");
			console.log(parentCategory);
			if (parent.find("[sub-category].selected").length) {
				parentCategory.addClass("selected");
			} else {
				parentCategory.removeClass("selected");
			}
		});

		$("#submit-categories").on("click", () => {
			let selectedCategories = $(".selected > p");
			console.log(selectedCategories.text());
			$("#categories-modal").modal("hide");
			$("#categories-modal").removeClass("show");
			$("#serch-articles-modal").modal("show");
			$("#serch-articles-modal").addClass("show");
		});

		const filterIcon = document.querySelectorAll(".filter-icon");
		const filters = document.querySelectorAll(".filters");
		const closeFilterBtn = document.querySelectorAll(".close-filter-btn");
		const toggleFilter = function () {
			for (let i = 0; i < filters.length; i++)
				filters[i].classList.toggle("d-flex");
		};
		for (let i = 0; i < filterIcon.length; i++)
			filterIcon[i].addEventListener("click", toggleFilter);
		for (let i = 0; i < closeFilterBtn.length; i++)
			closeFilterBtn[i].addEventListener("click", toggleFilter);
	};

	return create;
});

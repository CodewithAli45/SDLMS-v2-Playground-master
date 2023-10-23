"use strict";

/* globals define */

define("forum/mobile/message/chat", function () {
	var chat = {};

	chat.init = function () {
		const dropDown = document.querySelector("#dropdown");
		const dropDownAction = document.querySelectorAll(
			".dropdown-content__action"
		);
		const dropDownHold = document.querySelectorAll(".dropdown-content__hold");
		const settingsIcon = document.querySelector(".settings-icon");

		let attachmentBtn = document.querySelector("#attachments-btn");
		let attachmentMenu = document.querySelector(".attachments-menu");

		let newId = 1;
		
			const _templates = {
			incoming: function(data) {
				return `<div class="chat-row incoming">
					<div class="chat mb-1" id="${data.id}">
						<p class="mb-0">${data.text}</p>
					</div>
				</div>`
			},
			outgoing: function(data) {
				return `<div class="chat-row outgoing">
					<div class="chat mb-1" id="${data.id}">
						<p class="mb-0">${data.text}</p>
					</div>
				</div>`
			},
			outgoingImg: function(data) {
				return `<div class="chat-row outgoing">
					<div class="chat mb-1" id="${data.id}">
						<img src="${data.img}" alt="" class="circle-lg img-cover">
					</div>
				</div>`
			},
			dateEntry: function(data) {
				return `<div class="d-flex justify-content-center mt-2 font-10">
					<p class="mb-0">${data}</p>
				</div>`
			},
		}

		const showDropDown = function () {
			dropDown.classList.add("d-flex");
		};
		const hideDropDown = function () {
			dropDown.classList.remove("d-flex");
		};

		if (settingsIcon) {
			const toggleSettings = function (event) {
				if (settingsIcon.contains(event.target)) {
					showDropDown();
				} else {
					hideDropDown();
				}
			};
			window.addEventListener("click", toggleSettings);
		}

		$("body").on("click", function (event) {
			if (
				attachmentMenu.contains(event.target) ||
				attachmentBtn.contains(event.target)
			)
				attachmentMenu.classList.remove("d-none");
			else attachmentMenu.classList.add("d-none");
		});

		$(".back-icon").on(
			"click",
			() => (window.location.pathname = "/mobile/message/list")
		);

		function scrollBottom() {
			window.scrollTo(0, 99999);
		}
		if (document.addEventListener)
			document.addEventListener("DOMContentLoaded", scrollBottom, false);
		else if (window.attachEvent) window.attachEvent("onload", scrollBottom);

		$("body").on("submit", "#message-input", function(e) {
			e.preventDefault();

			let formData = new FormData(this);

			if($("#img-attach").val()) {
				const reader = new FileReader();

				reader.onload = function(event) {
					let outgoingData = {
						id: newId,
						img: event.target.result
					}
					newId++;

					$("#chats").append(_templates.outgoingImg(outgoingData));
				};
				reader.readAsDataURL($("#img-attach")[0].files[0]);

				$("#img-attach").val('')
			}
			else if($("#cam-attach").val()) {
				const reader = new FileReader();

				reader.onload = function(event) {
					let outgoingData = {
						id: newId,
						img: event.target.result
					}
					newId++;

					$("#chats").append(_templates.outgoingImg(outgoingData));
				};
				reader.readAsDataURL($("#cam-attach")[0].files[0]);

				$("#cam-attach").val('')
			}

			let outgoingData = {
				id: newId,
				text: $("#chat-input").val()
			}

			if (outgoingData.text.trim()) {
				$("#chats").append(_templates.outgoing(outgoingData));

				socket.emit('modules.chats.send', {
				roomId: roomId,
				message: msg,
			}, function (err) {
				if (err) {
					inputEl.val(msg);
					messages.updateRemainingLength(inputEl.parent());
					if (err.message === '[[error:email-not-confirmed-chat]]') {
						return app.showEmailConfirmWarning(err);
					}

					return app.alert({
						alert_id: 'chat_spam_error',
						title: '[[global:alert.error]]',
						message: err.message,
						type: 'danger',
						timeout: 10000,
					});
				}
			});
			}

			$("#chat-input").val("");

			newId++;

			$("body").on("click", ".chat > img", function() {
				$("#modalImg").attr("src", $(this).attr("src"));
				$("#imageModal").modal("show");
			})
		})
	};

	return chat;
});
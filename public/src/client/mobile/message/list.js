"use strict";

/* globals define */

define("forum/mobile/message/list", ["api"], function (api) {
	var list = {};

	list.init = function () {
		/* selectors start here */

		const filterIcon = document.querySelector("#filter-icon");
		const filters = document.querySelector("#filters");

		const settingsIcon = document.querySelector(".settings-icon");
		const deleteIcon = document.querySelector("#delete-icon");
		const archiveIcon = document.querySelector("#archive-icon");
		const writeIcon = document.querySelector("#write-icon");
		const dropDown = document.querySelector("#dropdown");
		const dropDownAction = document.querySelectorAll(
			".dropdown-content__action"
		);
		const dropDownHold = document.querySelectorAll(".dropdown-content__hold");
		const message = document.querySelectorAll(".message");
		const messages = document.querySelector(".messages");
		const header2 = document.querySelector("#header-2");
		const header1 = document.querySelector("#header-1");
		const markAsUnread = document.querySelector("#unread");
		const markAsRead = document.querySelector("#read");

		const _templates = {
			userListing: function (data) {
				return `<div class="d-flex align-items-center mb-1" uid=${data.uid}>
              <img src="${data}" alt="" class="img-cover circle-md mr-2">
              <p class="font-14 mb-0">${data}</p>
          </div>`;
			},
		};

		window.unread = false;
		/* selectors ends here */
		/* hold function starts here */
		function isMobile() {
			var check = false;
			(function (a) {
				if (
					/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
						a
					) ||
					/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
						a.substr(0, 4)
					)
				) {
					check = true;
				}
			})(navigator.userAgent || navigator.vendor || window.opera);

			return check;
		}

		let container = document.querySelector(".messages");
		if (messages) {
			let chats = container.querySelectorAll(".message");
			let holdStart = isMobile() ? "touchstart" : "mousedown";
			let holdStop = isMobile() ? "touchend" : "mouseup";
			let selected = 0;
			let clearing = 0;

			/* if click */
			function mouseUP() {
				clearInterval(this.getAttribute("interval"));
				if (!container.querySelectorAll(".message.hold").length && !clearing) {
					location.href = "./chat";
				}
				clearing =
					container.querySelectorAll(
						".message.hold"
					).length; /* checks the length of array containing message holded  */
			}
			/* to clear hold state from every element */
			function clearMarks() {
				for (let index = 0; index < chats.length; index++) {
					chats[index].classList.remove("hold");
					chats[index].removeEventListener(holdStart, mouseDown);
					chats[index].removeEventListener(holdStop, mouseUP);
					chats[index].addEventListener(holdStart, mouseDown);
					chats[index].addEventListener(holdStop, mouseUP);
				}
				selected = 0;
				clearing = container.querySelectorAll(".message.hold").length;
			}
			/* removes hold class */
			function mouseDown() {
				let that = this;
				if (that.classList.value.includes("hold")) {
					that.classList.remove("hold");
					that.querySelector(".tickmark").classList.add("d-none");
					// that.querySelector('.read').classList.add('d-none')

					that.addEventListener(holdStart, mouseDown);
					that.addEventListener(holdStop, mouseUP);
					selected = container.querySelectorAll(".message.hold").length;
					if (!selected) {
						writeIcon.classList.remove("d-none");
						deleteIcon.classList.add("d-none");
						archiveIcon.classList.add("d-none");
						dropDownAction.forEach((element) =>
							element.classList.remove("d-none")
						);
						dropDownHold.forEach((element) => element.classList.add("d-none"));
					}
					// if(!selected){
					//   header1.classList.remove('d-none')
					//   header2.classList.add('d-none')
					// }
					return;
				}
				/* adds hold class */
				let i = setInterval(
					() => {
						that.classList.add("hold");
						dropDown.classList[window.unread ? "add" : "remove"]("markread");
						that.querySelector(".tickmark").classList.remove("d-none");
						dropDownAction.forEach((element) =>
							element.classList.add("d-none")
						);
						dropDownHold.forEach((element) =>
							element.classList.remove("d-none")
						);
						writeIcon.classList.add("d-none");
						deleteIcon.classList.remove("d-none");
						archiveIcon.classList.remove("d-none");

						selected = 1;
						clearInterval(i); /* if selected clear interval */
						clearing++;
						that.removeEventListener(holdStop, mouseUP);
					},
					selected ? 0 : 500
				);

				// if(selected){
				//   header1.classList.add('d-none')
				//   header2.classList.remove('d-none')
				// }

				that.setAttribute("interval", i);
			}

			clearMarks();
			/* hold function ends here */
			const onClick = function () {
				clearMarks();
				dropDownAction.forEach((element) => element.classList.remove("d-none"));
				dropDownHold.forEach((element) => element.classList.add("d-none"));
			};
		}

		const markUnread = function () {
			dropDown.classList.add("markread");
			message.forEach((item) => {
				if (item.classList.value.includes("hold")) {
					item.querySelector(".messages__read").classList.remove("d-none");
					item.querySelector(".tickmark").classList.add("d-none");
					window.unread = true;
					item.classList.remove("hold");
				}
			});
		};

		const markRead = function () {
			dropDown.classList.remove("markread");
			message.forEach((item) => {
				if (item.classList.value.includes("hold")) {
					window.unread = false;
					item.querySelector(".messages__read").classList.add("d-none");
					item.querySelector(".tickmark").classList.add("d-none");
					item.classList.remove("hold");
				}
			});
		};

		const showUnread = function () {
			markAsRead.classList.remove("d-none");
		};

		/* function to show and hide element start here */

		/*function to show and hide element ends here  */

		/* function and eventlistener to toggle filters starts here */
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

		const showFilter = function () {
			filters.classList.add("d-flex");
		};
		const hideFilter = function () {
			filters.classList.remove("d-flex");
		};
		if (filterIcon) {
			const toggleFilters = function (event) {
				if (filterIcon.contains(event.target)) {
					showFilter();
				} else {
					hideFilter();
				}
			};
			window.addEventListener("click", toggleFilters);
		}

		/* function and eventlistener to toggle filters ends here */

		/* function and eventlistener to toggle settings starts here */

		if (markAsUnread) {
			markAsUnread.addEventListener("click", markUnread);
		}
		if (markAsRead) {
			markAsRead.addEventListener("click", markRead);
		}
	};

	return list;
});


(function () {
	"use strict";

	const app = window.app || {};

	app.isFocused = true;
	app.currentRoom = null;
	app.cacheBuster = null;
	app.flags = app.flags || {};


	let appLoaded = false;

	app.cacheBuster = config["cache-buster"];

	$(document).ready(() => {
		ajaxify.parseData();
		app.load();
	});

	// ((() => {
	// 	var url_string = window.location.href;
	// 	var url = new URL(url_string);
	// 	var share_redirect = url.searchParams.get('share_redirect');
	// 	var share_redirect_url = url.searchParams.get('url');
	// 	if (share_redirect && share_redirect_url) {
	// 		app.setCookie('share_redirect', share_redirect_url, 1);
	// 	}
	// })());

	app.getPlatformDetails = () => {
		const userAgent = navigator.userAgent;
		let browserName = 'Unknown';
		let fullVersion = '';
		let majorVersion = '';

		// Get browser name and version
		switch (true) {
			case userAgent.indexOf('Opera') > -1:
				browserName = 'Opera';
				fullVersion = userAgent.substring(userAgent.indexOf('Opera') + 6);
				if (userAgent.indexOf('Version') > -1) {
					fullVersion = userAgent.substring(userAgent.indexOf('Version') + 8);
				}
				break;

			case userAgent.indexOf('Firefox') > -1:
				browserName = 'Firefox';
				fullVersion = userAgent.substring(userAgent.indexOf('Firefox') + 8);
				break;

			case userAgent.indexOf('Chrome') > -1:
				browserName = 'Chrome';
				fullVersion = userAgent.substring(userAgent.indexOf('Chrome') + 7);
				break;

			case userAgent.indexOf('Safari') > -1:
				browserName = 'Safari';
				fullVersion = userAgent.substring(userAgent.indexOf('Safari') + 7);
				if (userAgent.indexOf('Version') > -1) {
					fullVersion = userAgent.substring(userAgent.indexOf('Version') + 8);
				}
				break;

			case userAgent.indexOf('MSIE') > -1:
				browserName = 'Microsoft Internet Explorer';
				fullVersion = userAgent.substring(userAgent.indexOf('MSIE') + 5);
				break;

			default:
				break;
		}

		// Get major version
		if (fullVersion.indexOf(';') > -1) {
			fullVersion = fullVersion.substring(0, fullVersion.indexOf(';'));
		}
		if (fullVersion.indexOf(' ') > -1) {
			fullVersion = fullVersion.substring(0, fullVersion.indexOf(' '));
		}
		majorVersion = parseInt(fullVersion, 10);

		return {
			system: navigator.appVersion,
			browserName,
			browserVersion: fullVersion || 'Unknown',
			majorVersion: isNaN(majorVersion) ? '' : majorVersion
		};
	};


	app.load = () => {
		document.addEventListener("visibilitychange", () => {
			app.isFocused = document.visibilityState === "visible";
		});

		appLoaded = true;
		$(window).trigger("action:app.load");
		app.events();
		$('.widget-title').html(ajaxify.data.title || 'Deepthought');
		app.loader(false);
	};

	app.handleInvalidSession = () => {
		if (app.flags._login || app.flags._logout) return;
		socket.disconnect();
	};

	app.coldLoad = () => {
		$(window).on("action:app.load", () => ajaxify.coldLoad());
		if (appLoaded) ajaxify.coldLoad();
	};

	app.loader = (show) => {
		$('#loader')[show ? 'show' : 'hide']();
	}

	app.formatCode = async (content, type , cb) => {

		require(['api'], function (api) {
			const payload = {
				content,
				type
			}
			api.post('/dtpen/format', payload, cb);
		})

	}

	app.parseAndTranslate = function (template, blockName, data, callback) {
		require(["translator", "benchpress"], function (translator, Benchpress) {
			if (typeof blockName !== "string") {
				callback = data;
				data = blockName;
				blockName = undefined;
			}

			Benchpress.render(template, data, blockName)
				.then((rendered) => translator.translate(rendered))
				.then((translated) => translator.unescape(translated))
				.then(
					(result) => setTimeout(callback, 0, $(result)),
					(err) => console.error(err)
				);
		});
	};

	app.logout = function (redirect) {
		redirect = redirect === undefined ? true : redirect;
		$(window).trigger("action:app.logout");

		$.ajax(config.relative_path + "/logout", {
			type: "POST",
			headers: {
				"x-csrf-token": config.csrf_token,
			},
			beforeSend: function () {
				app.flags._logout = true;
			},
			success: function (data) {
				$(window).trigger("action:app.loggedOut", data);
				if (redirect) {
					if (data.next) {
						window.location.href = data.next;
					} else {
						window.location.reload();
					}
				}
			},
		});
		return false;
	};

	// Move dropdown menu items to header on small screens
	function moveDropdownMenuItemsToHeader() {
		// Only do this on small screens
		if (window.innerWidth < 576) {
			// Find all menu items in the dropdown
			const $menuItems = $('.header-dropdown-menu .nav-menu-item');
			// If there are no menu items, return
			if (!$menuItems.length) return;
			// Move each menu item to the header
			for (const item of $menuItems) {
				const $item = $(item);
				$('header .dropdown-menu').append(`
		  			<li>
						<a class="dropdown-item" href="${$item.data('href')}">
						  ${$item.data('title')}
						</a>
		  			</li>
				`);
				$item.remove();
			}
		}
	}



	app.events = function () {

		// Attach the function to a resize event
		$(window).resize(moveDropdownMenuItemsToHeader);
		// Call the function
		moveDropdownMenuItemsToHeader();

		// Toggle left sidebar
		$(document.body).on('click', '#toggleLeftSidebar', function () {
			$('left-sidebar').toggleClass('is-opened');
			$('.hamburger-menu-button-open').toggleClass('hamburger-menu-button-close');
		});


		// Initialize user module
		require(['user'], function (user) {
			user.init();
		});

		// Initialize widgets module
		require(['widgets'], function (widgets) {
			widgets.init();
		});

		autoHeight();
	}

	app.timeago = function () {
		$('[data-timeago]').each(function () {
			let timeago = $(this).data('timeago');
			$(this).text(moment(timeago).fromNow());
		});
	}

	app.imagePicker = function () {
		$('.image-picker').each(function () {
			const $this = $(this);

			// Check if the image picker has already been initialized
			if ($this.hasClass('image-picker-initialized')) {
				return; // Skip this iteration if already initialized
			}

			// Mark the image picker as initialized
			$this.addClass('image-picker-initialized');
			const $input = $this.find('input[type="file"]');
			const $preview = $this.find('.image-preview');

			// Handle file input change event
			$input.on('change', function () {
				const file = this.files[0];
				if (file) {
					// Read the selected file and display it in the image preview
					const reader = new FileReader();

					reader.onload = function (e) {
						$this.addClass('has-image');
						$preview.css('background-image', `url(${e.target.result})`);
					};

					reader.readAsDataURL(file);
				} else {
					// If no file is selected, remove the image preview
					$this.removeClass('has-image');
					$preview.css('background-image', '');
				}
			});

			$input.on('reset',function(){
				$this.removeClass('has-image');
				$preview.css('background-image', '');
			})
		});


	}

	app.enterRoom = function (room, callback) {
		callback = callback || function () { };
		if (socket && app.user.uid && app.currentRoom !== room) {
			var previousRoom = app.currentRoom;
			app.currentRoom = room;
			socket.emit(
				'meta.rooms.enter', {
				enter: room,
			},
				function (err) {
					if (err) {
						app.currentRoom = previousRoom;
						return app.alertError(err.message);
					}

					callback();
				}
			);
		}
	};

	// Function to adjust element heights based on the 'auto-height' attribute
	function autoHeight() {

		$('[auto-height]').each(function () {
			const $this = $(this); // Get the current element
			const height = $($this.attr('auto-height')).height(); // Get the value of 'auto-height' attribute
			if (!height) return;
			$this.css('height', height); // Set the height of the element to the specified value
		});

	}

	/**
	  * @date 03-05-2022
	  * @author imshawan
	  * @description Adding event listner that will listen to every errors occcuring on the page and send it to the server
	  */
	window.addEventListener('error', async ({ colno, lineno, message, error } = {}) => {
		if (app.user.collectErrorLogs) {
			const { stack } = error;
			const payload = {
				errorStack: {
					colno,
					lineno,
					message,
					stack
				},
				platform: app.getPlatformDetails()
			};
			try {
				console.log('Error occured', payload);
			} catch (err) {
				console.error(err.message);
			}
		}
	});

})();

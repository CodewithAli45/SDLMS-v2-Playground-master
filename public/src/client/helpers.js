/**
 * Returns a function that debounces the execution of the given function.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The delay in milliseconds before the function is executed.
 * @returns {Function} A debounced function.
 */
const debounce = (func, delay) => {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func.apply(this, args), delay)
	}
}


/**
* Displays a notification toast message with specified content, status, and timeout duration
* @param {string} message - The text content of the notification message
* @param {string} status - The status of the notification, either "success", "error", or "blue"
* @param {number} timeout - The duration in milliseconds for which the notification will be displayed, default is 3000ms
*/

function notify(message, status, timeout = 3000) {
	const colorClass = status === "success" ? "_toast--green" : status === "error" ? "_toast--error" : "_toast--blue";
	const icon = status === "success" ? '<svg version="1.1" class="_toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"></path></g></g></svg>' :
		status === "error" ? '<svg version="1.1" class="_toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g><g id="info"><g><path  d="M10,16c1.105,0,2,0.895,2,2v8c0,1.105-0.895,2-2,2H8v4h16v-4h-1.992c-1.102,0-2-0.895-2-2L20,12H8     v4H10z"></path><circle  cx="16" cy="4" r="4"></circle></g></g></svg>' :
			'<svg version="1.1" class="_toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 301.691 301.691" style="enable-background:new 0 0 301.691 301.691;" xml:space="preserve"><g><polygon points="119.151,0 129.6,218.406 172.06,218.406 182.54,0  "></polygon><rect x="130.563" y="261.168" width="40.525" height="40.523"></rect></g></svg>';


	// Create the notification HTML string
	const addedToast = `_toast${counterToast}`;
	const notificate = `
	  <div id="${addedToast}" class="_toast ${colorClass} add-margin">
		<div class="_toast__icon">${icon}</div>
		<div class="_toast__content">
		  <p class="_toast__message">${message}</p>
		</div>
	  </div>
	`;

	// Append the notification to the toast cell
	$("._toast__cell").append(notificate);

	// Show and animate the notification
	const selectedToast = `#${addedToast}`;
	$(selectedToast)
		.show()
		.animate({ left: "-40px" }, "slow", "swing", function () {
			$(this).css({ transform: "skewX(10deg)" });
		})
		.animate({ left: "0px" }, "fast", "swing", function () {
			$(this).css({ transform: "skewX(0deg)" });
		});

	// Remove the notification after the specified timeout
	setTimeout(function () {
		$(selectedToast)
			.css({ transform: "skewX(-10deg)" }, "slow")
			.animate({ left: "-30px" }, "fast")
			.animate({ left: "2300px" }, "slow", function () {
				$(this).fadeOut(1000, function () {
					$(this).remove();
				});
			});
	}, timeout);

	// Increment the counter for the next notification
	counterToast++;
}

// This is a class called Logger
class ConsoleLogger {
	// The constructor function takes in a parameter called 'prefix'
	constructor(prefix) {
		// The 'prefix' parameter is saved as an instance variable of the class
		this.prefix = prefix;
		// The 'set' function is called to set up the logger methods
		this.set();
	}

	// This function sets up the logger methods using an array of keys
	set() {
		// An array of strings representing the console methods to use
		let keys = ['log', 'warn', 'error', 'trace', 'debug'];
		// For each key in the array, create a new function that calls the console method with the prefix and the arguments passed in
		for (let key of keys) this[key] = (...args) => console[key](this.prefix, ...args);
	}
}

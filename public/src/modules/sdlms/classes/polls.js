/**
 * @author Deepansu
 * @date 05/2022
 * @description Allow user to build the Polls based on @tid and @uid
 * @returns @Polls 
 */

/**
 * @var {class} Polls
 * @description Contains the @methods or @function - to run the Polls
 * @function Polls.init
 * @function Polls.unique
 * @function Polls.log
 * @function Polls.builder
 * @function Polls.create
 */

class Polls {
	constructor(data = {}) {
		/**
		 * @author Deepansu
		 * @description Tid is required to init a thread builder
		 */

		if (!data.tid) {
			throw new Error("Invalid tid supplied");
		}
		this.tid = data.tid;
		this.data = data;
		this.assetId = data.assetId;
		this.data.with = data.with || {};
		this.data.queue = 0;
		this.builder(this.data.target);
	}
	/**
	 * @author Deepansu
	 * @date 12/2021
	 * @name unique
	 * @type {function} 
	 * @description to get unique id 
	 * @param {String} prefix optional identifier for generated unique id {prefix + id}
	 */

	unique(prefix = "") {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}
	/**
	 * @author Deepansu
	 * @date 12/2021
	 * @name log
	 * @type {function} 
	 * @description To Log 
	 * @param {*} log 
	 */

	log(log) {
		!this.data.log || console.log(log);
	}
	/**
	 * @author Deepansu
	 * @date 12/2021
	 * @name builder
	 * @type {function} 
	 * @description Attach an  sdlms-thread-builder element
	 * @param {HTML ELEMENT} HTML element to render builder default body 
	 */

	builder(target = "body") {

		this.id = this.unique("sdlms-Polls-");
		let $that = this;
		let $target = $(target);
		if (!$target.length) {

			/**
			 * @author Deepansu
			 * @description Given target should be a valid HTML Element
			 */
			$that.log("No HTML element found For Builder Given ==>" + target);
			throw new Error(`No HTML element found while searching ${target}`);
		}
		$target.empty();
		$target.append(
			$("<sdlms-Polls-builder>")
			.attr({
				id: $that.id,
				class: $that.data.noAction ? "sdlms-readonly" : ''
			})
			.append(`<div class="sdlms-asset-owner" style="display:${$that.data.name || "none"} " name="${$that.data.name}" ></div>`)
			.append(
				$("<form>").attr({
					id: "form-" + $that.id,
					class: 'sdlms-form-elements w-100 overflow-auto sdlms-Polls-container ' + ($that.data.action == 'reader' ? 'readonly' : 'create'),
				})
			)
		);
		let $builder = $(`#form-${$that.id}`);
		$that.$builder = $builder;
		$that[$that.data.action == 'reader' ? 'reader' : 'create']($that.data.with);

	}

	/**
	 * @author Deepansu
	 * @date 12/2021
	 * @name create
	 * @type {function} 
	 * @description Append @Polls and  attach all the events 
	 * @param {Object} data optional if @Polls is initied with existing @Polls then render it with Exisiting
	 */
	create(data = null) {

		let $target = this.$builder,
			$that = this;

	}
	reader(data = null) {
		let $target = this.$builder;
		let $that = this;
		
	}

	getJSON() {
		let $that = this;
		return {
			data: $that.Polls.getJson(),
			readonly: [],
			styles: $that.Polls.getStyle(),
			widths: JSON.stringify($that.Polls.getWidth(0))
		}
	}
}
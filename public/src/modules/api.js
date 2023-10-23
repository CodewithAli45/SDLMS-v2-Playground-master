'use strict';

define('api', () => {
	const api = {};
	const baseUrl = config.relative_path + '/api/v3';
	const apiThrottle = {};
	const Logger = new ConsoleLogger('API');

	config.api_rate_limit = config.api_rate_limit || 2;

	function call(options, callback) {
		options.url = options.url.startsWith('/api') ?
			config.relative_path + options.url :
			baseUrl + options.url;

		const key = getThrottleKey(options.url);

		if (apiThrottle[key] && apiThrottle[key].calls >= config.api_rate_limit) {
			
			const waitTime = apiThrottle[key].resetTime - Date.now();
			Logger.log(`API rate limit exceeded for ${key}, waiting for reset. ${waitTime}ms`);
			// return new Promise((resolve, reject) => {
			// 	setTimeout(() => {
			// 		call(options, callback).then(resolve).catch(reject);
			// 	}, waitTime);
			// });
			// direct reject
			return Promise.reject(new Error(`API rate limit exceeded for ${key}, waiting for reset. ${waitTime}ms`));
		}

		function doAjax(cb) {
			$.ajax(options)
				.done((res) => {
					cb(null,
						res && res.hasOwnProperty('status') && res.hasOwnProperty('response') ?
							res.response : (res || {})
					);
				})
				.fail((ev) => {
					let errMessage;
					if (ev.responseJSON) {
						errMessage = ev.responseJSON.status && ev.responseJSON.status.message ?
							ev.responseJSON.status.message :
							ev.responseJSON.error;
					}

					cb(new Error(errMessage || ev.statusText));
				});
		}

		if (typeof callback === 'function') {
			doAjax(callback);
			return;
		}

		return new Promise((resolve, reject) => {
			doAjax(function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		}).then((response) => {
			if (!apiThrottle[key]) {
				apiThrottle[key] = {
					calls: 0,
					resetTime: Date.now() + (60 * 1000), // reset after 1 minute
				};
			}

			apiThrottle[key].calls++;
			return response;
		});
	}

	function getThrottleKey(path) {
		return `${path}_${Math.floor(Date.now() / (config.api_rate_limit * 1000))}`;
	}

	api.get = (route, payload={}, onSuccess) => call({
		url: route + (Object.keys(payload).length ? ('?' + $.param(payload)) : ''),
	}, onSuccess);

	api.head = (route, payload={}, onSuccess) => call({
		url: route + (Object.keys(payload).length ? ('?' + $.param(payload)) : ''),
		method: 'head',
	}, onSuccess);

	api.post = (route, payload={}, onSuccess) => call({
		url: route,
		method: 'post',
		data: payload,
		headers: {
			'x-csrf-token': config.csrf_token,
		},
	}, onSuccess);

	api.put = (route, payload={}, onSuccess) => call({
		url: route,
		method: 'put',
		data: payload,
		headers: {
			'x-csrf-token': config.csrf_token,
		},
	}, onSuccess);

	api.del = (route, payload={}, onSuccess) => call({
		url: route,
		method: 'delete',
		data: payload,
		headers: {
			'x-csrf-token': config.csrf_token,
		},
	}, onSuccess);

	return api;
});

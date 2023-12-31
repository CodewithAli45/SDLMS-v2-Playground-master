"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");
let mkdirp = require("mkdirp");
// TODO: remove in 1.16.0
if (!mkdirp.hasOwnProperty("native")) {
	mkdirp = util.promisify(mkdirp);
}

const rimraf = require("rimraf");
const rimrafAsync = util.promisify(rimraf);

const file = require("../file");
const plugins = require("../plugins");
const minifier = require("./minifier");

const JS = module.exports;

JS.scripts = {
	base: [
		'node_modules/promise-polyfill/dist/polyfill.js',
		"node_modules/socket.io-client/dist/socket.io.js",
		"node_modules/requirejs/require.js",
		"public/src/require-config.js",
		'node_modules/benchpressjs/build/benchpress.js',
		"public/src/utils.js",
		"public/src/sockets.js",
		"public/src/app.js",
		"public/src/ajaxify.js",
		"public/src/library/mentiony.js",
	],

	// files listed below are only available client-side, or are bundled in to reduce # of network requests on cold load
	rjs: [
		"public/src/modules/helpers.js",
		"public/src/client/helpers.js",
		"public/src/client/ajax.js",
	],

	admin: [
		"node_modules/material-design-lite/material.js",
		"public/src/admin/admin.js",
		"node_modules/jquery-deserialize/src/jquery.deserialize.js",
	],

	// modules listed below are built (/src/modules) so they can be defined anonymously
	modules: {
		"Chart.js": "node_modules/chart.js/dist/Chart.min.js",
		"mousetrap.js": "node_modules/mousetrap/mousetrap.min.js",
		"cropper.js": "node_modules/cropperjs/dist/cropper.min.js",
		"jquery-ui": "node_modules/jquery-ui/ui",
		"zxcvbn.js": "node_modules/zxcvbn/dist/zxcvbn.js",
		ace: "node_modules/ace-builds/src-min",
		"clipboard.js": "node_modules/clipboard/dist/clipboard.min.js",
		"tinycon.js": "node_modules/tinycon/tinycon.js",
		"slideout.js": "node_modules/slideout/dist/slideout.min.js",
		"compare-versions.js": "node_modules/compare-versions/index.js",
		"timeago/locales": "node_modules/timeago/locales",
		"jquery-form.js": "node_modules/jquery-form/dist/jquery.form.min.js",
		"xregexp.js": "node_modules/xregexp/xregexp-all.js",
		"Sortable.js": "node_modules/sortablejs/Sortable.js",
	},
};

async function linkIfLinux(srcPath, destPath) {
	if (process.platform === "win32") {
		await fs.promises.copyFile(srcPath, destPath);
	} else {
		await file.link(srcPath, destPath, true);
	}
}

const basePath = path.resolve(__dirname, "../..");

async function minifyModules(modules, fork) {
	const moduleDirs = modules.reduce(function (prev, mod) {
		const dir = path.resolve(path.dirname(mod.destPath));
		if (!prev.includes(dir)) {
			prev.push(dir);
		}
		return prev;
	}, []);

	await Promise.all(moduleDirs.map((dir) => mkdirp(dir)));

	const filtered = modules.reduce(
		function (prev, mod) {
			if (
				mod.srcPath.endsWith(".min.js") ||
				path.dirname(mod.srcPath).endsWith("min")
			) {
				prev.skip.push(mod);
			} else {
				prev.minify.push(mod);
			}

			return prev;
		},
		{ minify: [], skip: [] }
	);

	await Promise.all([
		minifier.js.minifyBatch(filtered.minify, fork),
		...filtered.skip.map((mod) => linkIfLinux(mod.srcPath, mod.destPath)),
	]);
}

async function linkModules() {
	const modules = JS.scripts.modules;

	await Promise.all(
		Object.keys(modules).map(async function (relPath) {
			const srcPath = path.join(__dirname, "../../", modules[relPath]);
			const destPath = path.join(
				__dirname,
				"../../build/public/src/modules",
				relPath
			);
			const [stats] = await Promise.all([
				fs.promises.stat(srcPath),
				mkdirp(path.dirname(destPath)),
			]);

			if (stats.isDirectory()) {
				await file.linkDirs(srcPath, destPath, true);
				return;
			}

			await linkIfLinux(srcPath, destPath);
		})
	);
}

const moduleDirs = ["modules", "admin", "client"];

async function getModuleList() {
	let modules = Object.keys(JS.scripts.modules).map(function (relPath) {
		return {
			srcPath: path.join(__dirname, "../../", JS.scripts.modules[relPath]),
			destPath: path.join(__dirname, "../../build/public/src/modules", relPath),
		};
	});

	const coreDirs = moduleDirs.map(function (dir) {
		return {
			srcPath: path.join(__dirname, "../../public/src", dir),
			destPath: path.join(__dirname, "../../build/public/src", dir),
		};
	});

	modules = modules.concat(coreDirs);

	const moduleFiles = [];
	await Promise.all(
		modules.map(async function (module) {
			const srcPath = module.srcPath;
			const destPath = module.destPath;

			const stats = await fs.promises.stat(srcPath);
			if (!stats.isDirectory()) {
				moduleFiles.push(module);
				return;
			}

			const files = await file.walk(srcPath);

			const mods = files
				.filter((filePath) => path.extname(filePath) === ".js")
				.map(function (filePath) {
					return {
						srcPath: path.normalize(filePath),
						destPath: path.join(destPath, path.relative(srcPath, filePath)),
					};
				});

			moduleFiles.push(...mods);
		})
	);
	moduleFiles.forEach(function (mod) {
		mod.filename = path.relative(basePath, mod.srcPath).replace(/\\/g, "/");
	});
	return moduleFiles;
}

async function clearModules() {
	const builtPaths = moduleDirs.map((p) =>
		path.join(__dirname, "../../build/public/src", p)
	);
	await Promise.all(builtPaths.map((builtPath) => rimrafAsync(builtPath)));
}

JS.buildModules = async function (fork) {
	await clearModules();
	if (process.env.NODE_ENV === "development") {
		await linkModules();
		return;
	}
	const modules = await getModuleList();
	await minifyModules(modules, fork);
};

async function requirejsOptimize(target) {
	const requirejs = require("requirejs");
	let scriptText = "";
	const sharedCfg = {
		paths: {
			jquery: "empty:",
		},
		optimize: "none",
		out: function (text) {
			scriptText += text;
		},
	};
	const bundledModules = [
		{
			baseUrl: path.join(basePath, "node_modules"),
			name: "timeago/jquery.timeago",
		},
		{
			baseUrl: path.join(basePath, "node_modules/nprogress"),
			name: "nprogress",
		},
		{
			baseUrl: path.join(basePath, "node_modules/bootbox"),
			name: "bootbox",
		},
	];
	const targetModules = {
		admin: [
			{
				baseUrl: path.join(basePath, "node_modules/sortablejs"),
				name: "Sortable",
			},
		],
		client: [
			{
				baseUrl: path.join(basePath, "node_modules/sortablejs"),
				name: "Sortable",
			},
		],
	};
	const optimizeAsync = util.promisify(function (config, cb) {
		requirejs.optimize(
			config,
			() => cb(),
			(err) => cb(err)
		);
	});

	const allModules = bundledModules.concat(targetModules[target]);

	for (const moduleCfg of allModules) {
		// eslint-disable-next-line no-await-in-loop
		await optimizeAsync({ ...sharedCfg, ...moduleCfg });
	}
	const filePath = path.join(
		__dirname,
		"../../build/public/rjs-bundle-" + target + ".js"
	);
	await fs.promises.writeFile(filePath, scriptText);
}

JS.linkStatics = async function () {
	await rimrafAsync(path.join(__dirname, "../../build/public/plugins"));

	await Promise.all(
		Object.keys(plugins.staticDirs).map(async function (mappedPath) {
			const sourceDir = plugins.staticDirs[mappedPath];
			const destDir = path.join(
				__dirname,
				"../../build/public/plugins",
				mappedPath
			);

			await mkdirp(path.dirname(destDir));
			await file.linkDirs(sourceDir, destDir, true);
		})
	);
};

async function getBundleScriptList(target) {
	const pluginDirectories = [];

	if (target === "admin") {
		target = "acp";
	}
	let pluginScripts = plugins[target + "Scripts"].filter(function (path) {
		if (path.endsWith(".js")) {
			return true;
		}

		pluginDirectories.push(path);
		return false;
	});

	await Promise.all(
		pluginDirectories.map(async function (directory) {
			const scripts = await file.walk(directory);
			pluginScripts = pluginScripts.concat(scripts);
		})
	);

	let scripts = JS.scripts.base;
	// console.log(scripts);
	if (target === "client" && process.env.NODE_ENV !== "development") {
		scripts = scripts.concat(JS.scripts.rjs);
	} else if (target === "acp") {
		scripts = scripts.concat(JS.scripts.admin);
	}

	scripts = scripts.concat(pluginScripts).map(function (script) {
		const srcPath = path.resolve(basePath, script).replace(/\\/g, "/");
		return {
			srcPath: srcPath,
			filename: path.relative(basePath, srcPath).replace(/\\/g, "/"),
		};
	});

	return scripts;
}

JS.buildBundle = async function (target, fork) {
	const fileNames = {
		client: "nodebb.min.js",
		admin: "acp.min.js",
	};
	await requirejsOptimize(target);
	const files = await getBundleScriptList(target);

	files.push({
		srcPath: path.join(
			__dirname,
			"../../build/public/rjs-bundle-" + target + ".js"
		),
	});

	const minify = process.env.NODE_ENV !== "development";
	const filePath = path.join(
		__dirname,
		"../../build/public",
		fileNames[target]
	);

	await minifier.js.bundle(
		{
			files: files,
			filename: fileNames[target],
			destPath: filePath,
		},
		minify,
		fork
	);
};

JS.killMinifier = function () {
	minifier.killAll();
};

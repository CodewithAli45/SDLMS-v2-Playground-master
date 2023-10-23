'use strict';

const path = require('path');

const baseDir = path.join(__dirname, '../');
const loader = path.join(baseDir, 'loader.js');
const app = path.join(baseDir, 'app.js');
const pidfile = path.join(baseDir, 'pidfile');
const config = path.join(baseDir, 'config.json');
const currentPackage = path.join(baseDir, 'package.json');
const installPackage = path.join(baseDir, 'install/package.json');
const nodeModules = path.join(baseDir, 'node_modules');

const defaultProfileImages =  [
	"default_profile-image-from-rawpixel-id-476985-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-476994-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477018-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477019-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477026-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477034-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477038-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477042-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477047-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477048-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477142-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477164-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477181-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-477183-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-6268695-original.jpg",
	"default_profile-image-from-rawpixel-id-6268738-jpeg.jpg",
	"default_profile-image-from-rawpixel-id-6268747-original.jpg",
	"default_profile-image-from-rawpixel-id-6270472-original.jpg",
	"default_profile-image-from-rawpixel-id-6320771-original.jpg",
	"default_profile-image-from-rawpixel-id-6320776-original.jpg",
	"default_profile-image-from-rawpixel-id-6320778-original.jpg",
];
const hostName = 'https://sdlms.deepthought.education';
const defaultProfileImagesRelativeBase = '/assets/uploads/files/profile_images';
const defaultProfileImagesBase = hostName + defaultProfileImagesRelativeBase;

const SDLMS = {
	userTypes: ['Parent', 'Teacher', 'School', 'Recruiter'],
	categoryTypes: ['Class', 'Personal', 'Public', 'Mobile']
}

exports.paths = {
	baseDir,
	loader,
	app,
	pidfile,
	config,
	currentPackage,
	installPackage,
	nodeModules,
};

exports.constants = {
	defaultProfileImages,
	defaultProfileImagesBase,
	defaultProfileImagesRelativeBase,
	hostName,
	SDLMS
}

exports.pluginNamePattern = /^(@[\w-]+\/)?nodebb-(theme|plugin|widget|rewards)-[\w-]+$/;
exports.themeNamePattern = /^(@[\w-]+\/)?nodebb-theme-[\w-]+$/;
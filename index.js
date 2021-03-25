"use strict";
exports.__esModule = true;
exports.argv = void 0;
var yargs_1 = require("yargs");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
exports.argv = yargs_1["default"].usage('create laya app').argv;
var resolve = function (name) {
    return path_1["default"].resolve(__dirname, '..', name);
};
var createApp = function (appName) {
    if (!appName) {
        appName = 'MyAwesomeLayaApp';
    }
    var appPath = path_1["default"].resolve('test', appName);
    var templatePath = resolve('../template');
    fs_extra_1["default"].ensureDirSync(appPath);
    fs_extra_1["default"].copySync(templatePath, appPath);
};
// 执行
var argv0 = exports.argv._[0];
createApp(typeof argv0 === 'string' ? argv0 : null);

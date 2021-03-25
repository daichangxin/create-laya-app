#! node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
exports.argv = yargs_1.default.usage('create laya app').argv;
const resolve = (name) => {
    return path_1.default.resolve(__dirname, '..', name);
};
const createApp = (appName) => {
    if (!appName) {
        appName = 'MyAwesomeLayaApp';
    }
    const appPath = path_1.default.resolve(appName);
    const templatePath = resolve('template');
    if (fs_extra_1.default.pathExistsSync(appPath)) {
        console.warn(`创建项目失败:目录已经存在 ${appPath}`);
        return;
    }
    fs_extra_1.default.ensureDirSync(appPath);
    fs_extra_1.default.copySync(templatePath, appPath);
};
// 执行
const argv0 = exports.argv._[0];
createApp(typeof argv0 === 'string' ? argv0 : null);

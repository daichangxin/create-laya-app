#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import yargs from 'yargs';

export const argv = yargs.usage('create laya app').argv;

const resolve = (name: string) => {
    return path.resolve(__dirname, '..', name);
};

const createApp = (appName?: string) => {
    if (!appName) {
        appName = 'MyAwesomeLayaApp';
    }
    const appPath = path.resolve(appName);
    const templatePath = resolve('template');
    if (fs.pathExistsSync(appPath)) {
        console.warn(`创建项目失败:目录已经存在 ${appPath}`);
        return;
    }
    fs.ensureDirSync(appPath);
    fs.copySync(templatePath, appPath);
};

// 执行
const argv0 = argv._[0];
createApp(typeof argv0 === 'string' ? argv0 : null);

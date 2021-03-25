const gulp = require('gulp');
const path = require('path');
const del = require("del");
const rev = require("gulp-rev");
const revdelorigin = require("gulp-rev-delete-original");
const revCollector = require('gulp-rev-collector');
const fs = require('fs');
const dayjs = require('dayjs');
const webpack = require('webpack-stream');

function resolvePath(name) {
    return path.join(__dirname, '..', name);
}

// 读取要编译的环境类型，默认release
const dirReleaseWeb = resolvePath('outputs');
const dirBin = resolvePath('bin');
const dirBinJs = resolvePath('bin/js');

// 清空发布文件夹
gulp.task('clean', () => {
    return del([
        dirBinJs,
        dirReleaseWeb,
    ], {
        force: true,
    });

});

// 编译工程
gulp.task('build', () => {
    const buildConfig = require(`./webpack.release.js`);
    return gulp.src(resolvePath('src'))
        .pipe(webpack(buildConfig))
        .pipe(gulp.dest(resolvePath('bin/js')));
});

// 从bin目录复制要发布的文件
gulp.task('copyFromBin', () => {
    return gulp.src([
            `${dirBin}/**/*.*`,
            // `!${dirBin}/**/*.js.map`,
        ])
        .pipe(gulp.dest(dirReleaseWeb));
});

// 构建版本号，保存到version.json
gulp.task('buildVersion', () => {
    const filter = [
        `${dirReleaseWeb}/**/*.*`,
        `!${dirReleaseWeb}/*.html`,
        `!${dirReleaseWeb}/**/*.js`,
        `!${dirReleaseWeb}/**/*.js.map`,
        `!${dirReleaseWeb}/{version.json,game.js,game.json,asset-manifest.json}`,
    ];
    return gulp.src(filter)
        .pipe(rev())
        .pipe(gulp.dest(dirReleaseWeb))
        .pipe(revdelorigin())
        .pipe(rev.manifest("version.json"))
        .pipe(gulp.dest(dirReleaseWeb));
});

gulp.task('setBuildTime', async () => {
    const pathVer = `${dirReleaseWeb}/version.json`;
    const verObj = JSON.parse(fs.readFileSync(pathVer));
    verObj.version = dayjs().format('YYYYMMDDHHmmss');
    fs.writeFileSync(pathVer, JSON.stringify(verObj), 'utf-8');
});

// 给index.js中的资源加版本号
gulp.task('replaceVersion', () => {
    return gulp.src([
            `${dirReleaseWeb}/version.json`,
            `${dirReleaseWeb}/index.js`,
            // `${dirReleaseWeb}/index.html`, // 没必要加，会有缓存问题，加了也没效果
        ])
        .pipe(revCollector())
        .pipe(gulp.dest(dirReleaseWeb));
});

// 给index.js中的资源加版本号
gulp.task('replaceWebpackVersion', () => {
    return gulp.src([
            `${dirReleaseWeb}/asset-manifest.json`,
            `${dirReleaseWeb}/index.js`,
            // `${dirReleaseWeb}/index.html`, // 没必要加，会有缓存问题，加了也没效果
        ])
        .pipe(revCollector({
            revSuffix: '.[0-9a-f]{8,10}-?',
        }))
        .pipe(gulp.dest(dirReleaseWeb));
});

// setBuildTime 必须在replaceVersion后面，否则replaceVersion不生效，以后有空再看为啥
gulp.task('default', gulp.series(['clean', 'build', 'copyFromBin', 'buildVersion', 'replaceVersion', 'replaceWebpackVersion', 'setBuildTime']));

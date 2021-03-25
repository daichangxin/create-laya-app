const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

function resolve(name) {
    return path.join(__dirname, '..', name);
}

const webpackConfig = {
    mode: 'production',
    devtool: 'hidden-source-map',
    optimization: {
        minimize: true,
    },
    entry: {
        libs: [
            'whatwg-fetch',
            resolve('node_modules/proxy-polyfill'), // fix Uncaught ReferenceError: Proxy is not defined
            resolve('node_modules/core-js/stable'),
            resolve('node_modules/regenerator-runtime/runtime'),
            resolve('node_modules/@inno/game-sdk'),
        ],
        bundle: [
            resolve('src/Main.ts'),
        ],
    },
    output: {
        filename: '[name].[contenthash:8].js',
        path: resolve('bin/js/'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    },
    module: {
        rules: [{
                test: /\.(tsx|ts)?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            target: 'es5',
                        },
                    },
                }],
            },
            {
                test: /\.*(.js)$/,
                // exclude: /node_modules/, // proxy-polyfill不编译 会出现 Uncaught SyntaxError: Unexpected identifier bundle-c9c5c6e0e3.js:1
                exclude: /node_modules\/(core-js|regenerator-runtime)/, // fix core-js被编译导致各种Symbol找不到的错误
                loader: 'babel-loader',
                // 不使用presets Android5.1.1 ios9 测试ok
                // Android5.1 因不支持webGL无法进入游戏
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'entry',
                                targets: {
                                    browsers: ['> 2%', 'last 2 versions', 'not ie <= 8'],
                                    node: 'current',
                                },
                                corejs: '3',
                            },
                        ],
                    ],
                    // plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
                    // sourceType: 'unambiguous',
                },
            },
        ],
    },
    plugins: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            extractComments: false,
            terserOptions: {
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
        }),
        new WebpackManifestPlugin({
            fileName: resolve('bin/asset-manifest.json'),
            publicPath: 'js/',
            basePath: 'js/',
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                return manifestFiles;
            },
        }),
    ],
};

module.exports = webpackConfig;

const path = require('path');

function resolve(name) {
    return path.join(__dirname, '..', name);
}

const webpackConfig = {
    devtool: 'source-map',
    mode: 'development',
    watch: true,
    entry: {
        libs: [
            resolve('node_modules/@inno/game-sdk'),
        ],
        bundle: [
            resolve('src/Main.ts'),
        ],
    },
    output: {
        filename: '[name].js',
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
            }],
        }],
    },
};

module.exports = webpackConfig;

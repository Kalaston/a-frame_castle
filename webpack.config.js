const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Yolistli',
            template: `${PATHS.app}/index.html`,
            inject: 'head'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        overlay: {
            errors: true,
            warnings: false
        }
    },
    performance: {hints: false},
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: "eslint-loader",
                options: {
                    emitwarning: true,
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use:
                    {
                        loader: 'html-loader',
                        options:
                            {
                                interpolate: true
                            }
                    }
            }
        ],
    },
}
;

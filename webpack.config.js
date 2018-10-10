const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitwarning: true
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
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanPlugin(['build'], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            title: 'Yolistli',
            template: `${PATHS.app}/index.html`,
            inject: 'head'
        }),
        new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets' },
                { from: 'src/manifest.json' }
            ],
            {
                copyUnmodified: true,
                watch: false
            }
        ),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            // Exclude images from the precache
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // Match any request ends with .png, .jpg, .jpeg or .svg.
                handler: 'cacheFirst', // Apply a cache-first strategy.
                options: { // Use a custom cache name.
                    cacheName: 'images'
                },
            }],
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        overlay: {
            errors: true,
            warnings: false
        }
    },
    performance: { hints: false }
};

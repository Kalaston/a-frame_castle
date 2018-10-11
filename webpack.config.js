const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Tell Webpack where to start looking for your files.
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    // We are looking at the Bootstrap files you installed with NPM.
    entry: {
        app: PATHS.app
    },
    // Here we're defining the output of our bundled JS.
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    // This is the extra rules that we have to handle our SCSS and ES2015.
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    emitwarning: true
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
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
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            name: '[path][name].[ext]',
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: path.resolve(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                './node_modules/@fortawesome/fontawesome-free/scss/',
                                './node_modules/roboto-fontface/css/roboto/sass/'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../../assets/fonts/',
                        }
                    }
                ]
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

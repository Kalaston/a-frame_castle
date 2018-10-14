const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

// Detect Node Environment Variable and load corresponing webpack config-extras
const prod = process.argv.indexOf('-p') !== -1 || process.argv.indexOf('production') !== -1  || process.env.NODE_ENV === 'production';
const ENV_CONF = prod ? require('./webpack.config.prod') : require('./webpack.config.dev');

// Tell Webpack where to start looking for your files.
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const config = {
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
            },
            {
                test: /\.glsl$/,
                use: [{ loader: 'webpack-glsl-loader' }]
            }
        ]
    },
    plugins: [
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

// Export a merge of base- and dev/prod- config
module.exports = env => {
    return merge(config, ENV_CONF)
};

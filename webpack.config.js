const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Detect Node Environment Variable and load corresponing webpack config-extras
const prod = process.argv.indexOf('-p') !== -1 || process.argv.indexOf('production') !== -1  || process.env.NODE_ENV === 'production';
const ENV_CONF = prod ? require('./webpack.config.prod') : require('./webpack.config.dev');

// Tell Webpack where to start looking for your files.
const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

var entries = [];
if (prod) {
    entries = [
        path.join(__dirname, 'src', 'index.js'),
        path.join(__dirname, 'src', 'load-sworker.js'),
        path.join(__dirname, 'src', 'styles', 'main.scss')
    ];
} else {
    entries = [
        path.join(__dirname, 'src', 'index.js'),
        path.join(__dirname, 'src', 'styles', 'main.scss')
    ];
}

const config = {
    // Tell Webpack where to start looking for your files.
    context: path.resolve(__dirname),
    // We are looking at the Bootstrap files you installed with NPM.
    entry: {
        app: entries
    },
    // This next line generates source maps to help with debugging.
    // Don't want source maps? Get rid of it.
    devtool: 'source-map',
    // Here we're defining the output of our bundled JS.
    output: {
        filename: '[name].js',
        path: PATHS.build
    },
    // This is the extra rules that we have to handle our SCSS and ES2015.
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/',
                            publicPath: '/assets/img/'
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
                                './node_modules/spinkit/scss/',
                                './node_modules/bootstrap/scss/',
                                './node_modules/@fortawesome/fontawesome-free/scss/',
                                './node_modules/roboto-fontface/css/roboto/sass/'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/',
                            publicPath: '/assets/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.glsl$/,
                use: [{ loader: 'webpack-glsl-loader' }]
            },
            {
                test: /\.hbs/,
                use: [{
                    loader: 'handlebars-loader',
                    options: {
                        partialDirs: [ path.join(__dirname, 'src', 'hbs', 'partials') ],
                        helperDirs: [ path.join(__dirname, 'src', 'hbs', 'helpers') ],
                        precompileOptions: {
                            knownHelpersOnly: false
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new HtmlWebpackPlugin({
            title: "Yolistli",
            // the template you want to use
            template: path.join(__dirname, 'src', 'index.hbs'),
            filename: path.join(__dirname, 'build', 'index.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            title: "Yolistli",
            // the template you want to use
            template: path.join(__dirname, 'src', 'home.hbs'),
            filename: path.join(__dirname, 'build', 'home.html'),
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            title: "Yolistli - Piramide",
            // the template you want to use
            template: path.join(__dirname, 'src', 'portals', 'pyramid.hbs'),
            filename: path.join(__dirname, 'build', 'portals', 'pyramid.html'),
            inject: 'head'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
        }),
        new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets' },
                { from: 'src/manifest.json' },
                { from: 'src/assets/fonts', to: 'assets/fonts' }
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

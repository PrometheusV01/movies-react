// Presets
import { sourcePath, version } from '../paths';
import { generateCommonConfiguration } from './common';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Instruments
import merge from 'webpack-merge';

// Plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const generateProductionConfiguration = () =>
    merge(
        generateCommonConfiguration(),
        {
            mode:   'production',
            output: {
                publicPath: `/${version}/`,
            },
            optimization: {
                nodeEnv:     process.env.NODE_ENV,
                splitChunks: {
                    cacheGroups: {
                        vendors: {
                            name:     'vendors',
                            filename: 'mt.[name].js',
                            chunks:   'initial',
                            test:     /node_modules/,
                        },
                        styles: {
                            name:    'styles',
                            test:    /\.s?css$/,
                            chunks:  'all',
                            enforce: true,
                        },
                    },
                },
            },
            module: {
                rules: [
                    {
                        test:    /\.scss$/,
                        include: [sourcePath, /node_modules/],
                        use:     [
                            { loader: MiniCssExtractPlugin.loader },
                            {
                                loader:  'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[path][name]__[local]',
                                    },
                                },
                            },
                            'sass-loader'
                        ],
                    },
                    {
                        test:    /\.css$/,
                        include: [sourcePath, /node_modules/],
                        use:     [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            {
                                loader:  'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            }
                        ],
                    }
                ],
            },
            plugins: [
                new CleanWebpackPlugin(),
                new MiniCssExtractPlugin({
                    filename: 'mt.[name].css',
                })
            ],
        },
        { devtool: 'source-map' }
    );

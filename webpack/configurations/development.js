// Presets
import { sourcePath, publicPath } from '../paths';
import { generateCommonConfiguration } from './common';

// Instruments
import merge from 'webpack-merge';

// Plugins
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export const generateDevelopmentConfiguration = () => {
    const path = require('path');

    return merge(
        generateCommonConfiguration(),
        {
            mode:   'development',
            output: {
                publicPath: '/',
            },
            resolve: {
                alias: {
                    'react-dom': '@hot-loader/react-dom',
                },
            },
            devServer: {
                hot:                true,
                historyApiFallback: true,
                host:               '0.0.0.0',
                overlay:            true,
                port:               3001,
                stats:              'errors-only',
                useLocalIp:         true,
                proxy:              [
                    {
                        context:      ['/api'],
                        target:       'http://localhost:3000',
                        changeOrigin: true,
                    }
                ],
            },
            module: {
                rules: [
                    {
                        test:    /\.css$/,
                        include: [sourcePath, /node_modules/],
                        use:     [
                            'style-loader',
                            {
                                loader:  'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            }
                        ],
                    },
                    {
                        test:    /\.scss$/,
                        include: [sourcePath, /node_modules/],
                        use:     [
                            'style-loader',
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
                    }
                ],
            },
            plugins: [
                new HotModuleReplacementPlugin(),
                new HtmlWebpackPlugin({
                    inject:   true,
                    template: path.join(publicPath, 'index.html'),
                })
            ],
        },
        { devtool: 'cheap-module-eval-source-map' }
    );
};

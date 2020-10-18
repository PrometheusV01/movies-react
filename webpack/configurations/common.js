// Presets
import { sourcePath, buildPath } from '../paths';

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin } from 'webpack';

export const generateCommonConfiguration = () => {
    const { BUILD_ENV } = process.env;

    return {
        entry: {
            mt: ['whatwg-fetch', sourcePath],
        },
        output: {
            path:          buildPath,
            filename:      '[name].index.js',
            chunkFilename: '[name].[chunkhash].bundle.js',
        },
        resolve: {
            extensions: [
                '.mjs',
                '.js',
                '.jsx',
                '.json',
                '.css',
                '.scss',
                '.m.css',
                '.png',
                '.jpg'
            ],
            modules: [sourcePath, 'node_modules'],
        },
        module: {
            rules: [
                {
                    test:    /\.m?js|jsx$/,
                    include: sourcePath,
                    use:     'babel-loader',
                },
                {
                    test:    [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    include: [sourcePath, /node_modules/],
                    use:     {
                        loader:  'url-loader',
                        options: {
                            limit: 10000,
                            name:  'static/images/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test:    /\.eot|ttf|woff2?(\?v=\d+\.\d+\.\d+)?$/,
                    include: [sourcePath, /node_modules/],
                    use:     {
                        loader:  'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:5].[ext]',
                        },
                    },
                },
                {
                    test:    /\.html$/,
                    include: [sourcePath, /node_modules/],
                    use:     'raw-loader',
                },
                {
                    test: /\.svg$/,
                    use:  {
                        loader:  'svg-inline-loader',
                        options: {
                            classPrefix: true,
                        },
                    },
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
            new DefinePlugin({
                __DEV__:  BUILD_ENV === 'development',
                __PROD__: BUILD_ENV === 'production',
            })
        ],
    };
};

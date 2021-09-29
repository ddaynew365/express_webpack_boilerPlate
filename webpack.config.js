const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development", // 개발자 모드
    devtool: "source-map",
    entry: {
        index: ["@babel/polyfill", "./src/javascripts/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"), // __dirname은 현재 디렉토리 path를 의미
        filename: '[name].js'
    },
    module: {
        rules: [ // test는 파일 이름 조건 검출 use는 로더 사용(공식문서 참조)
            {
                test: /\.js/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 가져온 css를 웹페이지에 주입하는 녀석
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },// css 파일 읽어와서 webpack으로 가져오는 녀석(뒤에서부터 사용됨)
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './index.html'}), new MiniCssExtractPlugin({filename: 'header.css'})]
}
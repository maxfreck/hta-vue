'use strict'
module.exports = (env) => {
	const isProd = env.prod;
	console.log("Building for `%s` env", isProd ? "prod" : "dev");

	const { VueLoaderPlugin } = require('vue-loader');
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

	const APP_DIR = path.resolve(__dirname, './src');
	const BUILD_DIR = (isProd)
		? path.resolve(__dirname, './built/prod')
		: path.resolve(__dirname, './built/dev')

	const templateVariables = {
		id: "VueHta",
		title: "Vue.js HTA template",
		version: "0.1.0"
	}
	
	return {
		entry: {
			main: APP_DIR + '/main.js'
		},
		output: {
			path: BUILD_DIR,
			publicPath: '..',
			filename: '.app/app.js'
		},
		target: ['web','es5'],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(lit-html|lit-element))/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								 ['@babel/preset-env', {
									  targets: {
											"ie": "11"
									  }
								 }]
							]
					  }
					}
				},
				{
					test: /\.vue$/, use: 'vue-loader'
				},
				{
					test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]
				},
				{
					test: /\.ico$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '.app/'
						}
					}]
				},
				{
					test: /\.png$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '.app/'
						}
					}]
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '.app/'
						}
					}]
				}
	
			]
		},

		optimization: {
			minimizer: [
				`...`,
				new CssMinimizerPlugin(),
			],
			minimize: isProd,
		},

		plugins: [
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: '.app/app.css'
			}),
			new HtmlWebpackPlugin({
				vars: templateVariables,
				filename: '.app/app.html',
				template: './src/.app/app.html'
			}),
			new HtmlWebpackPlugin({
				vars: templateVariables,
				filename: 'run.hta',
				template: './src/stub.hta',
				inject: false
			})
		]
	}
}
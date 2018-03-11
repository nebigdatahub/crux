const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'./src/index.js',
	],
	output: {
		path: __dirname + '../dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
				})),
				exclude: /node_modules/
			},
			{
				test: /\.(jpg|png|gif|ico)$/,
				use: ['file-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(gql|graphql)$/,
				use: 'graphql-tag/loader',
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
		new ExtractTextPlugin({
			filename: 'style.css'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, '..', 'public'),
		hot: true,
		port: 3000,
		historyApiFallback: true
	}
}
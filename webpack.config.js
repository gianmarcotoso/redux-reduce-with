//@ts-check

const path = require('path')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProduction ? 'production' : 'development',
	entry: {
		index: path.join(__dirname, 'src', 'index.ts')
	},
	target: 'node',
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		library: 'redux-reduce-with',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	externals: {
		redux: 'redux'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	devtool: !isProduction ? 'eval-source-map' : ''
}

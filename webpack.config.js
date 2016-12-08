var webpack = require('webpack');
var path = require('path');

var dirs = {
	"distribution": path.resolve(__dirname, 'distribution'),
	"source": path.resolve(__dirname, 'source')
}

var config = {
	entry: dirs.source + '/components/index.jsx',
	output: {
		path: dirs.distribution,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: dirs.source,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
}

module.exports = config;
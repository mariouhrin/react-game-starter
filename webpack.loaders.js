module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: "babel-loader"
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1'],
    exclude: ['node_modules']
  },
	{
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
			'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
			//'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
			'image-webpack-loader?{gifsicle: {interlaced: true}, optipng: {optimizationLevel: 7}, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
    ]
  }

];

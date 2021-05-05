module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		if (!isServer) {
			config.node = {
				fs : 'empty',
				net :'empty',
			}
		}
    config.watchOptions = {
      ignored: /node_modules/
    }
		return config
	},
}

import path from 'path'

module.exports = {
	root: 'src',
	resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
	build: {
		outDir: '../dist'
	}
}
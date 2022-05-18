import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

export default defineConfig({
	root: 'src',
	build: {
		outDir: '../dist'
	},
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [glsl()],
})
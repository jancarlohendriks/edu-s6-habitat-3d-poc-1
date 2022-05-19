import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { resolve } from 'pathe'

export default defineConfig({
	base: '/habitat-3d-poc-1/',
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
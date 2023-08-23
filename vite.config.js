import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	root: './src',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		lib: {
			name: 'weakenIt',
			entry: resolve('./src/main.js'),
			fileName: format => `weakenIt.${format}.js`,
		},
	},
})

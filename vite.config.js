/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	root: './src',

	test: {
		cache: {
			dir: '../node_modules/.vitest',
		},
		root: './tests',
		globals: true,
	},

	build: {
		outDir: '../dist',
		emptyOutDir: true,
		sourcemap: true,

		lib: {
			entry: resolve('./src/main.js'),
			formats: ['es'],
			name: 'weakenIt',
		},
	},
})

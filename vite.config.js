/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	test: {
		globals: true,
		outputFile: './www/tests/index.html',

		dir: './tests',

		reporters: ['default', 'basic', 'json', 'html'],
		cache: {
			dir: '../node_modules/.vitest',
		},

		coverage: {
			reporter: ['html', 'json', 'text'],
			reportsDirectory: './www/tests/coverage',
			enabled: true, // only prod
			provider: 'v8',
		},
	},

	build: {
		outDir: './dist',
		emptyOutDir: true,
		sourcemap: true,

		lib: {
			entry: resolve('./src/main.js'),
			formats: ['es'],
			name: 'weakenIt',
		},
	},
})

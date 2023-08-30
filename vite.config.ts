/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@lib': resolve(__dirname, './src/lib/index'),
		},
	},

	plugins: [
		dts({
			entryRoot: './src',
			insertTypesEntry: true,
		}),
	],

	build: {
		outDir: './dist',
		emptyOutDir: true,
		sourcemap: true,

		lib: {
			entry: resolve('./src/main.ts'),
			formats: ['es'],
			name: 'weakenIt',
		},
	},

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
})

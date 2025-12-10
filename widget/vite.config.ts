import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'Tourify',
			formats: ['es', 'umd'],
			fileName: (format) => `tourify.${format}.js`,
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {},
			},
		},
		minify: 'esbuild',
		sourcemap: true,
	},
});

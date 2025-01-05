import {defineConfig} from "vite";

export default defineConfig({
    build: {
        minify: false,
        target: 'esnext',
        rollupOptions: {
            input: ['src/contentScript.ts'],
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
});
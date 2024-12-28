import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [BootstrapVueNextResolver()],
        }),
    ],
    server: {
        port: 8080,
        hot: true,
    },
    build: {
        chunkSizeWarningLimit: 1600,
    },
    manifest: true,
    rollupOptions: {
        // overwrite default .html entry
        input: '/src/main.js',
    },
})

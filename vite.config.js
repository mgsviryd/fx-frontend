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
        port: 8081,
        cors: true,
        hot: true,
        proxy: {
            'api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            },
        }
    },
    build: {
        chunkSizeWarningLimit: 1600,
    },
    base: '/',
    // base: '/fx-frontend',
})

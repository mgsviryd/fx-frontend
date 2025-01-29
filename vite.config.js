import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import json5 from 'vite-plugin-json5'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const customEnvFile = process.env.CUSTOM_ENV_FILE || '.env'
const customEnvPath = path.resolve(__dirname, customEnvFile)
dotenv.config({path: customEnvPath})
// console.log(`Using environment file: ${customEnvPath}`)
// console.log('Loaded Environment Variables:', process.env)

// https://vite.dev/config/
export default defineConfig({
    define: {
        // Ensure Vite only uses variables prefixed with "VITE_"
        'process.env': process.env,
    },
    plugins: [
        vue(),
        Components({
            resolvers: [BootstrapVueNextResolver()],
        }),
        json5(),
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
    base: process.env.VITE_BASE || '/',
})

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// clear console after reload
if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        () => console.clear() // comment to disable
    )
}

createApp(App).mount('#app')

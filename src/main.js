import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'


window.jQuery = window.$ = $

// clear console after reload
if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        () => console.clear() // comment to disable
    )
}

const app = createApp(App)
app.use(createBootstrap())
    .mount('#app')

import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import $ from 'jquery'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import store from './store/store.js'
import router from "./router/router.js"


window.jQuery = window.$ = $

// clear console after reload
if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        () => console.clear() // comment to disable
    )
}

router.beforeEach(async (to, from, next) => {
    await store.restored
    if (to.meta.requiresAuth) {
        if (!store.getters.isUserAbsent) {
            next()
        } else {
            // next({path: '/sign/in', query: {redirect: to.path, id: new Date().getMilliseconds()}})
        }
    } else {
        next()
    }
})

const app = createApp(App)
app.use(createBootstrap())
    .use(store)
    .use(router)
    .mount('#app')

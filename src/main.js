import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import $ from 'jquery'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import store from './store/store.js'
import router from './router/router.js'
import {i18n} from './i18n/i18n.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faAngry} from '@fortawesome/free-regular-svg-icons'
import {faVk} from '@fortawesome/free-brands-svg-icons'

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

axios.defaults.baseURL = location.protocol + '//' + location.hostname + ':' + 8080 + '/rest'

library.add(faPenToSquare, faAngry, faVk)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createBootstrap())
    .use(store)
    .use(router)
    .use(i18n)
    .use(VueAxios, axios)
    .mount('#app')

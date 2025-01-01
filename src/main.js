import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import $ from 'jquery'
import router from "./router/router.js"
import store from './store/store.js'
import {i18n} from "./i18n/i18n.js"

// https://codesandbox.io/p/sandbox/highcharts-vue-test-forked-c7pvw?file=%2Fsrc%2Fcomponents%2FStockVue.vue%3A17%2C17
import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts"
import stockInit from "highcharts/modules/stock"
import accessibilityInit from "highcharts/modules/accessibility"
import indicatorsInit from 'highcharts/indicators/indicators'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faAngry} from '@fortawesome/free-regular-svg-icons'
import {faVk} from '@fortawesome/free-brands-svg-icons'

window.jQuery = window.$ = $

if (typeof stockInit === 'function') {
    stockInit(Highcharts)
}
if (typeof accessibilityInit === 'function') {
    accessibilityInit(Highcharts)
}
if (typeof indicatorsInit === 'function') {
    indicatorsInit(Highcharts)
}

library.add(faPenToSquare, faAngry, faVk)


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

// clear console after reload
if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        () => console.clear() // comment to disable
    );
}

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(store)
    .use(i18n)
    .use(createBootstrap())
    .use(HighchartsVue)
    .mount('#app')


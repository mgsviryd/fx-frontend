import {nextTick} from 'vue'
import {createI18n} from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'ru']
export const i18n = createI18n({locale: 'en', legacy: false,})

const loaded = []
let i = 0

setLangAndLoadMessages("en")

export function setLangAndLoadMessages(locale){
    setLang(locale)
    loadMessages(locale)
}

export function setLang(locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html').setAttribute('lang', locale)
}

export async function loadMessages(locale) {
    // load locale messages with dynamic import
    if (loaded.findIndex(l => l === locale) < 0) {
        const messages = await import(
            /* webpackChunkName: "locale-[request]" */ `./locale/${locale}.js`
            )

        // set locale and locale message
        i18n.global.setLocaleMessage(locale, JSON.parse(JSON.stringify(messages.default)))
        loaded[i++] = locale
    }

    return nextTick()
}
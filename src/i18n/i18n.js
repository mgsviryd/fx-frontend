import {createI18n} from 'vue-i18n'
import {capitalize, lowerCase, upperCase} from 'lodash-es'

export const SUPPORT_LOCALES = ['en', 'ru']
export const i18n = createI18n({legacy: false,})

const loaded = []
let i = 0

export async function setLangAndLoadMessagesIfAbsent(locale) {
    await loadMessagesIfAbsent(locale)
    await setLang(locale)
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

export function isLoaded(locale) {
    return loaded.findIndex(l => l === locale) < 0
}

export async function loadMessagesIfAbsent(locale) {
    // load locale messages with dynamic import
    if (isLoaded(locale)) {
        const {default: messages} = await import(`./locale/${locale}.json5`)
        i18n.global.setLocaleMessage(locale, messages)
        loaded[i++] = locale
    }
}

function getCapitalizeLang(key) {
    return capitalize(getLang(key))
}

function getLang(key) {
    return i18n.global.t(key)
}

function getLowerCaseLang(key) {
    return lowerCase(getLang(key))
}

function getUpperCaseLang(key) {
    return upperCase(getLang(key))
}

export {getLang, getCapitalizeLang, getLowerCaseLang, getUpperCaseLang}
import {createI18n} from 'vue-i18n'
import {capitalize, lowerCase, upperCase} from 'lodash-es'
import en_US from './locale/en_US.json5'
import common from './locale/common.json5'


// Default Locale and Supported Locales
export const DEFAULT_LOCALE = 'en_US'
export const SUPPORT_LOCALES = ['en_US', 'ru_RU']
export const DEFAULT_MESSAGES = {en_US: { ...common, ...en_US },}

// Initialize Vue I18n
export const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE, // Set default locale
    missingWarn: true, // Suppress warnings for missing translations set - false
    fallbackWarn: true, // Suppress fallback warnings set - false
    messages: DEFAULT_MESSAGES,
})

// Track Loaded Locales
const loadedLocales = new Set()

// ✅ Load Messages & Set Language
export async function setLangAndLoadMessagesIfAbsent(locale) {
    await loadMessagesIfAbsent(locale)
    await setLang(locale)
}

// ✅ Set Language
export async function setLang(locale) {
    i18n.global.locale.value = locale
    document.querySelector('html').setAttribute('lang', locale)
}

// ✅ Check if Locale is Already Loaded
export function isNotLoaded(locale) {
    return !loadedLocales.has(locale)
}

// ✅ Dynamically Load Messages
export async function loadMessagesIfAbsent(locale) {
    if (isNotLoaded(locale)) {
        try {
            const [commons, messages] = await Promise.all([
                import(`./locale/common.json5`).then(m => m.default),
                import(`./locale/${locale}.json5`).then(m => m.default)
            ])

            if (i18n.global.setLocaleMessage) {
                i18n.global.setLocaleMessage(locale, {...commons, ...messages})
                loadedLocales.add(locale) // Mark locale as loaded
            }
        } catch (error) {
            console.error(`Failed to load messages for locale "${locale}":`, error)
        }
    }
}

// ✅ Helper Functions
export function getCapitalizeLang(key) {
    return capitalize(getLang(key))
}

export function getLang(key) {
    return i18n.global.t(key)
}

export function getLowerCaseLang(key) {
    return lowerCase(getLang(key))
}

export function getUpperCaseLang(key) {
    return upperCase(getLang(key))
}
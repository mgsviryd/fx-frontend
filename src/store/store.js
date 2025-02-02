import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'
import {setLangAndLoadMessagesIfAbsent} from '../i18n/i18n.js'
import helloWorld from '../http/rest/hello-world.js'
import createMutationsSharer from 'vuex-shared-mutations'
import {stringify, parse} from 'flatted'

// For always saving state even between reload page or reopen browser ('even reload' state)
const persist = new VuexPersistence(
    {
        key: 'root',
        storage: {
            async getItem(key) {
                const data = await localforage.getItem(key)
                return data ? parse(data) : null
            },
            async setItem(key, value) {
                return await localforage.setItem(key, stringify(value))
            },
            async removeItem(key) {
                return await localforage.removeItem(key)
            },
        },
        asyncStorage: true,
        reducer: (state) => (
            // state we want to save
            {
                lang: state.lang,
                count: state.count,
            }
        )
    }
)

const store = createStore({
    plugins: [
        persist.plugin,
        // For sync state between pages through sync mutations
        createMutationsSharer({
            predicate: (mutation, state) => {
                const predicate = ["increment",] // mutations for sync
                return predicate.indexOf(mutation.type) >= 0
            }
        })
    ],
    state() {
        return {
            // 'even reload' state
            lang: "en_US",
            count: 0,

            // 'till reload' state
            user: null,
            todos: [
                {id: 1, text: '...', done: true},
                {id: 2, text: '...', done: false}
            ],
            someObjFromServer: {},
        }
    },
    getters: {
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        },
        isUserAbsent: (state) => {
            return !state.user
        },
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setLang(state, {lang}) {
            state.lang = lang
        },
        saveSomeObjFromServer(state, {data}) {
            state.someObjFromServer = data
        },
    },
    actions: {
        async loadI18nLang({commit, state}) {
            await setLangAndLoadMessagesIfAbsent(state.lang)
        },
        async setI18nLang({commit}, {lang}) {
            await setLangAndLoadMessagesIfAbsent(lang)
            commit('setLang', {lang: lang})
        },
        async loadSomeObjFromServer({commit}, p) {
            const result = await helloWorld.get()
            console.info(result)
            if (result.status === 200) {
                commit('saveSomeObjFromServer', {
                    data: result.data,
                })
            }
        },
    },
})

export default store
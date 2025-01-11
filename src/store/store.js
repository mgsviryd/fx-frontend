import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

const persist = new VuexPersistence(
    {
        key: 'root',
        storage: localforage,
        asyncStorage: true,
        reducer: (state) => (
            {
                lang: state.lang,
                count: state.count,
            }
        )
    }
)

const store = createStore({
    plugins: [
        persist.plugin, // can be timing problem with loading page
    ],
    state() {
        return {
            lang: "en",
            count: 0,
            user: null,
            todos: [
                {id: 1, text: '...', done: true},
                {id: 2, text: '...', done: false}
            ],
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
    },
    getters: {
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        },
        isUserAbsent: (state)=>{
            return !state.user
        },
    },
})

export default store
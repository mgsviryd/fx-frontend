import rest from '../rest.js'

const base = '/hello-world'

export default {
    get() {
        return rest.get(base)
    },
}

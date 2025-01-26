import rest from '../rest.js'

const base = '/hello-world'
const applicationJsonConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

export default {
    get() {
        return rest.get(
            base,
            applicationJsonConfig,
        )
    },
}

<template>
  <div
      :id="ids.id"
      class="d-flex align-items-center min-vh-100"
  >
    <div class="container">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img alt="Vite logo" class="logo" src="/vite.svg"/>
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img alt="Vue logo" class="logo vue" src="../assets/vue.svg"/>
        </a>
      </div>

      <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-warning"/>
      <font-awesome-icon :icon="['far', 'angry']" class="text-danger"/>
      <font-awesome-icon :icon="['fab', 'vk']" class="text-primary"/>
      <h1>{{ getLang('helloWorldMessage') }}</h1>
      <h1>{{ 'Vite + Vue' }}</h1>

      <div class="card">
        <BButton variant="outline-primary" @click="count++">count is {{ count }}</BButton>
        <p>
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
      </div>

      <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
            href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
            target="_blank"
        >Vue Docs Scaling up Guide</a
        >.
      </p>
      <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {mapGetters, mapState} from "vuex"
import _capitalize from "lodash/capitalize.js"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

export default {
  props: [],
  components: {
    FontAwesomeIcon,
  },
  async mounted() {
    await this.fetchData()
  },

  computed: {
    ...mapState([]),
    ...mapGetters([]),
    prefix() {
      return this.name + '-'
    },
    ids() {
      return {
        id: this.prefix,
      }
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.setTitle(to)
      },
      immediate: true,
    },
  },
  data() {
    return {
      name: 'Chart',
      count: ref(0),
    }
  },
  methods: {
    fetchData() {

    },
    setTitle(to) {
      document.title = this.getCapitalizeLang(to.meta.title) || this.getCapitalizeLang('defaultTitle')
    },
    getLang(key) {
      return this.$t(key)
    },
    getCapitalizeLang(key) {
      return _capitalize(this.getLang(key))
    },
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

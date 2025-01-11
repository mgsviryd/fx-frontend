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

      <BRow>{{'Hello world'}}</BRow>
      <h1>{{ msg}}</h1>

      <div class="card">
        <BButton variant="outline-primary" @click="incrementCount">count is {{ count }}</BButton>
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
import {mapGetters, mapState} from "vuex"

export default {
  props: {
    msg:String,
  },
  components: {
  },
  async mounted() {
    await this.fetchData()
  },

  computed: {
    ...mapState([
        "count",
    ]),
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
      name: 'HelloWorld',
    }
  },
  methods: {
    fetchData() {

    },
    incrementCount() {
      this.$store.commit('increment')
    },
    setTitle(to) {
      document.title = (to.meta.title)
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

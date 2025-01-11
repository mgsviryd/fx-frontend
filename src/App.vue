<template>
  <router-view></router-view>
</template>

<script>

import {mapGetters, mapState} from "vuex"
import store from "./store/store.js"

export default {
  props: [],
  components: {},
  async mounted() {
    await this.fetchData()
    await store.restored
  },

  computed: {
    ...mapState([
      'lang',
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
  watch: {},
  data() {
    return {
      name: 'App',
    }
  },
  methods: {
    fetchData() {

    },
    getLang(key) {
      return this.$t(key)
    },

  }

}
</script>

<style scoped>

</style>

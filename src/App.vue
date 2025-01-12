<template>
  <router-view v-if="show.router"></router-view>
</template>

<script>

import {mapGetters, mapState} from "vuex"

export default {
  props: [],
  components: {},
  async mounted() {
    await this.fetchData()
  },
  async created() {
    this.show.router = false // not load vue view before below
    await this.$store.restored // restore all data before load vue view
    await this.$store.dispatch('loadI18nLang')
    this.show.router = true
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
      show: {
        router: false,
      },
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

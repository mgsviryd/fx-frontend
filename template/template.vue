<template>
  <div :id="ids.id" class="">

  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {capitalize} from 'lodash-es'

export default {
  props: {},
  components: {},
  async created() {
    await this.fetchData()
  },
  computed: {
    ...mapState([
      'lang',
    ]),
    ...mapGetters([

    ]),
    prefix() {
      return this.id + '-' + this.name + '-'
    },
    ids() {
      return {
        id: this.prefix,
      }
    },
  },
  watch: {
    '#[[$]]#route': {
      handler(to, from) {
        this.fetchData()
      },
      immediate: true,
    },
  },
  data() {
    return {
      name: "${COMPONENT_NAME}",
    }
  },
  methods: {
    fetchData() {

    },
    getCapitalizeLang(key) {
      return _.capitalize(this.getLang(key))
    },
    getLang(key) {
      return this.#[[$]]#t(key)
    },
  }
}
</script>

<style scoped>

</style>
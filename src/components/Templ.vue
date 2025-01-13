<template>
  <div :id="ids.id" class="">

  </div>
</template>

<script>
export default {
  props: {},
  async created() {
    await this.fetchData()
  },
  computed: {
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
    '$route': {
      handler(to, from) {
        this.fetchData()
      },
      immediate: true,
    },
  },
  data() {
    return {
      name: 'Templ',
    }
  },
  methods: {
    fetchData() {

    },

  }
}
</script>

<style scoped>

</style>
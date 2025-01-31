<template>
  <div
      :id="ids.id"
      class="d-flex align-items-center min-vh-100"
  >
    <div class="container">
      <highcharts
          :constructor-type="'stockChart'"
          :options="stockOptions"
      ></highcharts>
    </div>
  </div>
</template>


<script>

import {mapGetters, mapState} from 'vuex'
import {Chart} from 'highcharts-vue'
import {data} from '../data/stock.js'
import {getCapitalizeLang, getLang} from '../i18n/i18n.js'

export default {
  props: [],
  components: {
    highcharts: Chart,
  },
  async created() {
    await this.fetchData()
  },
  mounted() {
  },

  computed: {
    ...mapState([
      'count',
    ]),
    ...mapGetters([
      'getTodoById',
    ]),
    prefix() {
      return this.name + '-'
    },
    ids() {
      return {
        id: this.prefix,
      }
    },
    stockOptions() {
      return {
        rangeSelector: {
          selected: 1,
        },

        title: {
          text: "AAPL Historical",
        },

        yAxis: [
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "OHLC",
            },
            height: "60%",
            lineWidth: 2,
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "Volume",
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
          },
        ],

        tooltip: {
          split: true,
          shared: true,
          formatter() {
            return `
              open: ${this.points[0].point.open}<br>
              close: ${this.points[0].point.close}<br>
            `;
          },
        },

        series: [
          {
            id: 'AAPL',
            type: "candlestick",
            name: "AAPL",
            data: this.ohlc,
            dataGrouping: {
              units: this.groupingUnits,
            },
          },
          {
            type: "column",
            name: "Volume",
            data: this.volume,
            yAxis: 1,
            dataGrouping: {
              units: this.groupingUnits,
            },
          },
          {
            type: 'ema',
            linkedTo: 'AAPL',
            params: {
              period: 50
            }
          },
        ],
      };
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
      ohlc: [],
      volume: [],
      groupingUnits: [],
      dataToReturn: 123,
    }
  },
  methods: {
    fetchData() {
      this.formatStockData(data)
    },
    setTitle(to) {
      document.title = this.getCapitalizeLang(to.meta.title) || this.getCapitalizeLang('defaultTitle')
    },
    formatStockData(data) {
      // split the data set into ohlc and volume
      let ohlc = [],
          volume = [],
          dataLength = data.length,
          // set the allowed units for data grouping
          groupingUnits = [
            [
              "week", // unit name
              [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
          ],
          i = 0

      for (i; i < dataLength; i += 1) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volume.push([
          data[i][0], // the date
          data[i][5], // the volume
        ])
      }

      this.ohlc = ohlc
      this.volume = volume
      this.groupingUnits = groupingUnits
    },

    getLang(key) {
      return getLang(key)
    },
    getCapitalizeLang(key) {
      return getCapitalizeLang(key)
    },

  }
}
</script>

<style scoped>

</style>
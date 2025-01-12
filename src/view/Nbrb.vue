<template>
  <div
      :id="ids.id"
      class="d-flex align-items-center min-vh-100"
  >
    <div class="container">
      <div class="container mt-3">
        <div class="form-group row mb-3">
          <label class="col-2 col-form-label" for="currency">
            Валюта
          </label>
          <div class="col-6">
            <select id="currency" v-model="currency" class="w-100 p-1" name="currency">
              <option value="">
                Выберите валюту
              </option>
            </select>
          </div>
        </div>


        <div class="form-group row mb-1">
          <label class="col-2 col-form-label" for="dateFrom">
            Дата от
          </label>
          <div class="col-6">
            <input id="dateFrom" v-model="dateFrom" :max="dateNow.toISOString().split('T')[0]"
                   :min="dateLastYear.toISOString().split('T')[0]" class="w-100 p-1"
                   name="dateFrom" type="date">
          </div>
        </div>

        <div class="form-group row mb-1">
          <label class="col-2 col-form-label" for="dateTo">
            Дата до
          </label>
          <div class="col-6">
            <input id="dateTo" v-model="dateTo" :max="dateNow.toISOString().split('T')[0]"
                   :min="dateLastYear.toISOString().split('T')[0]" class="w-100 p-1"
                   name="dateTo" type="date">
          </div>
        </div>

        <div class="form-group row mb-2">
          <div class="col-2"></div>
          <div class="col-6 d-flex justify-content-end">
            <button id="submitButton" class="btn btn-success " type="button" @click="clickSubmit($event)">
              Выполнить
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <canvas id="myChart" class="w-100"></canvas>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters, mapState} from 'vuex'
import _capitalize from 'lodash/capitalize'
import {Chart} from 'chart.js'

export default {
  props: {},
  components: {},
  async created(){
    await this.fetchData()
  },
  mounted() {

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
    dateNow() {
      return new Date()
    },
    dateLastYear() {
      const dateLastYear = new Date()
      dateLastYear.setFullYear(dateLastYear.getFullYear() - 1)
      return dateLastYear
    }
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
      name: 'Nbrb',
      currencies: [],
      chart: null,
      currency: null,
      dateFrom: null,
      dateTo: null,
    }
  },
  methods: {
    fetchData() {
      this.getDataAndBuildOptions()
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

    clickSubmit(e) {
      if (!this.currency || !this.dateFrom || !this.dateTo) {
        e.preventDefault()
      } else {
        this.drawChart()
      }
    },

    getDataAndBuildOptions() {
      const self = this
      $.getJSON('https://api.nbrb.by/exrates/currencies')
          .done(function (data) {
            if (data) {
              self.currencies = data
              self.currencies = self.updateCurrenciesFromTo(data)
              self.buildOptions()
            }
          }).fail(function (data) {
        console.log('Error occurred with ' + 'https://api.nbrb.by/exrates/currencies')
      })
    },

    updateCurrenciesFromTo(currencies) {
      const realRequests = this.getRequests(currencies, this.dateLastYear, this.dateNow, false)
      const realIds = realRequests.map(r => r.cur_id)
      currencies = this.currencies.filter(c => realIds.findIndex(e => e === c.Cur_ID) >= 0)
      return currencies
    },

    buildOptions() {
      const currencyMap = new Map()
      this.currencies.forEach((c) => currencyMap.set(
          c.Cur_ParentID,
          {
            parentId: c.Cur_ParentID,
            abbr: c.Cur_Abbreviation,
            name: c.Cur_Name
          }))
      const currencyElem = document.getElementById('currency')
      const options = Array.from(currencyMap.values()).sort((a, b) => a['abbr'].localeCompare(b['abbr']))
      options.forEach(opt => {
        const elem = document.createElement('option')
        elem.value = opt.parentId
        elem.text = opt.abbr + ' (' + opt.name + ')'
        currencyElem.appendChild(elem)
      })
    },

    async drawChart() {
      this.destroyChart()
      const parentId = Number(this.currency)
      const selected = this.getCurrenciesByParentId(parentId)
      const requests = this.getRequests(selected, new Date(this.dateFrom), new Date(this.dateTo), true)
      const allData = await Promise.all(requests.map(async (r) => {
        const data = await fetch(`https://api.nbrb.by/exrates/rates/dynamics/${r.cur_id}?startdate=${r.startdate.toDateString()}&enddate=${r.enddate.toDateString()}`)
            .then(response => response.json())
        return {Cur_ID: r.cur_id, data}
      }));

      // 5. Объединяем и сортируем данные
      const mergedData = allData.reduce((acc, curr) => acc.concat(curr.data), [])
      mergedData.sort((a, b) => this.compareDateISOStringNatural(a.Date, b.Date))

      // 6. Создаем график
      const dates = mergedData.map(i => new Date(i.Date).toISOString().split("T")[0])
      const rates = mergedData.map(i => i.Cur_OfficialRate)
      this.chart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: rates
          }]
        },
        options: {
          responsive: true,
          legend: {display: false},
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'dd MMM yyyy'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },

    destroyChart() {
      if (!!this.chart) {
        this.chart.destroy()
      }
    },

    getCurrenciesByParentId(parentId) {
      return this.currencies.filter(c => c.Cur_ParentID === parentId)
    },

    getRequests(currencies, start, end, isOnce) {
      let requests = []
      for (let i = 0; i < currencies.length; i++) {
        const c = currencies[i]
        const startC = new Date(c.Cur_DateStart)
        const endC = new Date(c.Cur_DateEnd)
        if (startC < start && endC < start) {
          continue
        }
        if (startC > end && endC > end) {
          continue
        }
        if (startC <= start && end <= endC) {
          if (isOnce) {
            requests = [{cur_id: c.Cur_ID, startdate: start, enddate: end}]
            break;
          } else {
            requests.push({cur_id: c.Cur_ID, startdate: start, enddate: end})
            continue
          }
        }
        if (start < startC && endC < end) {
          requests.push({cur_id: c.Cur_ID, startdate: startC, enddate: endC})
          continue
        }
        if (startC <= start && start <= endC) {
          requests.push({cur_id: c.Cur_ID, startdate: start, enddate: endC})
          continue
        }
        if (startC <= end && end <= endC) {
          requests.push({cur_id: c.Cur_ID, startdate: startC, enddate: end})
        }
      }
      return requests
    },

    compareDateNatural(a, b) {
      return (a > b) - (a < b)
    },

    compareDateISOStringNatural(a, b) {
      return this.compareDateNatural(new Date(a), new Date(b))
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

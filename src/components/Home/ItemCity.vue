<template>
  <li class="itemCity">
    <div class="itemCity__main">
      <div class="itemCity__left">
        <span class="itemCity__title">{{ item.name }}</span>
        <span class="itemCity__weather">{{ itemWeather.description }}</span>
        <span>Wind: {{ itemWind.speed }} m/s</span>
      </div>
      <div class="itemCity__temp-status">
        <span class="itemCity__temp">
          <img class="itemCity__temp-icon" :src="`https://openweathermap.org/img/wn/${itemWeather.icon}@2x.png`" alt="">
          {{ Math.round(itemTemp.temp) }}°C
        </span>
        <div class="itemCity__temp-after">
          <span class="itemCity__temp-min">{{ Math.round(itemTemp.temp_min) }}°C</span> /
          <span class="itemCity__temp-max">{{ Math.round(itemTemp.temp_max) }}°C</span>
        </div>
      </div>
    </div>
  </li>
  <!--  <Teleport to="#teleport-target" v-if="isShowError">{{ itemDataError }}</Teleport>-->
</template>

<script>
import {defineComponent} from 'vue'
import axios from 'axios'
import {API_BASE_URL, API_KEY} from '@/config'

export default defineComponent({
  name: 'ItemCity',
  props: {
    itemOb: Object
  },
  data() {
    return {
      itemData: null,
      itemDataError: null,
      isShowError: false
    }
  },
  computed: {
    item() {
      return this.itemData ? this.itemData : ''
    },
    itemTemp() {
      return this.itemData ? this.itemData.main : ''
    },
    itemWeather() {
      return this.itemData ? this.item.weather[0] : ''
    },
    itemWind() {
      return this.itemData ? this.item.wind : ''
    }
  },
  methods: {
    async getWeather() {
      axios.get(`${API_BASE_URL}?q=${this.itemOb.city}&lang=en&units=metric&appid=${API_KEY}`)
          .then((res) => {
            this.itemData = res.data
            localStorage.setItem('city', JSON.stringify(this.$store.state.dataCity))
          })
    },
  },
  created() {
    this.getWeather()
  }
})
</script>

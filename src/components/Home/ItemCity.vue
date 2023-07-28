<template>
  <li class="itemCity" v-if="itemData != null">
    <div class="itemCity__header">
      <button @click.prevent="showFullFunction" class="itemCity__burger">
        <img src="@/assets/image/burger.svg" class="itemCity__burger-img" alt="Delete">
      </button>
      <button @click.prevent="deleteCart()" class="itemCity__delete" title="delete">
        <img src="@/assets/image/delete.svg" class="itemCity__delete-img" alt="Delete">
      </button>
    </div>
    <div class="itemCity__main">
      <div class="itemCity__left">
        <span class="itemCity__title">{{ item.name }}</span>
        <span class="itemCity__weather" v-show="showFull" >{{ itemWeather.description }}</span>
        <span v-show="showFull">Wind: {{ itemWind.speed }} m/s</span>
      </div>
      <div class="itemCity__temp-status">
        <span class="itemCity__temp">
          <img class="itemCity__temp-icon" :src="`https://openweathermap.org/img/wn/${itemWeather.icon}@2x.png`" alt="">
          {{ Math.round(itemTemp.temp) }}°C
        </span>
        <div class="itemCity__temp-after" v-show="showFull">
          <span class="itemCity__temp-min">{{ Math.round(itemTemp.temp_min) }}°C</span> /
          <span class="itemCity__temp-max">{{ Math.round(itemTemp.temp_max) }}°C</span>
        </div>
      </div>
    </div>
  </li>
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
      showFull: true,
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
    deleteCart() {
      this.$store.state.dataCity.splice(this.indexOb, 1)
      localStorage.setItem('city', JSON.stringify(this.$store.state.dataCity))
    },
    showFullFunction() {
      this.showFull = !this.showFull
    }
  },
  created() {
    this.getWeather()
  }
})
</script>

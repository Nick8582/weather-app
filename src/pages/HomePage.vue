<template>
  <div class="home">
    <form class="home__form form" @submit.prevent="addDateCity">
      <h2 class="form__title">What will we find?</h2>
      <div class="form__search">
        <input class="form__input" type="text" minlength="2" placeholder="City" v-model="cityInput" required/>
        <button class="form__btn" type="submit">Add</button>
      </div>
      <div v-if="showMessageError" class="form__message">{{ messageError }}</div>
    </form>
    <div class="listCity">
      <ul class="listCity__list">
        <ItemCity :timeout="2000" v-for="(item, index) in items" :key="index" :itemOb="item"/>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ItemCity from "@/components/Home/ItemCity.vue";
import axios from "axios";
import {API_BASE_URL, API_KEY} from "@/config";

export default defineComponent({
  name: 'HomePage',
  components: {ItemCity},
  data() {
    return {
      cityInput: '',
      items: [],
      messageError: '',
      showMessageError: false,
    }
  },
  methods: {
    addDateCity() {
      axios.get(`${API_BASE_URL}?q=${this.cityInput}&lang=en&units=metric&appid=${API_KEY}`).then((res) => {
        this.$store.state.dataCity.push({city: this.cityInput})
        this.cityInput = ''
      }).catch((err) => {
        this.messageError = err.response.data.message;
        this.showMessageError = true;
        setTimeout(()=> {
          this.messageError = '';
          this.showMessageError =false;
        }, 3000)
      })
    },
    itemData() {
      return this.items = this.$store.state.dataCity
    }
  },
  created() {
    if (localStorage.getItem('city')) {
      this.$store.state.dataCity = JSON.parse(localStorage.getItem('city')!)
    }
    this.itemData()
  }
})
</script>

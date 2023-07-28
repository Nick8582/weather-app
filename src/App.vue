<template>
  <TheHeader />
  <main class="container">
    <router-view/>
  </main>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader'
import {defineComponent} from "vue";

export default defineComponent({
  components: { TheHeader }
})
</script>

<template>
  <TheHeader />
  <router-view/>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader'
export default {
  components: { TheHeader }
}
</script>

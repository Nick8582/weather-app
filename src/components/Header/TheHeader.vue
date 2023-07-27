<template>
  <header class="header container">
    <router-link to="/" class="header__logo">WeatherApp</router-link>
    <nav class="header__nav nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/" class="nav__link">Home</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/doc" class="nav__link">Documentation</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'TheHeader'
}
</script>

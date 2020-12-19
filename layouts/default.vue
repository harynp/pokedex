<template>
  <v-app v-bind:style="{ 'background-image': 'url(' + backgroundImg + ')' }">
    <v-main >
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Pokemon from '../assets/images/pokemon.jpg';
export default {
  data () {
    return {
      backgroundImg: Pokemon,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="css">
.container {
  background: cornsilk;
}
</style>

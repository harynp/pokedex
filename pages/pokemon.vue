<template lang="html">
  <div>
    {{ getDetailPokemon }}
  </div>
</template>


<script>
export default {
  computed: {
    getDetailPokemon() {
      return this.$store.getters['pokemon/getPokemonDetail'];
    }
  }
}
</script>

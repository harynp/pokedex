<template>
  <v-col>
    <div>POKEDEX</div>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search Pokemon"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pokemonList"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      @click:row="handleClick"
    ></v-data-table>
  </v-col >
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data() {
    return {
      pokemonList: [],
      search: '',
      headers: [
        {
          text: 'Database Pokemon :',
          align: 'start',
          sortable: false,
          value: 'name',
        }
      ]
    }
  },  
  components: {
    Logo,
    VuetifyLogo
  },
  created() {
    this.getPokemonList();
  },
  methods: {
    handleClick(pokemon) {
      this.getPokemonDetail(pokemon)
    },
    async getPokemonDetail(pokemon) {
      try {
        const response = await this.$store.dispatch('pokemon/getPokemonDetails', pokemon);
        if (response.status === 200) {
          this.$router.push(`pokemon/#${pokemon.name}`);
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getPokemonList() {
      try {
        const response = await this.$store.dispatch('pokemon/getPokemonName');
        if (response) {
          this.pokemonList = response.results;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

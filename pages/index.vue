<template>
  <div>
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
    
    </v-col>
    <v-col>PREDICTION POKEMON FIGHT</v-col>
    <v-row>
      <div style="width: 45%">
        <v-text-field
          v-model="search"
          label="Pokemon A"
          single-line
          hide-details
          solo
        ></v-text-field>
      </div>
      <div style="width: 10%; display: flex; flex-direction: row; justify-content: center;align-items: center;"> VS </div>
      <div style="width: 45%">
        <v-text-field
          v-model="search"
          label="Pokemon B"
          single-line
          hide-details
          solo
        ></v-text-field>
      </div>
    </v-row>
  </div>
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
      this.goPokemonDetail(pokemon)
    },
    async goPokemonDetail(pokemon) {
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

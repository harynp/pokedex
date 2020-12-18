<template lang="html">
  <v-row>
      <v-col cols="12">
          <v-card>
            <v-img
              :src="imagesUrl"
              height="300"
              contain
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title">
              <div>
                <div>Name: {{ getDetailPokemon.name }} </div>
                <div>
                  Ability : 
                <div v-for="(list,idx) in getDetailPokemon.abilities">
                  - {{ list.ability.name }}
                </div>
                </div>
                <div>
                  Types : <span v-for="(list,idx) in getDetailPokemon.types"> {{ list.type.name }} </span>
                </div>
                <div>
                  Moves : 
                <div v-for="(list,idx) in getDetailPokemon.moves">
                  - {{ list.move.name }}
                </div>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      imagesUrl: ''
    }
  },
  computed: {
    getDetailPokemon() {
      const { data } = this.$store.getters['pokemon/getPokemonDetail'];
      return data;
    }
  },
  mounted() {
    this.getForm()
  },
  methods: {
    async getForm() {
      try {
        const form = this.getDetailPokemon.forms[0].url;
        const response = await this.$store.dispatch('pokemon/getFormPokemon', form);
        const { data } = response;
        const { sprites } = data;
        this.imagesUrl = sprites.front_default
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

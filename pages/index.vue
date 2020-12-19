<template>
  <div>
    <v-col>
      <div class="title-text">DATABASE POKEMON</div>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Pokemon"
          single-line
          hide-details
          solo
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
    <v-col class="container-compare">
      <v-col class="title-text">PREDICTION POKEMON FIGHT</v-col>
      <v-row>
        <form class="container-vs">
          <input v-model="searchA" class="input-monsters" list="magicHouses" id="myHouse" name="myHouse" placeholder="Pokemon A" />
          <datalist id="magicHouses">
            <option v-for="(list, idx) in pokemonList" :key="idx" :value="list.name"/>
          </datalist>
            <div v-if="checkNull && allMonsters.length">
              Detail : 
              <div v-for="(status,idx) in allMonsters[0].stats" :key="idx">
                <div>{{ status.stat.name }} = {{  status.base_stat }}</div>
              </div>
              <div>Total Kekuatan = {{ sumStrengthA(allMonsters[0].stats) }} {{ }}</div>
              <!-- {{ allMonsters[0].stats }} -->
            </div>
        </form>
        <div class="container-center-vs"> VS </div>
        <form class="container-vs">
          <input v-model="searchB" class="input-monsters" list="magicHouses" id="myHouse" name="myHouse" placeholder="Pokemon B" />
          <datalist id="magicHouses">
            <option v-for="(list, idx) in pokemonList" :key="idx" :value="list.name"/>
          </datalist>
          <div v-if="checkNull && allMonsters.length">
              Detail : 
              <div v-for="(status,idx) in allMonsters[1].stats" :key="idx">
                <div>{{ status.stat.name }} = {{  status.base_stat }}</div>
              </div>
              <div>Total Kekuatan = {{ sumStrengthB(allMonsters[1].stats) }}</div>
            </div>
        </form>
      </v-row>
    </v-col>
    <v-row  v-if="checkNull && allMonsters.length" justify="center">Pemenangnya adalah &nbsp;<span class="result-win">"{{ sumStrengthB > sumStrengthA ? searchB.toUpperCase() : searchA.toUpperCase() }}"</span></v-row>
    <v-row v-if="!checkNull" style="color: red;" justify="center">Salah satu pokemon tidak boleh kosong</v-row>
  
    <v-col class="btn-compare">
      <v-btn 
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="primary"
      @click="goPrediction()">PREDICTION</v-btn>
    </v-col>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
export default {
  data() {
    return {
      loading: false,
      checkNull: true,
      pokemonList: [],
      search: '',
      searchA: '',
      searchB: '',
      allMonsters: [],
      headers: [
        {
          text: 'List Name :',
          align: 'start',
          sortable: false,
          value: 'name',
          color: 'red'
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
  computed: {
  
  },
  methods: {
    sumStrengthA(status) {
      return status.reduce((a, b) => a + b.base_stat,0);
    },
    sumStrengthB(status) {
      return status.reduce((a, b) => a + b.base_stat,0);
    },
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
    },
    async goPrediction() {
      this.loading = true;
      if(this.searchA === '' || this.searchB === '') {
        this.checkNull = false;
      } else {
        this.checkNull = true;
        const monsters = [this.searchA, this.searchB];
        const monsterA =  await this.$store.dispatch('pokemon/getPokemonStatus', this.searchA);
        const monsterB = await this.$store.dispatch('pokemon/getPokemonStatus', this.searchB);
        this.allMonsters = [monsterA, monsterB];
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="css">
.container-compare {
  padding: 10px;
}

.title-text {
  font-size: xx-large;
  margin-left: -10px;
  color: red;
  font-family: fantasy;
}

.container-vs {
  width: 45%
}

.container-center-vs {
  width: 10%; 
  display: flex; 
  flex-direction: row; 
  justify-content: center;
  align-items: center;
  color: red; 
  font-weight: bold;
}

.v-data-table-header {
  background: bisque !important;
}

.btn-compare {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}

.input-monsters {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background:white;
  padding:10px;
}
/* 
CSS INPUTLIST
*/

h1 {
	font-family: "Sacramento", cursive;
	font-size: 3rem;
	color: #fff;
	font-family: "Berkshire Swash", cursive;
}

form {
	display: flex;
	flex-direction: column;
}

form label {
	font-family: "Open Sans", sans-serif;
	font-size: 1.2rem;
	margin-bottom: 12px;
}

form input {
	border: 2px solid lightslategray;
	height: 40px;
	border-radius: 3px;
	padding: 5px;
	font-size: 1rem;
}

form input:focus {
	outline: none;
	border: 2px solid darkslategray;
}

.result-win {
  color: green; 
  font-size: 16px;
  font-weight: bold;
}
</style>

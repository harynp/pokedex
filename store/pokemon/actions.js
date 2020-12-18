import axios from 'axios';
export default {
  async getPokemonName() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0" , {
        headers: { 
          'Access-Control-Allow-Origin' : '*'
        }
      });
      const { data } = response;
      return data;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  },
  async getPokemonDetails(context, payload) {
    try {
      const response = await axios.get(payload.url , { headers: { 
        'Access-Control-Allow-Origin' : '*'
      }});
      context.commit('setDetailPokemon', response);
      return response;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  }
};

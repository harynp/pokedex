export default {
  getPokemonDetail: state => {
    try {
      return JSON.parse(state.detailPokemon);
    } catch (error) {
      return state.detailPokemon;
    }
  },
};

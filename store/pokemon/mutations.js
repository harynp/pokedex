export default {
  setDetailPokemon(state, data) {
    localStorage.setItem('pokemonDetail', JSON.stringify(data));
    state.detailPokemon = data;
    
  }
}
const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__id');
const pokemonImg = document.querySelector('.pokemon__img');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let idSearchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
}
 
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);
  if(data){
    pokemonName.innerHTML = data.name;
    pokemonImg.style.display = 'block';
    pokemonId.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    idSearchPokemon = data.id;
    input.value = '';
  }else{
    pokemonName.innerHTML = 'Not found :C';
    pokemonId.innerHTML = '';
    pokemonImg.style.display = 'none';
  }
}

form.addEventListener('submit', (event) => {

  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
  if(idSearchPokemon > 1){
    idSearchPokemon -= 1;
    renderPokemon(idSearchPokemon);
  }
});

btnNext.addEventListener('click', () => {
  idSearchPokemon += 1;
  renderPokemon(idSearchPokemon);
});

renderPokemon(idSearchPokemon);
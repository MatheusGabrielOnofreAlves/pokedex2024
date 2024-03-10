const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');


const Form = document.querySelector('.form');
const Input = document.querySelector('.input_search');

const ButtonPrev = document.querySelector('.btn-prev');
const ButtonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async(pokemon) =>{

    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
   
}

const rederPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

 const data = await fetchPokemon(pokemon);

if (data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];
    Input.value = '';
    searchPokemon = data.id;
}else {
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
}


}

Form.addEventListener('submit', (event) =>{
    event.preventDefault();
    rederPokemon(Input.value.toLowerCase());
});

ButtonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1){
    searchPokemon -= 1;
    rederPokemon(searchPokemon);
    }
});

ButtonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    rederPokemon(searchPokemon);
  });


rederPokemon(searchPokemon);


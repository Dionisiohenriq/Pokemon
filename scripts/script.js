const searchInput = document.getElementById("pokemon-search");
const searchButton = document.getElementById("search-button");
const pokemonContainer = document.getElementById("pokemon-container");
const url = "https://pokeapi.co/api/v2/pokemon/";

searchButton.addEventListener("click", () => {
	const pokemonName = searchInput.value.toLowerCase();
	if (pokemonName !== "") getPokemonByName(pokemonName);
	else getAllPokemon();
});

function getPokemonByName(pokemonName) {
	return fetch(`${url}/${pokemonName}`)
		.then((response) => response.json())
		.then((data) => {
			const pokemon = data;
			createPokemonDetailedCard(pokemon);
		})
		.catch((error) => {
			console.error("Error:", error);
			pokemonContainer.innerHTML = "Pokémon não encontrado";
		});
}

function getAllPokemon() {
	return fetch(`${url}/?limit=151&offset=0`)
		.then((response) => response.json())
		.then((data) => {
			const pokemons = data;

			if (pokemonContainer.hasChildNodes())
				pokemonContainer.removeChild(pokemonContainer.firstChild);

			for (const pokemon of pokemons.results) {
				fetch(`${url}/${pokemon.name}`)
					.then((data) => data.json())
					.then((results) => {
						const pokemon = results;
						createPokemonCard(pokemon);
					})
					.catch((error) => {
						console.error("Error:", error);
						pokemonContainer.innerHTML = "Pokémon não encontrado";
					});
			}
		})
		.catch((error) => {
			console.error("Error: ", error);
			pokemonContainer.innerHTML = "Pokémon não encontrado";
		});
}

function createPokemonDetailedCard(pokemon) {
	const pokemonDetailCard = document.createElement("div");
	pokemonDetailCard.classList.add("pokemon-detail-card");

	pokemonDetailCard.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types[0].type.name}</p> 
    `;
	pokemonContainer.innerHTML = "";
	pokemonContainer.appendChild(pokemonDetailCard);
}

function createPokemonCard(pokemon) {
	const pokemonCard = document.createElement("div");
	pokemonCard.classList.add("pokemon-card");
	pokemonCard.addEventListener("click", () => {
		getPokemonByName(pokemon.name);
	});

	pokemonCard.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Tipo: ${pokemon.types[0].type.name}</p> 
    `;
	pokemonContainer.appendChild(pokemonCard);
}

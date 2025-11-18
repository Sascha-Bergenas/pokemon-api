const container = document.querySelector(".container");
const spriteImage = document.querySelector("#pokemonSprites");
const spriteShinyImage = document.querySelector("#pokemonShinySprites");
const types = document.querySelector(".types");

async function pokemonApi(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("something went sideways");
    }
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

const renderPokemonTypes = (data) => {
  const typeList = document.createElement("ul");
  typeList.id = "typeList";
  data.types.forEach((item) => {
    const typeListItem = document.createElement("li");
    const typeImg = document.createElement("img");
    // typeListItem.textContent = item.type.name;
    typeList.appendChild(typeListItem);
    const typeNumber = item.type.url.split("/type/").pop().split("/")[0];
    typeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/heartgold-soulsilver/${typeNumber}.png`;
    typeListItem.appendChild(typeImg);
  });
  typeOutput.textContent = "Type:";
  types.appendChild(typeOutput);
  types.appendChild(typeList);
};

const gameApperences = (data) => {
  const apperences = document.querySelector(".apperences");
  apperences.innerHTML = "";
  const apperencesOutput = document.createElement("p");
  apperences.prepend(apperencesOutput);
  apperencesOutput.textContent = "Apperences:";
  const gameList = document.createElement("ul");
  gameList.id = "gameList";

  data.game_indices.forEach((item) => {
    const gameListItem = document.createElement("li");
    gameListItem.textContent = item.version.name;
    gameList.appendChild(gameListItem);
  });
  apperences.appendChild(gameList);
};
const removeOldList = () => {
  const oldList = document.querySelector("#typeList");
  if (oldList) {
    oldList.remove();
  }
};

const pokemonSprites = (data) => {
  const pokemonSprites = data.sprites.other.showdown.front_default;
  const pokemonShinySprites = data.sprites.other.showdown.front_shiny;
  spriteImage.src = pokemonSprites;
  spriteShinyImage.src = pokemonShinySprites;
  spriteImage.style.display = "block";
  spriteShinyImage.style.display = "block";
};

async function randomisePokemon(pokemonData) {
  if (pokemonData.results.length === 0) {
    alert("no pokemon");
  }
  const randomIndex = Math.floor(Math.random() * pokemonData.results.length);
  const pokemon = pokemonData.results[randomIndex];
  console.log(pokemon);
  return pokemon.name;
}

const inputPokemon = document.createElement("input");
inputPokemon.id = "inputen";
const searchButton = document.createElement("button");
const typeOutput = document.createElement("p");
container.prepend(searchButton);
searchButton.textContent = "Find That Pokémon!";
container.prepend(inputPokemon);
const randomButton = document.createElement("button");
randomButton.textContent = "Random!";
container.appendChild(randomButton);

searchButton.addEventListener("click", async () => {
  const pokemonName = document.querySelector("input").value.toLocaleLowerCase();
  removeOldList();
  if (pokemonName === "") return;

  const data = await pokemonApi(pokemonName);
  pokemonSprites(data);
  renderPokemonTypes(data);
  gameApperences(data);
  inputPokemon.value = "";
});

randomButton.addEventListener("click", async () => {
  inputPokemon.value = "";

  removeOldList();
  const data = await pokemonApi("");
  const randomPokemonName = await randomisePokemon(data);
  console.log(randomPokemonName);
  const data2 = await pokemonApi(randomPokemonName);
  console.log(data2);
  pokemonSprites(data2);
  renderPokemonTypes(data2);
  gameApperences(data2);
});

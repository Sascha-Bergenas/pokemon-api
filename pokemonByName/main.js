const container = document.querySelector(".container");
const spriteImage = document.querySelector("#pokemonSprites");
const spriteShinyImage = document.querySelector("#pokemonShinySprites");

async function pokemonApi() {
  const pokemonName = document.querySelector("input").value.toLocaleLowerCase();
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
  container.appendChild(typeOutput);
  container.appendChild(typeList);
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

const inputPokemon = document.createElement("input");
inputPokemon.id = "inputen";
const searchButton = document.createElement("button");
const typeOutput = document.createElement("p");
container.prepend(searchButton);
searchButton.textContent = "Find That Pokémon!";
container.prepend(inputPokemon);

searchButton.addEventListener("click", async () => {
  removeOldList();
  const data = await pokemonApi();
  pokemonSprites(data);
  renderPokemonTypes(data);
  inputPokemon.value = "";
});

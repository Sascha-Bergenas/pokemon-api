const container = document.querySelector(".container");
const sprite = document.querySelector("#pokemonSprite");

async function pokemonApi() {
  const pokemonName = document.querySelector("input").value.toLocaleLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  try {
    removeOldList();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("something went sideways");
    }
    const data = await response.json();
    renderPokemonTypes(data);
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
    typeListItem.textContent = item.type.name;
    typeList.appendChild(typeListItem);
  });

  container.appendChild(typeList);
};
const removeOldList = () => {
  const oldList = document.querySelector("#typeList");
  if (oldList) {
    oldList.remove();
  }
};

const inputPokemon = document.createElement("input");
container.appendChild(inputPokemon);

const searchButton = document.createElement("button");
container.appendChild(searchButton);
searchButton.textContent = "search";
searchButton.addEventListener("click", () => {
  removeOldList();
  pokemonApi();
  inputPokemon.value = "";
});

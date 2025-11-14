const pokemonId = document.getElementById("pokemonId");
const pokemonSprites = document.getElementById("pokemonSprites");
const pokemonNo = document.getElementById("pokemonNo");
const imgElement = document.getElementById("pokemonSprites");
const imgShinyElement = document.getElementById("pokemonShinySprites");
const pokemonName = document.getElementById("pokemonName");
const container = document.querySelector(".pokemonContainer");
const shinyButton = document.createElement("button");
shinyButton.textContent = "☆";
shinyButton.id = "shinyButton";
const btn = document
  .getElementById("btn")
  .addEventListener("click", getPokemonByNumber);

function getPokemonByNumber() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const pokemonId = document.getElementById("pokemonId");

  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId.value, config)
    .then((response) => response.json())
    .then((data) => {
      const pokemonSprites = data.sprites.front_default;
      const pokemonShinySprites = data.sprites.front_shiny;

      imgElement.src = pokemonSprites;
      imgShinyElement.src = pokemonShinySprites;
      imgElement.style.display = "block";

      pokemonName.textContent = data.name;
      pokemonName.style.display = "block";
      pokemonNo.textContent = `#${data.id}`;
      pokemonNo.style.display = "block";
      console.log(data);
      pokemonId.value = "";
      container.appendChild(shinyButton);
    })
    .catch((err) => {
      console.error("Could not find pokémon", err);
    });
}

function toggleShiny() {
  if (imgElement.style.display === "block") {
    imgElement.style.display = "none";
    shinyButton.style.color = "yellow";
  } else {
    imgElement.style.display = "block";
    shinyButton.style.color = "black";
  }
  if (imgShinyElement.style.display === "block") {
    imgShinyElement.style.display = "none";
  } else {
    imgShinyElement.style.display = "block";
  }
}

shinyButton.addEventListener("click", toggleShiny);

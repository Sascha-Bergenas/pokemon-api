const pokemonId = document.getElementById("pokemonId");
const btn = document.getElementById("btn");
const pokemonSprites = document.getElementById("pokemonSprites");
const pokemonNo = document.getElementById("pokemonNo");
const pokemonName = document.getElementById("pokemonName");

function getPokemonByNumber() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const pokemonId = document.getElementById("pokemonId").value;

  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId, config)
    .then((response) => response.json())
    .then((data) => {
      const pokemonSprites = data.sprites.front_default;
      const pokemonName = data.name;
      const pokemonNumber = data.id;

      const imgElement = document.getElementById("pokemonSprites");
      const nameElement = document.getElementById("pokemonName");
      const pokemonNo = document.getElementById("pokemonNo");

      imgElement.src = pokemonSprites;
      imgElement.style.display = "block";

      nameElement.textContent = pokemonName;
      nameElement.style.display = "block";
      pokemonNo.textContent = `#${pokemonNumber}`;
      pokemonNo.style.display = "block";
    })
    .catch((err) => {
      console.error("något gick fel", err);
    });
}

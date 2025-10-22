// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//   .then((response) => response.json())
//   .then((data) => console.log(data.weight))
//   .catch((error) => console.error(error));

async function getPokemonByNumber() {
  try {
    const pokemonId = document.getElementById("pokemonId").value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    if (!response.ok) {
      throw new Error("could not find");
    }
    const data = await response.json();
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
  } catch (error) {
    console.log(error);
  }
}

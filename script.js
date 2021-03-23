function domShowPokemon(pokemonList) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let pokemon of pokemonList) {
    const modelViewer = document.createElement("model-viewer");
    modelViewer.setAttribute("src", pokemon.src);
    modelViewer.setAttribute("srcios", pokemon.srcios);
    modelViewer.setAttribute("srcios", pokemon.srcios);
    modelViewer.setAttribute("camera-controls", "");
    modelViewer.setAttribute("disable-zoom", "");
    modelViewer.setAttribute("ar", "");
    modelViewer.setAttribute("interaction-prompt", "none");
    modelViewer.setAttribute("data-js-focus-visible", "");
    gallery.appendChild(modelViewer);
  }
}

function openForm() {
  document.querySelector(".form-popup").style.display = "block";
}

function closeForm() {
  document.querySelector(".form-popup").style.display = "none";
}

function toggle() {
  let blur = document.querySelector("#blur");
  blur.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  domShowPokemon(pokemonList);

  const searchBar = document.querySelector("#searchBar");
  console.log(searchBar);

  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    const filterdPokemonList = pokemonList.filter((pokemon) => {
      return pokemon.name.includes(searchString);
    });
    domShowPokemon(filterdPokemonList);
  });

  $("#check-pokemon").click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(".container").offset().top,
      },
      2000
    );
  });
});

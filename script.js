function domShowPokemon(pokemonList) {
  let userHave = {};
  if (localStorage.getItem("userHave")) {
    userHave = JSON.parse(localStorage.getItem("userHave"));
  }
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let pokemon of pokemonList) {
    const card = document.createElement("div");
    const button = document.createElement("button");
    const modelViewer = document.createElement("model-viewer");
    modelViewer.setAttribute("src", pokemon.src);
    modelViewer.setAttribute("srcios", pokemon.srcios);
    modelViewer.setAttribute("srcios", pokemon.srcios);
    modelViewer.setAttribute("camera-controls", "");
    modelViewer.setAttribute("disable-zoom", "");
    modelViewer.setAttribute("ar", "");
    modelViewer.setAttribute("interaction-prompt", "none");
    modelViewer.setAttribute("data-js-focus-visible", "");
    if (pokemon.name in userHave && userHave[pokemon.name] === true) {
      modelViewer.classList.add("user-have");
    }
    button.onclick = () => {
      const have = changeHave(pokemon);
      if (have) {
        modelViewer.classList.add("user-have");
      } else {
        modelViewer.classList.remove("user-have");
      }
    };
    card.appendChild(modelViewer);
    card.appendChild(button);
    gallery.appendChild(card);
  }
}

/*
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
*/

function changeHave(pokemon) {
  let userHave = {};
  if (localStorage.getItem("userHave")) {
    userHave = JSON.parse(localStorage.getItem("userHave"));
  }

  let key = pokemon.name;
  if (key in userHave) {
    userHave[key] = !userHave[key];
  } else {
    userHave[key] = true;
  }
  localStorage.setItem("userHave", JSON.stringify(userHave));
  return userHave[key];
}

function myCollection() {
  let myCollectionElement = document.querySelector("#my-collection");
  if (myCollectionElement.innerHTML.includes("My Collection")) {
    let userHave = {};
    if (localStorage.getItem("userHave")) {
      userHave = JSON.parse(localStorage.getItem("userHave"));
    }
    let userCollection = pokemonList.filter((pokemon) => {
      return pokemon.name in userHave && userHave[pokemon.name] === true;
    });
    domShowPokemon(userCollection);
    myCollectionElement.innerHTML = "All Pokemon";
    myCollectionElement.classList.remove("btn-warning");
    myCollectionElement.classList.add("btn-default");
  } else {
    domShowPokemon(pokemonList);
    myCollectionElement.innerHTML = "My Collection";
    myCollectionElement.classList.remove("btn-default");
    myCollectionElement.classList.add("btn-warning");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  domShowPokemon(pokemonList);

  const searchBar = document.querySelector("#searchBar");

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
  /*
  document
    .querySelector("#add-btn")
    .addEventListener("click", (e) => addPokemon());
  */
});

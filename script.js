function domShowPokemon(pokemonList) {
  let userHave = {};
  if (localStorage.getItem("userHave")) {
    userHave = JSON.parse(localStorage.getItem("userHave"));
  }
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let pokemon of pokemonList) {
    const card = document.createElement("div");
    const addButton = document.createElement("button");
    const noteButton = document.createElement("button");
    const addIcon = document.createElement("i");
    const noteIcon = document.createElement("i");
    const name = document.createElement("h2");
    name.innerHTML = pokemon.name;
    addIcon.classList.add("fa", "fa-plus");
    noteIcon.classList.add("fa", "fa-sticky-note");
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
      addIcon.classList.remove("fa-plus");
      addIcon.classList.add("fa-close");
    }
    addButton.onclick = () => {
      const have = changeHave(pokemon);
      if (have) {
        modelViewer.classList.add("user-have");
        addIcon.classList.remove("fa-plus");
        addIcon.classList.add("fa-close");
      } else {
        modelViewer.classList.remove("user-have");
        addIcon.classList.remove("fa-close");
        addIcon.classList.add("fa-plus");
      }
    };
    noteButton.onclick = () => {
      openNotes(pokemon);
    };
    addButton.classList.add("btn-primary");
    noteButton.classList.add("btn-warning");
    addButton.appendChild(addIcon);
    noteButton.appendChild(noteIcon);
    card.classList.add("card");
    card.appendChild(name);
    card.appendChild(modelViewer);
    card.appendChild(addButton);
    card.appendChild(noteButton);
    gallery.appendChild(card);
  }
}

function openForm() {
  toggle();
  document.querySelector(".form-popup").style.display = "block";
  const selectPokemon = document.querySelector("#names");
  for (let pokemon of pokemonList) {
    const option = document.createElement("option");
    option.setAttribute("value", pokemon.name);
    option.innerHTML = pokemon.name;
    selectPokemon.appendChild(option);
  }
}

function closeForm() {
  toggle();
  document.querySelector(".form-popup").style.display = "none";
}

function toggle() {
  let blur = document.querySelector("#blur");
  blur.classList.toggle("active");
}

function addNote() {
  let notes = {};
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  let key = document.querySelector("#names").value;
  let note = document.querySelector("#note").value;
  if (note.length === 0) {
    console.log("You can't add empty note");
    return;
  }
  if (key in notes) {
    notes[key].push(note);
  } else {
    notes[key] = [note];
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  closeForm();
}

function openNotes(pokemon) {
  toggle();
  document.querySelector(".notes-popup").style.display = "block";
  let allNotes = {};
  if (localStorage.getItem("notes")) {
    allNotes = JSON.parse(localStorage.getItem("notes"));
  }
  let notes = [];
  if (pokemon.name in allNotes) {
    notes = allNotes[pokemon.name];
  }
  const notesPopup = document.querySelector("#notes");
  for (let note of notes) {
    let p = document.createElement("p");
    p.classList.add("note-elt");
    p.innerHTML = note;
    p.ondblclick = () => {
      notes.splice(notes.indexOf(note), 1);
      allNotes[pokemon.name] = notes;
      localStorage.setItem("notes", JSON.stringify(allNotes));
      p.remove();
    };
    notesPopup.appendChild(p);
  }
}

function closeNotes() {
  toggle();
  document.querySelector(".notes-popup").style.display = "none";
}

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
});

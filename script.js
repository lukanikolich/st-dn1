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
    const mapButton = document.createElement("button");
    const addIcon = document.createElement("i");
    const noteIcon = document.createElement("i");
    const mapIcon = document.createElement("i");
    const name = document.createElement("h2");
    name.innerHTML = pokemon.name;
    addIcon.classList.add("fas", "fa-plus");
    noteIcon.classList.add("fas", "fa-sticky-note");
    mapIcon.classList.add("fas", "fa-map-marked-alt");
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
      addIcon.classList.add("fa-times");
    }
    addButton.onclick = () => {
      const have = changeHave(pokemon);
      if (have) {
        modelViewer.classList.add("user-have");
        addIcon.classList.remove("fa-plus");
        addIcon.classList.add("fa-times");
      } else {
        modelViewer.classList.remove("user-have");
        addIcon.classList.remove("fa-times");
        addIcon.classList.add("fa-plus");
      }
    };
    noteButton.onclick = () => {
      openNotes(pokemon);
    };
    mapButton.onclick = () => {
      getLocation();
    };
    addButton.classList.add("btn-primary");
    noteButton.classList.add("btn-warning");
    mapButton.classList.add("btn-danger", "map-btn");
    addButton.appendChild(addIcon);
    noteButton.appendChild(noteIcon);
    mapButton.appendChild(mapIcon);
    card.classList.add("card");
    card.appendChild(name);
    card.appendChild(modelViewer);
    card.appendChild(addButton);
    card.appendChild(noteButton);
    card.appendChild(mapButton);
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
  warning = document.querySelector("#warning");
  if (warning !== null) {
    warning.remove();
  }
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
    warning = document.createElement("div");
    warning.setAttribute("id", "warning");
    warning.innerHTML = "You can't add empty note";
    document.querySelector(".form-popup").appendChild(warning);
    return;
  }
  if (key in notes) {
    notes[key].push(note);
  } else {
    notes[key] = [note];
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  note.value = "";
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
  document.querySelector("#notes").innerHTML = "";
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

function getLocation() {
  document.querySelector("#map").style.display = "block";
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#map").offset().top,
    },
    500
  );
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  }
}

function initMap(position) {
  const lat = Math.random() * -0.01 + 0.005;
  const lng = Math.random() * -0.01 + 0.005;
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: position.coords.latitude + lat,
      lng: position.coords.longitude + lng,
    },
    zoom: 17,
  });
  const icon = {
    url: "assets/pokeball_img.svg", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
  };
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      position.coords.latitude + lat,
      position.coords.longitude + lng
    ),
    icon: icon,
    map: map,
  });
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

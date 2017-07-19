const player = document.querySelector(".player");
const musicPlayer = document.querySelector(".music-player");
const search = document.querySelector(".search");
const searchForm = document.querySelector(".search-form");
const results = document.querySelector(".results");
const searchField = document.querySelector(".search-field");
const searchButton = document.querySelector(".search-button");
const songsUl = document.querySelector("ul");

function fetchData(){
  let searchTerm = document.querySelector("input").value.replace(" ", "+");
  let url = `https://itunes.apple.com/search?term=${searchTerm}&limit=25`
  console.log(searchTerm);

  fetch(url)
  .then((response) => response.json())
  .then(data => {

    for (let i = 0; i < data.results.length; i++) {
      const songLi = document.createElement("li");
      const artworkUrl = document.createElement("img");
      const trackName = document.createElement("p");
      const artistName = document.createElement("p");

      artworkUrl.src = data.results[i].artworkUrl100;
      trackName.textContent = data.results[i].trackName;
      artistName.textContent = data.results[i].artistName;
      musicPlayer.setAttribute("src", "data.results[i].previewUrl");

      songLi.appendChild(artworkUrl);
      songLi.appendChild(trackName);
      songLi.appendChild(artistName);
      songsUl.appendChild(songLi);
    }
  })
}

fetchData();

const player = document.querySelector(".player");
const musicPlayer = document.querySelector(".music-player");
const search = document.querySelector(".search");
const searchForm = document.querySelector(".search-form");
const results = document.querySelector(".results");
const searchButton = document.querySelector(".search-button");
const searchTerm = document.querySelector("input")
const songDivs = document.getElementsByClassName('song')


const fetchData = () => {
  clearInterval(interval);
  let url = `https://itunes.apple.com/search?term=${searchTerm.value}&limit=32`
  clearResults()
  fetch(url)
  .then((response) => response.json())
  .then(data => {

    for (let i = 0; i < data.results.length; i++) {
      const songDiv = document.createElement("div");
      const artworkUrl = document.createElement("img");
      const trackName = document.createElement("h3");
      const artistName = document.createElement("h3");

      artworkUrl.src = data.results[i].artworkUrl100;
      trackName.textContent = data.results[i].trackName;
      artistName.textContent = data.results[i].artistName;
      songDiv.classList.add('song')
      songDiv.addEventListener('click', function(){
        musicPlayer.setAttribute('src', data.results[i].previewUrl)
        musicPlayer.setAttribute('autoplay', true)
      })
      songDiv.appendChild(trackName);
      songDiv.appendChild(artistName);
      songDiv.appendChild(artworkUrl);
      results.appendChild(songDiv);
    }
  })
}

function clearResults(){
  results.textContent = "";
}

searchTerm.addEventListener("input", () => {
    window.clearInterval(window.interval)
    window.interval = setInterval(fetchData, 400);
})

const player = document.querySelector('.player')
const musicPlayer = document.querySelector('.music-player')
const search = document.querySelector('.search')
const searchForm = document.querySelector('.search-form')
const results = document.querySelector('.results')
const searchButton = document.querySelector('.search-button')
const searchTerm = document.querySelector('input')
const songDivs = document.getElementsByClassName('song')

const fetchData = () => {
  let url = `https://itunes.apple.com/search?term=${searchTerm.value}&limit=32`
  clearResults()
  fetch(url).then(response => response.json()).then(data => {
    for (let i = 0; i < data.results.length; i++) {
      const songDiv = document.createElement('div')
      const artworkUrl = document.createElement('img')
      const trackName = document.createElement('h3')
      const artistName = document.createElement('h3')

      artworkUrl.src = data.results[i].artworkUrl100
      trackName.textContent = data.results[i].trackName
      artistName.textContent = data.results[i].artistName
      songDiv.classList.add('song')
      songDiv.addEventListener('click', function() {
        musicPlayer.setAttribute('src', data.results[i].previewUrl)
      })

      let hoverDiv
      songDiv.addEventListener('mouseover', function() {
        hoverDiv = document.createElement('div')
        hoverDiv.innerHTML = '$' + data.results[i].trackPrice + '</br>' + ' on itunes'

        hoverDiv.style.position = 'absolute'
        hoverDiv.style.display = 'block'
        hoverDiv.style.overflow = 'hidden'
        hoverDiv.style.zIndex = '5'
        hoverDiv.style.backgroundColor = 'hsla(60, 8%, 18%, .7)'
        hoverDiv.style.color = '#ff002d'
        hoverDiv.style.fontSize = '125%'

        songDiv.addEventListener('mousemove', function showCoords(event) {
          hoverDiv.style.left = event.clientX + 'px'
          hoverDiv.style.top = event.clientY + 'px'
        })

        songDiv.appendChild(hoverDiv)
      })
      songDiv.addEventListener('mouseout', function() {
        songDiv.removeChild(hoverDiv)
      })

      songDiv.appendChild(trackName)
      songDiv.appendChild(artistName)
      songDiv.appendChild(artworkUrl)
      results.appendChild(songDiv)
    }
  })
}

function clearResults() {
  results.textContent = ''
}

searchTerm.addEventListener('change', fetchData)

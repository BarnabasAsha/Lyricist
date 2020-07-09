const key = '5c1fbd32e42213e0c714808a535e4b5a'
let form1 = document.querySelector('#form1')
const result = document.querySelector('#output');

// form 1 fields

const track = document.getElementById('track')
const artist = document.getElementById('artist')

// Get lyrics through user input of artiste name and song title

const matcherLyrics =  async () => {
  await fetch(`https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${track.value.trim()}&q_artist=${artist.value.trim()}&apikey=${key}`)
.then(response => {
  console.log(response.status)
  if (response.ok){
    return response.json()
  } 
})
.then(data => 
  {
    console.log(data)
    if(data.message.header.status_code == '200') {
      output(data.message.body.lyrics.lyrics_body);
    }else if (data.message.header.status_code == '404') {
      errorMessage('404')
    }
    
  }).catch(error=> {
    console.log(error);
    if (response.status == '429') {errorMessage('429')}
    else if (response.status == '404') errorMessage('network')
  })
}

function output (lyrics) {
  let parsedTrack = track.value.trim().toUpperCase()
  let parsedArtist = artist.value.trim().toUpperCase()
  result.innerHTML = ''
  let stringLyrics = lyrics
    result.innerHTML += `
      <h1>${parsedTrack}: ${parsedArtist}</h1>
      <p>${stringLyrics}</p>
    `
    reset()
}

function reset () {
  track.value = ''
  artist.value = ''
}

function errorMessage (message) {
    if(message == '429') {
      result.innerHTML = ` 
       <img src='./images/server.svg'>
       <p>Oops, seems there are too many requests, Please try in few minutes</p>
      `
    } else if (message == '404') {
      result.innerHTML = ` 
       <img src='./images/error404.svg'>
       <p>Oops, seems we don't have the lyrics you are looking for...</p>
      `
    }
    else {
      result.innerHTML = ` 
     <img src='./images/server.svg'>
     <p>Can connect to our server</p>
    `
    }
}

function loadAnimation () {
  document.querySelector('.bounceAnimation').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.bounceAnimation').style.display = 'none';
    }, 6000)
}

 
  form1.addEventListener('submit', async (e) => {
    e.preventDefault()
    result.innerHTML = ''
    if(track.value == '' && artist.value == ''){
      alert('completely fill all fields')
    } else {
    await loadAnimation()
    setTimeout(() => {
      matcherLyrics()
    }, 6000)
  
    }
  })
 

  

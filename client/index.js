console.log(`hello from index.js`);
const filmList = document.querySelector(`#films`);
console.log(filmList);

const url = `http://localhost:3000/films`;

const clearList = () => {
  while (filmList.firstChild) {
    filmList.removeChild(filmList.lastChild)
  }
}

const removeFilm = (event) => {

  event.target.parentNode.remove();

}

const addFilm = (data) => {
  // add elements to the DOM
  const li = document.createElement(`li`)
  li.textContent = data.name
  // console.log(li)
  filmList.appendChild(li)

  const btn = document.createElement(`button`);
  btn.textContent = `x`;
  btn.addEventListener(`click`, removeFilm, { once: true })
  li.appendChild(btn)
}

async function fetchFilms() {
  try {
    clearList()
    const response = await fetch(`http://localhost:3000/films`)
    const data = await response.json()
    data.forEach(film => 
      addFilm(film))
  } catch (error) {
    console.log("😞", error)
  }
}

fetchFilms()

const form = document.getElementById(`filmForm`);

async function createFilm(event) {
  event.preventDefault()
  console.log(event.target.film.value)

  const options = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: event.target.film.value
    })
  }

  const response = await fetch(url, options)
  console.log(response)
  if (response.status === 201) {
    event.target.film.value = ``
    console.log(`201 true`)
  }
}

form.addEventListener(`submit`, createFilm)

const btn = document.querySelector(`#display`)
console.log(btn)
btn.addEventListener(`click`, fetchFilms)
console.log(`hello from index.js`);
const filmList = document.querySelector(`#films`);
console.log(filmList);
const form = document.getElementById(`filmForm`);
const deleterForm = document.getElementById(`deleterForm`)

const url = `http://localhost:3000/films`;

const clearList = () => {
  while (filmList.firstChild) {
    filmList.removeChild(filmList.lastChild)
  }
}

const addFilm = (data) => {
  // add elements to the DOM
  const li = document.createElement(`li`)
  li.textContent = data.name
  // console.log(li)
  filmList.appendChild(li)
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

async function deleteFilm(event) {
  event.preventDefault()
  console.log(event.target.parentNode.textContent)
}

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

async function deleteFilm(event) {
  event.preventDefault()
  const int = event.target.film.value

  const options = {
    method: `DELETE`,
  }

  const response = await fetch(url + `/${int}`, options)
  console.log(response)

  if (response.status === 200) {
    event.target.film.value = ``
    console.log(`Item deleted`)
  }
}

form.addEventListener(`submit`, createFilm)
deleterForm.addEventListener(`submit`, deleteFilm)

const btn = document.querySelector(`#display`)
console.log(btn)
btn.addEventListener(`click`, fetchFilms)
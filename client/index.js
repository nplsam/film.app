console.log(`hello from index.js`);
const filmList = document.querySelector(`#films`);
console.log(filmList);

const url = `http://localhost:3000/films`;

const addfilm = (data) => {
  // add elements tot he DOM
  const li = document.createElement(`li`)
  li.textContent = data.name
  console.log(li)
  filmList.appendChild(li)
}

const fetchfilms = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
        const films = data;
        films.forEach(film => {
          addfilm(film);
        })
    })
    .catch(err => {
      console.log("❌", err)
    })
}

fetchfilms()

// async function fetchfilms2() {
//   try {
//     const response = await fetch(`http://localhost:3000/films`)
//     const data = await response.json()
//     data.forEach(film => 
//       addfilm(film))
//   } catch (error) {
//     console.log("😞", error)
//   }
// }

// fetchfilms2()

const form = document.getElementById(`filmForm`);

// form.addEventListener(`submit`, (event) => {
//   event.preventDefault()
//   console.log(event.target.film.value)

//   const options = {
//     method: `POST`,
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: event.target.film.value
//     })
//   }

//   fetch(url, options)
//   .then(resp => resp.json())
//   .then(data => {
//     console.log(data)
//   })
// })

async function createfilm(event) {
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

form.addEventListener(`submit`, createfilm)

const btn = document.querySelector(`#display`)
console.log(btn)
btn.addEventListener(`click`, fetchfilms)
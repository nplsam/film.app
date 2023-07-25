const express = require('express');
const cors = require(`cors`);
const films = require(`./films`);
const logger = require(`./logger`);
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(logger);

// localhost: 300/ Root
app.get('/', (req, res) => {
  res.send('Afternoon Yao!');
});

// localhost: 3000/films Index Action
app.get(`/films`, (req, res) => {
  res.send(films);

});

// localhost: 3000/films Show Action
app.get(`/films/:id`, (req, res) => {
  const idx = req.params.id-1; // -1 makes it easier for user
  const foundfilm = films[idx];
  if (!foundfilm) {
    res.status(404).send({ message: `film with ${idx+1} not found` });
  } else {
    res.send(foundfilm);
  }
  
});

// localhost: 3000/films Create Action
app.post(`/films`, (req, res) => {
  console.log(`line 42`, req.body);
  const createdfilm = req.body;

  films.push(createdfilm);
  res.status(201).send(createdfilm);
});


// localhost: 3000/films/:id Delete Action
app.delete(`/films/:id`, (req, res) => {
  const idx = req.params.id-1; // -1 makes it easier for user
  const foundfilm = films[idx];
  console.log(foundfilm)
  if (!foundfilm) {
    res.status(404).send({ message: `film with ${idx+1} not found` });
  } else {
    const deletedItem = films.splice(idx, 1)
    res.send(deletedItem.name);
  }
})

module.exports = app;
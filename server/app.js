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
  const idx = req.params.id-1;
  const foundfilm = films[idx];
  if (!foundfilm) {
    res.status(404).send({ message: `film with ${idx} not found` });
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

// localhost: 3000/films/:id
app.patch('/films/:id', function (req, res) {
    data = require('./films.json')
    let idxu = req.params.id-1 
    films[idxu].checked = !data[idxu].checked
    fs.writeFile("films.json", JSON.stringify(films), "utf8", function() {
        res.send({success: true})
    })
})


module.exports = app;

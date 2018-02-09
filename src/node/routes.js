const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//----------------------------------------------------------------------------//

const data = {};

//----------------------------------------------------------------------------//

// Retourne un tableau avec tout les films
app.get('/api/movies', (req, res) => {
    res.status(200).json(data);
})
// Retourne l’objet correspondant au film avec l’identifiant id
app.get('/api/movies/:id', (req, res) => {

})

// Met à jour le film avec l’identifiant id
app.post('/api/movies/:id', (req, res) => {

})

// Créé un nouveau film
app.post('/api/movies', (req, res) => {

})

app.use('/dist',express.static('dist/'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'index.html'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.get('/', (req, res) => res.send('Hello World!'))

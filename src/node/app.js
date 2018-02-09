const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const Movie = require('./class/Movie.js');

//----------------------------------------------------------------------------//
const movies = new Array();
movies.push(new Movie("Godzilla", "Américain", 2014, "Gareth", "Edwards", "Britannique",
    1975, "uploads/godzilla.jpg",
    ["Science fiction","Action"],2))
movies.push(new Movie("Black Panther", "Américain", 2018, "Ryan", "Coogler", "Américain",
    1986, "uploads/blackpanthertrailer.jpg",
    ["Science fiction","Aventure","Action"]))
//----------------------------------------------------------------------------//

// Retourne un tableau avec tout les films
app.get('/api/movies', (req, res) => {
    var movieJson = new Array();
    movies.forEach(function (movie) {
        movieJson.push(movie.toJSON)
    })
    res.status(200).json(movieJson);
})
// Retourne l’objet correspondant au film avec l’identifiant id
app.get('/api/movies/:id', (req, res) => {
    movies.forEach(function (movie) {
        if (movie.id === req.params.id) {
            res.status(200).json(movie.toJSON);
        }
    })
    res.status(400).end()
})

// Met à jour le film avec l’identifiant id
app.post('/api/movies/:id',upload.single('poster'), (req, res) => {
    var data = JSON.parse(req.body.movie)
    movies.forEach(function (movie) {
        if (movie.id === req.params.id) {
            if(typeof req.file !== "undefined"){
                if(req.file.destination+req.file.filename != movie.poster){
                    movie.poster = req.file.destination+req.file.filename;
                    console.log(movie.poster)
                }
            }
            movie.title = (movie.title !== data.title) ? data.title : movie.title;
            movie.language = (movie.language !== data.language) ? data.language : movie.language;
            movie.releaseDate = (movie.releaseDate !== data.releaseDate) ? data.releaseDate : movie.releaseDate;
            movie.productBy.firstName = (movie.productBy.firstName  !== data.productBy.firstName ) ? data.productBy.firstName  : movie.productBy.firstName;
            movie.productBy.lastName = (movie.productBy.lastName !== data.productBy.lastName) ? data.productBy.lastName : movie.productBy.lastName;
            movie.productBy.nationality = (movie.productBy.nationality !== data.productBy.nationality) ? data.productBy.nationality : movie.productBy.nationality;
            movie.productBy.birthDate = (movie.productBy.birthDate !== data.productBy.birthDate) ? data.productBy.birthDate : movie.productBy.birthDate;
            movie.kind = (movie.kind !== data.kind) ? data.kind : movie.kind;
            movie.rating = (movie.rating !== data.rating) ? data.rating : movie.rating;
            res.status(200).json(movie.toJSON);
        }
    })
    res.status(400).end()
})

// Créé un nouveau film
app.post('/api/movies',upload.single('poster'), (req, res) => {
    var data = JSON.parse(req.body.movie)
    data.poster = (req.file.filename != null && req.file.destination != null)?req.file.destination+req.file.filename:"";
    if (data.title !== "" && data.language !== "" && data.releaseDate !== "" && data.productBy.firstName !== "" &&
        data.productBy.lastName !== "" && data.productBy.nationality !== "" && data.productBy.birthDate !== "" &&
        data.poster !== "" && data.kind !== "") {
        var movie = new Movie(data.title, data.language, data.releaseDate, data.productBy.firstName, data.productBy.lastName,
            data.productBy.nationality, data.productBy.birthDate, data.poster, data.kind,data.rating)
        movies.push(movie)
        res.status(200).json(movie.toJSON)
    }
    res.status(400).end()
})
//Supprime un film
app.delete('/api/movies/:id', (req, res) => {
    movies.forEach(function (movie, index, object) {
        if (movie.id === req.params.id) {
            object.splice(index, 1);
            res.status(200).send("Movie : " + req.params.id + " is deleted");
        }
    })
    res.status(400).end()
})

app.use('/dist', express.static(path.resolve(__dirname, '../../dist/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
}),

app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads/')));

app.listen(3000, () => console.log('Le serveur est lancé sur le port : 3000'));

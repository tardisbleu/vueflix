import Vue from 'vue';
import Axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        movies: [],
        movie: null
    },
    mutations: {
        addMovie(state, movie) {
            state.movies.push(movie);
        },
        removeMovie(state, id) {
            this.movies.forEach(function (movie, index, object) {
                if (movie.id === id) {
                    object.splice(index, 1);
                }
            })
        },
        updateMovie(state, movieEdit) {
            state.movies.forEach(function (movie) {
                if (movie.id === movieEdit.id) {
                    movie = movieEdit
                }
            })
        },
        setMovies(state, movies) {
            state.movies = movies;
        },
        setMovie(state, movie) {
            state.movie = movie;
        }
    },
    actions: {
        addMovieToAPI(context, movie) {
            Axios.post('/api/movies', movie, {headers: { 'Content-Type': 'multipart/form-data' } }).then(function (response) {
                context.commit("addMovie", response.data)
            }).catch(error=>{
                console.log("Impossible d'ajouter le film")
            })
        },
        getAllMoviesToAPI(context) {
            Axios.get('/api/movies').then(function (response) {
                context.commit("setMovies", response.data)
            }).catch(error=>{
                console.log("Aucun film trouvé")
            })
        },
        getOneMovieToAPI(context,id) {
            Axios.get('/api/movies/'+id).then(response=>{
                context.commit("setMovie", response.data)
            }).catch(error=>{
                context.commit("setMovie", null)
            })
        },
        removeMovieToAPI(context, id) {
            Axios.delete('/api/movies/'+id).then(response=>{
                context.commit("removeMovie", id)
            }).catch(error=>{
                console.log("Impossible de supprimer le film")
            })
        },
        updateMovieToAPI(context,movie) {
            Axios.post('/api/movies/'+movie[0],movie[1], {headers: { 'Content-Type': 'multipart/form-data' } }).then(response=>{
                context.commit("updateMovie", movie)
            }).catch(error=>{
                console.log("Impossible d'editer le film")
            })

        }
    }
})

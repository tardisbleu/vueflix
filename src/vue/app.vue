<template>
    <div>
        <headitem v-on:searchM="searchMovie"></headitem>
        <div class="ml-md-5 mr-md-5 mt-sm-4">
            <p v-if="search == undefined || search == ''">Film: {{ movies.length }}</p>
            <p v-if="search !== undefined && search !== ''">Film avec le recherche "{{search}}" : {{ moviesShow.length }}</p>
            <div class="row">
                <movieitem v-for="movie in movies" v-if="search == undefined  || search == ''" v-bind:movie="movie" v-bind:key="movie.id"></movieitem>
                <movieitem v-for="movie in moviesShow" v-if="search !== undefined  && search !== ''" v-bind:movie="movie" v-bind:key="movie.id"></movieitem>
            </div>
        </div>
    </div>
</template>

<script>
    import MovieItem from './components/movieitem.vue'
    import HeadItem from './components/headitem.vue'

    export default {
        data() {
            return {
                moviesShow: []
            }
        },
        methods: {
            searchMovie(){
                var search = this.search.toLowerCase();
                if(search !== undefined && search !== "") {
                    var allMovie = this.$store.state.movies
                    var tmpArrayOfMovie = new Array()
                    allMovie.forEach(function (movie) {
                        if (movie.title.toLowerCase().indexOf(search) != -1 ||
                            movie.releaseDate == search ||
                            movie.language.toLowerCase().indexOf(search) != -1 ||
                            movie.productBy.firstName.toLowerCase().indexOf(search) != -1 ||
                            movie.productBy.lastName.toLowerCase().indexOf(search) != -1){
                            tmpArrayOfMovie.push(movie)
                        }
                    })
                    this.moviesShow = tmpArrayOfMovie
                }
            }
        },
        computed: {
            movies() {
                return this.$store.state.movies;
            },
            search(){
                return this.$route.query.search;
            }
        },
        components: {
            "headitem": HeadItem,
            "movieitem": MovieItem
        },
        mounted() {
            this.$store.dispatch('getAllMoviesToAPI')
        }
    }
</script>

<style>
</style>

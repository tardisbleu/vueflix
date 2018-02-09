<template>
    <div>
        <headitem></headitem>
        <div class="p-md-3 p-sm-1 ml-md-5 mr-md-5 mt-sm-4 row">
            <div class="col-3" v-if="movie">
                <img :src="movie.poster" alt="Movie" class="img-fluid"/>
            </div>
            <div v-if="movie" class="col-9 border bg-light py-2">
                <h2 class="text-center">{{movie.title}}</h2>
                <hr class="degrade"/>
                <div class="mb-2">
                    <span class="ml-3 badge badge-primary" v-for="kind in movie.kind" v-bind:movie="kind"
                          v-if="movie.kind">{{kind}}</span>
                </div>
                <p>Langue utilisé {{movie.language}}</p>
                <p>Sortie en {{movie.releaseDate}}</p>
                <hr class="degrade"/>
                <h5>Réalisateur : </h5>
                <div class="pl-4">
                    <p>{{movie.productBy.firstName}} {{movie.productBy.lastName}}</p>
                    <p>Née en : {{movie.productBy.birthDate}}</p>
                    <p>Nationalité : {{movie.productBy.nationality}}</p>
                </div>
                <hr class="degrade"/>
                <p v-if="movie.rating == null">Score : Pas encore saisie</p>
                <p v-else><star-rating v-model="movie.rating" :read-only=true :star-size=35 ></star-rating></p>
                <hr class="degrade"/>
                <router-link :to="{ name: 'home'}">
                    <button class="btn btn-primary" @click="deleteMovie">Supprimer</button>
                </router-link>
                <router-link :to="{ name: 'edit', params: { id: movie.id }}">
                    <button class="btn btn-primary">Editer</button>
                </router-link>
            </div>
            <div class="alert alert-danger col-12" v-else>
                <strong>Attention!</strong> le film demandé n'existe pas
            </div>
            <router-link :to="{ name: 'home'}" class="mt-3">
                <button class="btn btn-default">Retour</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import HeadItem from './headitem.vue'
    import StarRating from 'vue-star-rating'

    export default {
        name: "movieshow",
        components: {
            "headitem": HeadItem,
            StarRating
        },
        data() {
            return {
                id: ""
            }
        },
        methods: {
            deleteMovie() {
                this.$store.dispatch('removeMovieToAPI', this.id)
            }
        },
        computed: {
            movie() {
                return this.$store.state.movie;
            }
        },
        mounted() {
            this.id = this.$route.params.id
            this.$store.dispatch('getOneMovieToAPI', this.id)
        }
    }
</script>

<style scoped>
hr.degrade {
    border: 0;
    height: 1px;
    background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
}
</style>
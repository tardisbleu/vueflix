<template>
    <div>
        <headitem></headitem>
        <form v-if="movie" class="border bg-light p-md-3 p-sm-1 ml-md-5 mr-md-5 mt-sm-4">
            <div class="form-group">
                <label for="title">Titre du film</label>
                <input type="text" v-model="movie.title" class="form-control" id="title"
                       placeholder="Saisir le titre du film">
            </div>
            <div class="form-group">
                <label for="language">Langage du film</label>
                <input type="text" v-model="movie.language" class="form-control" id="language"
                       placeholder="Saisir le langage du film">
            </div>
            <div class="form-group">
                <label for="releaseDate">Date de sortie</label>
                <input type="number" v-model="movie.releaseDate" class="form-control" id="releaseDate"
                       placeholder="Saisir la date de sortie">
            </div>
            <div class="pl-4">
                <div class="form-group">
                    <label for="producerFirstName">Prénom du producteur</label>
                    <input type="text" v-model="movie.productBy.firstName" class="form-control" id="producerFirstName"
                           placeholder="Saisir le prénom du producteur">
                </div>
                <div class="form-group">
                    <label for="producerLastName">Nom du producteur</label>
                    <input type="text" v-model="movie.productBy.lastName" class="form-control" id="producerLastName"
                           placeholder="Saisir le nom du producteur">
                </div>
                <div class="form-group">
                    <label for="producerNationality">Nationalité du producteur</label>
                    <input type="text" v-model="movie.productBy.nationality" class="form-control" id="producerNationality"
                           placeholder="Saisir la nationalité du producteur">
                </div>
                <div class="form-group">
                    <label for="producerBirthDate">Date de naissance du producteur</label>
                    <input type="number" v-model="movie.productBy.birthDate" class="form-control" id="producerBirthDate"
                           placeholder="Saisir la date de naissance du producteur">
                </div>
            </div>
            <div class="form-group">
                <img :src="movie.poster" alt="Movie" class="img-fluid " style="height:340px"/>
                <span class="btn btn-default btn-file">
                    Rechercher une image <input @change="uploadImage" type="file" name="poster" accept="image/*">
                </span>
            </div>
            <div class="form-group">
                <h4 class="text-center">Genre du film</h4>
                <br/>
                <div class="row">
                    <div class="col">
                        <input type="checkbox" id="Action" value="Action" v-model="movie.kind">
                        <label for="Action">Action</label><br/>
                        <input type="checkbox" id="Sience-Fiction" value="Sience-Fiction" v-model="movie.kind">
                        <label for="Sience-Fiction">Sience-Fiction</label>
                    </div>
                    <div class="col">
                        <input type="checkbox" id="Aventure" value="Aventure" v-model="movie.kind">
                        <label for="Aventure">Aventure</label><br/>
                        <input type="checkbox" id="Fantaisie" value="Fantaisie" v-model="movie.kind">
                        <label for="Fantaisie">Fantaisie</label>
                    </div>
                    <div class="col">
                        <input type="checkbox" id="Manga" value="Manga" v-model="movie.kind">
                        <label for="Manga">Manga</label>
                    </div>
                </div>
                <br/>
                <star-rating v-model="movie.rating" :star-size=35 :show-rating=false></star-rating>
            </div>
            <button type="submit" class="btn btn-primary" @click="saveMovie">Enregistrer le film</button>
        </form>
        <div class="alert alert-danger" v-else>
            <strong>Attention!</strong> le film demandé n'existe pas
        </div>
    </div>
</template>

<script>
    import HeadItem from './headitem.vue'
    import StarRating from 'vue-star-rating'
    export default {
        components: {
            "headitem": HeadItem,
            StarRating
        },
        name: "movieedit",
        data() {
            return {
                id: "",
                data: new FormData()
            }
        },
        computed: {
            movie() {
                return this.$store.state.movie;
            }
        },
        methods: {
            saveMovie() {
                this.data.append('movie', JSON.stringify(this.movie))
                this.$store.dispatch('updateMovieToAPI', [this.id,this.data])
                this.$router.push({name: 'show', params: {id: this.movie.id}})
            },
            uploadImage: function (e) {
                var files = e.target.files;
                if (!files[0]) {
                    return;
                }
                this.data.append('poster', files[0])
            }
        },
        mounted() {
            this.id = this.$route.params.id
            this.$store.dispatch('getOneMovieToAPI', this.id)
        }
    }
</script>

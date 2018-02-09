<template>
    <div>
        <headitem></headitem>
        <form class="border bg-light p-md-3 p-sm-1 ml-md-5 mr-md-5 mt-sm-4">
            <div class="form-group">
                <label for="title">Titre du film</label>
                <input type="text" v-model="title" class="form-control" id="title"
                       placeholder="Saisir le titre du film">
            </div>
            <div class="form-group">
                <label for="language">Langage du film</label>
                <input type="text" v-model="language" class="form-control" id="language"
                       placeholder="Saisir le langage du film">
            </div>
            <div class="form-group">
                <label for="releaseDate">Date de sortie</label>
                <input type="number" v-model="releaseDate" class="form-control" id="releaseDate"
                       placeholder="Saisir la date de sortie">
            </div>
            <div class="pl-4">
                <div class="form-group">
                    <label for="producerFirstName">Prénom du producteur</label>
                    <input type="text" v-model="producerFirstName" class="form-control" id="producerFirstName"
                           placeholder="Saisir le prénom du producteur">
                </div>
                <div class="form-group">
                    <label for="producerLastName">Nom du producteur</label>
                    <input type="text" v-model="producerLastName" class="form-control" id="producerLastName"
                           placeholder="Saisir le nom du producteur">
                </div>
                <div class="form-group">
                    <label for="producerNationality">Nationalité du producteur</label>
                    <input type="text" v-model="producerNationality" class="form-control" id="producerNationality"
                           placeholder="Saisir la nationalité du producteur">
                </div>
                <div class="form-group">
                    <label for="producerBirthDate">Date de naissance du producteur</label>
                    <input type="number" v-model="producerBirthDate" class="form-control" id="producerBirthDate"
                           placeholder="Saisir la date de naissance du producteur">
                </div>
            </div>
            <div class="form-group">
                <span class="btn btn-default btn-file">
                    Rechercher une image <input @change="uploadImage" type="file" name="poster" accept="image/*">
                </span>
            </div>
            <div class="form-group">
                <h4 class="text-center">Genre du film</h4>
                <br/>
                <div class="row">
                    <div class="col">
                        <input type="checkbox" id="Action" value="Action" v-model="kind">
                        <label for="Action">Action</label><br/>
                        <input type="checkbox" id="Sience-Fiction" value="Sience-Fiction" v-model="kind">
                        <label for="Sience-Fiction">Sience-Fiction</label>
                    </div>
                    <div class="col">
                        <input type="checkbox" id="Aventure" value="Aventure" v-model="kind">
                        <label for="Aventure">Aventure</label><br/>
                        <input type="checkbox" id="Fantaisie" value="Fantaisie" v-model="kind">
                        <label for="Fantaisie">Fantaisie</label>
                    </div>
                    <div class="col">
                        <input type="checkbox" id="Manga" value="Manga" v-model="kind">
                        <label for="Manga">Manga</label>
                    </div>
                </div>
                <br/>
                <star-rating v-model="rating" :star-size=35 :show-rating=false></star-rating>
            </div>
            <router-link :to="{ name: 'home'}" class="mt-3">
                <button class="btn btn-default">Retour</button>
            </router-link>
            <button type="submit" class="btn btn-primary mx-auto" @click="save">Enregistrer le film</button>
        </form>
    </div>
</template>
<script>
    import HeadItem from './headitem.vue'
    import StarRating from 'vue-star-rating'

    export default {
        name: 'movieadd',
        data: function () {
            return {
                title: "",
                language: "",
                releaseDate: 1990,
                producerFirstName: "",
                producerLastName: "",
                producerNationality: "",
                producerBirthDate: 1990,
                poster: "",
                kind: [],
                rating: 0,
                data: new FormData()
            }
        },
        components: {
            "headitem": HeadItem,
            StarRating
        },
        methods: {
            save: function () {
                var myMovie = JSON.stringify({
                    title: this.title,
                    language: this.language,
                    releaseDate: this.releaseDate,
                    productBy: {
                        firstName: this.producerFirstName,
                        lastName: this.producerLastName,
                        nationality: this.producerNationality,
                        birthDate: this.producerBirthDate,
                    },
                    poster: this.poster,
                    kind: this.kind,
                    rating: this.rating,
                });
                this.data.append('movie', myMovie)
                this.$store.dispatch('addMovieToAPI', this.data)
                this.$router.push({name: 'home'})
            },
            uploadImage: function (e) {
                var files = e.target.files;
                if (!files[0]) {
                    return;
                }
                this.data.append('poster', files[0])
            }
        }
    }
</script>

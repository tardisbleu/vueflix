<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{ name: 'home'}">VueFlix</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{ name: 'add'}">Ajouter un film</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" @keyup.enter="btnSearchMovie" placeholder="Saisir votre recherche" type="text"
                       v-model="searchMovie">
                <button class="btn btn-secondary my-2 my-sm-0" @click="btnSearchMovie" type="button">Recherche</button>
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "headitem",
        data() {
            return {
                searchMovie: ""
            }
        },
        methods: {
            btnSearchMovie() {
                this.$router.push({ name: 'home', query: { search: this.searchMovie }})
                this.$emit("searchM",this.searchMovie)
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="col-lg-3 col-md-4 col-sm-6">
        <article class="card">
            <router-link :to="{ name: 'show', params: { id: movie.id }}">
                <header class="title-header text-center">
                    <h3>{{ movie.title }}</h3>
                </header>
                <div class="card-block">
                    <div class="img-card ">
                        <img :src="movie.poster" alt="Movie" class="img-fluid image"/>
                    </div>
                    <div class="text-center">
                    <p class="tagline card-text text-xs-center">Sortie en {{ movie.releaseDate }}</p>
                    <p class="tagline card-text text-xs-center">Créer par {{ movie.productBy.firstName }} {{ movie.productBy.lastName }}</p>
                    <p class="tagline card-text text-xs-center">Langue : {{movie.language}}</p>
                    </div>
                </div>
            </router-link>
        </article>
    </div>
</template>
<script>
    export default {
        name: 'movieitem',
        props: ['movie']
    }
</script>

<style>
    .card .card-block {
        height: 400px;
    }
    a{
        color: dimgrey;
        text-decoration: none;
    }
    a:hover {
        color: gray;
        text-decoration: none;
    }
    .image{
        height: 300px;
        display:block;
        margin:auto;
    }
</style>

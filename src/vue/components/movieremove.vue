<template>
    <div>
        <button type="button" @click="btnRemoveMovie">Supprimer</button>
    </div>
</template>

<script>
export default {
    name: 'movie-remove-component',
    methods: {
        btnRemoveMovie() {
            this.$emit("callremovemovie");
        },
    },
}
</script>

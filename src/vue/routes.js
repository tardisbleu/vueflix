import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import MovieAdd from './components/movieadd.vue'
import MovieEdit from './components/movieedit.vue'
import MovieShow from './components/movieshow.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            default: app
        }
    },
    {
        path: '/add',
        name: 'add',
        components: {
            default: MovieAdd
        }
    },
    {
        path: '/movie/:id',
        name: 'show',
        components: {
            default: MovieShow
        }
    },
    {
        path: '/movie/:id/edit',
        name: 'edit',
        components: {
            default: MovieEdit
        }
    }
]

export const router = new VueRouter({
    routes
})
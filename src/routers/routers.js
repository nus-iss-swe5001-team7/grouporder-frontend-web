import {createRouter, createWebHistory} from 'vue-router';

import Login from "../views/LoginView/LoginView.vue";
import Main from "../views/mainView/MainView.vue";
import {userStore} from "@/stores/stores";


const routes = [
    {
        name: '/',
        redirect: {
            name: 'Login'
        }
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        meta: {authorizedView: true}
    }
];

const routers = createRouter({
    history: createWebHistory(),
    routes
});

routers.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authorizedView)) {
        if (!userStore.getAuthorized()) {
            next({path: '/'});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default routers;
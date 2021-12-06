import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Profile from '../views/Profil'
import store from '../store'

Vue.use(VueRouter)

//for home and profil
//checks the localstorage if the data is available, otherwise returns to the login page
const authenticate = (to, from, next) => {
  function logOut() {
    if (localStorage.getItem("data")) {
      localStorage.removeItem('data')
    }
    store.state.user.isLogged = false
    next('/login')
  }
  if (!localStorage.getItem("data")) {
    logOut();
    return
  }
  const localStorageData = JSON.parse(localStorage.getItem("data"));
  if (!localStorageData.token &&
    !localStorageData.username &&
    !localStorageData.id &&
    typeof localStorageData.isAdmin === 'undefined') {
    logOut();
    return
  }
  store.state.user.id = localStorageData.id;
  store.state.user.username = localStorageData.username;
  store.state.user.token = localStorageData.token;
  store.state.user.isAdmin = localStorageData.isAdmin;
  store.state.user.isLogged = true;
  next()
  return
}

const routes = [
  {
    path: '/register',
    name: "Register",
    component: Register,
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authenticate,
  },

  {
    path: '/profil',
    name: 'Profil',
    component: Profile,
    beforeEnter: authenticate,
  }
]
const router = new VueRouter({
  routes
})

export default router

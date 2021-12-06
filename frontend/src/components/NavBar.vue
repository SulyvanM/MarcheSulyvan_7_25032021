<template>
  <nav id="nav-bar">
    <span v-if="user.isLogged">
      <router-link class="router-link" to="/">Accueil</router-link>
      <router-link class="router-link" to="/profil">{{ user.username }}</router-link>
      <a class="logout-button router-link" @click="logout">Déconnexion</a>
    </span>
    <span v-else>
      <router-link class="router-link" to="/register">S'inscrire</router-link>
      <router-link class="router-link" to="/login">Se connecter</router-link>
    </span>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      this.$store.state.user.isLogged = false;
      if (localStorage.getItem("data")) {
        localStorage.removeItem("data");
      }
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
#nav-bar {
  padding-right: 40px;
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
}
.router-link {
  padding: 0 5px;
}
.logout-button {
  cursor: pointer;
  text-decoration: underline;
}
.router-link-exact-active {
  color: #C9BCEB;
  font-weight: bold;
}
</style>
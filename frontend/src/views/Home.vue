<template>
  <div class="home">
    <div v-if="boxPost.value != 'closed'"><DialogBoxPost /></div>
    <h1>Accueil</h1>
    <div class="not-logged" v-if="!user.isLogged">
      <p>Vous êtes déconnecté</p>
      <router-link to="/login">→ Page de connexion ←</router-link>
    </div>
    <div v-else>
      <p class="intro-text">Groupomania<br />Le réseau social pour faciliter l'échange entre collègues</p>
      <div class="buttons">
        <button type="button" @click="boxPost.value = 'new-post_0'">
          Nouveau
        </button>
        <button type="button" @click="updateWallPosts">Rafraichir</button>
      </div>
      <div class="all-posts">
        <div v-for="(thisPost, index) in allPosts[0]" :key="index">
          <PostBlock :thisPost="thisPost" :allComments="allComments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostBlock from "../components/PostBlock.vue";
import DialogBoxPost from "../components/DialogBoxPost.vue";
export default {
  name: "Home",
  components: {
    PostBlock,
    DialogBoxPost,
  },
  computed: {
    ...mapState(["api", "user", "boxPost"]),
  },
  data() {
    return {
      allPosts: "",
      allComments: "",
    };
  },
  beforeMount() {
    //retrieves information before being mounted
    this.updateWallPosts();
  },
  methods: {
    //to retrieve information from posts to the server and send the information to the Posts component
    //is also called by the DialogBoxPost component when it is removed from the DOM
    updateWallPosts() {
      fetch(this.api.url + "/post" + "/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.user.token,
        },
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.status);
        })
        .then((data) => {
          this.allPosts = [data.result.allPosts];
          this.allComments = [data.result.allComments];
        })
        .catch((error) => {
          this.$store.state.user.isLogged = false;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.intro-text {
  text-align: center;
  margin: auto;
  margin-bottom: 30px;
  padding: 10px;
  color: white;
  text-shadow: black 1px 1px 1px;
  font-weight: bold;
  overflow-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.35);
  border-bottom: solid #ffffffaa 4px;
  border-top: solid #ffffffaa 4px;
}
.buttons {
  text-align: center;
  margin: 10px;
}
.not-logged {
  text-align: center;
  color: #742e2e;
}
.all-posts {
  display: flex;
  flex-direction: column-reverse;
}
</style>

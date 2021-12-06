<template>
  <div id="app">
    <HeaderBlock />
    <main>
      <router-view />
    </main>
    <FooterBlock />
  </div>
</template>

<script>
import HeaderBlock from "./components/HeaderBlock.vue";
import FooterBlock from "./components/FooterBlock.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    HeaderBlock,
    FooterBlock,
  },
  computed: {
    ...mapState(["boxPost"]),
  },
};
</script>

<style lang="scss">
//only global style

* {
  font-family: 'Noto Sans', sans-serif;
}
body {
  margin: 0;
}
a {
  color: #f8f8f8;
  &:hover {
    color: #c8d0d0;
  }
}
p {
  padding: 0;
  margin: 0;
}

button {
  cursor: pointer;
}

h1,
h2 {
  text-align: center;
  color: #f8f8f8;
  text-shadow: black 3px 3px 10px;
  text-transform: capitalize;
}

/* set the height to 100% of the viewport */
#app {
  margin: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1920px;
  background: fixed url("./assets/photo-1588351829783-6edb9bd6af6a.jpeg");
}
main {
  padding-top: 80px;
  flex: 1;
  overflow: hidden;
  background-color: #595959cd;
}
</style>

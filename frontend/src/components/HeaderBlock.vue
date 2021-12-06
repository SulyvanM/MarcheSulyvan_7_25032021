<template>
  <header class="header">
    <div class="banner-line-top">
      <div id="logo">
        <a href="#/"
          ><img
            src="../assets/icon-left-font-monochrome-white.svg"
            alt="Logo Groupomania"
        /></a>
      </div>
    </div>
    <div class="banner-line-bottom">
      <NavBar />
    </div>
  </header>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  name: "HeaderBloc",
  components: {
    NavBar,
  },
};
</script>

<style scoped lang="scss">
.header {
  top: 0;
  position: fixed;
  z-index: 99;
  width: 100vw;
  max-width: 1920px;
  overflow: hidden;
  background-color: #181f44;
  .banner-line-bottom {
    position: relative;
    height: 40px;
    background-color: #181f44;
  }
  .banner-line-top {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30px;
    border-bottom: solid #ae2833 4px;
    #logo {
      height: 100%;
      width: 100%;
      position: relative;
      margin-left: 20px;
      img {
        position: absolute;
        height: 100%;
      }
    }
  }
}
</style>
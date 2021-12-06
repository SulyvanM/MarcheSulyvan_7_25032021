<template>
  <footer>
    <!-- dummy link -->
    <a href="#">Contact</a>
    <a href="#">Aide</a>
    <a href="#">Informations</a>
  </footer>
</template>

<script>
export default {
  name: "FooterBlock",
};
</script>

<style lang="scss">
footer {
  height: 50px;
  background-color: #181f44;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    margin: 0 10px;
  }
}
</style>
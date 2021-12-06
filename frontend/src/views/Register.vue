<template>
  <div class="register">
    <form @keyup="validForm"  @keyup.enter="register" id="form">
      <h1>Inscription</h1>
      <div>
        <div class="input">
          <label for="username">Nom d'utilisateur</label>
          <input id="username" type="text" v-model="registerForm.username" />
        </div>
        <div class="input">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="registerForm.email" />
        </div>
        <div class="input">
          <label for="password">Mot de Passe</label>
          <input
            id="password"
            type="password"
            v-model="registerForm.password"
          />
        </div>
        <button @click="register" type="button" :disabled="submitDisabled">
          Valider
        </button>
        <p v-if="alertError" id="alert"><br />{{ alertMsg }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
      submitDisabled: true,
      alertError: false,
      alertMsg: "",
    };
  },
  computed: {
    ...mapState(["api", "user"]),
  },
  components: {},
  methods: {
    //called each time the form is modified
    //activate or deactivate the validate button
    validForm() {
      const regexUsername =
        /^([a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{3,32})$/;
      const regexEmail =
        /^[a-zA-Z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const regexPassword =
        /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}$)/;
      if (
        regexUsername.test(this.registerForm.username) &&
        regexEmail.test(this.registerForm.email) &&
        regexPassword.test(this.registerForm.password)
      ) {
        this.submitDisabled = false;
        this.alertError = false;
      } else {
        this.submitDisabled = true;
        this.alertError = true;
        this.alertMsg = "";
        if (
          this.registerForm.username &&
          !regexUsername.test(this.registerForm.username)
        ) {
          this.alertMsg += "Nom d'utilisateur incorrect\n";
        }
        if (
          this.registerForm.email &&
          !regexEmail.test(this.registerForm.email)
        ) {
          this.alertMsg += "E-mail incorrect\n";
        }
        if (
          this.registerForm.password &&
          !regexPassword.test(this.registerForm.password)
        ) {
          this.alertMsg +=
            "Mot de Passe incorrect, il doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre ainsi qu'un caractère spécial";
        }
      }
    },
    //fetch 'onClick login'
    register() {
      if (this.submitDisabled) {return}
      //declaration of request data, to avoid repetition, (register and login)
      const reqData = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.registerForm),
      };
      if (!this.user.isLogged) {
        //register
        fetch(this.api.url + "/auth/register", reqData)
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
            throw res.status;
          })
          .then(() => {
            //login (if response is ok)
            fetch(this.api.url + "/auth/login", reqData)
              .then(function (res) {
                if (res.ok) {
                  return res.json();
                }
                throw res.status;
              })
              .then((res) => {
                //update vuex var and localstorage and redirect to Home view
                this.$store.state.user.isLogged = true;
                this.$store.state.user.id = res.id;
                this.$store.state.user.username = res.username;
                this.$store.state.user.token = res.token;
                this.$store.state.user.isAdmin = res.isAdmin;
                let localStorageData = {
                  token: res.token,
                  username: res.username,
                  id: res.id,
                  isAdmin: res.isAdmin,
                };
                localStorage.setItem("data", JSON.stringify(localStorageData));
                this.$router.push("/");
              });
          })
          .catch((err) => {
            console.log('Error :' + err);
            if (err === 409) {
              this.alertMsg = "E-mail déja utilisé !";
            } else if (err === 429) {
              this.alertMsg = "Trop de tentatives! Réessayez plus tard!";
            } else {
              this.alertMsg = 'Erreur :' + err;
            }
            this.alertError = true;
          });
      } else {
        this.alertError = true;
        this.alertMsg = "Vous êtes déjà connecté";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/auth.scss";
</style>

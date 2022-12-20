<template>
  <div class="identify">
  <div class="row shadow-sm p-3 mb-5 rounded">
    <div class="col-md-6 offset-md-3 col-sm-12 offset-sm-1">
      <form id="login-form" role="form" style="display: block;" @submit.prevent="onSubmit">
        <h3 class="text-center">Login</h3>
        <div class="form-group">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Email Address"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-dark" style="width: 100%" :disabled="isLoading">
            <i v-if="isLoading" class="fa fa-spinner fa-spin" />
            Log in
          </button>
          <div>
          <div class="google-signIn">
            <button @click="googleSignIn">
                   <img src="../../assets/styles/images/btn_google_dark_normal_ios.svg" alt="Google Singin">
            </button>
          </div>
  </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <router-link to="/register">
                  <a>Dont have an account yet? Register</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import firebase from "firebase";
export default {
  name: "SignUp",
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['addMessage', 'clearMessage', 'loginWithEmail']),
    onSubmit() {
      this.isLoading = true
      let data = {
        email: this.email,
        password: this.password
      }
      this.loginWithEmail(data).then(() => {
        this.clearMessage();
        this.$router.push({
          name: 'mainpage'
        });
      }).catch((error) => {
        let message_obj = {
          message: error.message,
          messageClass: "danger",
          autoClose: true
        }
        this.addMessage(message_obj);
      }).then(() => {
        this.isLoading = false
      })
    },
    googleSignIn: function() {
      // We'll create functionality here
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
            console.log(token) // Token
            console.log(user) 
            this.$router.push({
          name: 'mainpage'
        });
            // User that was authenticated
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    }
  }
    
}
</script>
<style >
.shadow-sm{
  background-color: #F1F1F1;
  max-width: 100%;
  margin-left:2px
}
.identify{
  margin-left:20px
}
.google-signIn button{
  border: none;

}
.google-signIn{
  justify-content: center;
  align-items: center;
  margin-left: 42%;
  padding: 10px;
}
@media screen and (max-width:425px ){
  .google-signIn{
  justify-content: center;
  align-items: center;
  margin-left: 37%;
  padding: 10px;
}
}
</style>

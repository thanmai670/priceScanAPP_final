<template>
  <div class="identify">
    <div class="row shadow-sm p-3 mb-5 rounded">
  
  <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
    <form id="register-form" role="form" @submit.prevent="onSubmit">
      <h3 class="text-center">Register</h3>
      <div class="form-group">
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Email Address"
          value
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
        <input
          type="password"
          name="password"
          id="ConfirmPassword"
          class="form-control"
          placeholder="Confirm Password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-dark" style="width: 100%" :disabled="isLoading">
          <i v-if="isLoading" class="fa fa-spinner fa-spin" />
          Register
        </button>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/login">
                <a>Already a member ? Login</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div></div>
  
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['clearMessage', 'addMessage', 'registerByEmail']),
    onSubmit() {
      
      this.isLoading = true
      
      let data = {
        email: this.email,
        password: this.password,
      }
      this.registerByEmail(data).then(() => {
        this.clearMessage();
        this.$router.push({ name: 'mainpage' });
      })
        .catch((error) => {
          // console.log('register error', error);
          let message_obj = {
            message: error.message,
            messageClass: "danger",
            autoClose: true
          }
          this.addMessage(message_obj);
        }).then(() => {
          this.isLoading = false
        })
    
  }
  }
}
</script>
<style>
.shadow-sm{
  background-color: #F1F1F1;
  max-width: 100%;
  margin-left:10px
}
.identify{
  margin-left:20px;

}

</style>

<!-- eslint-disable no-unused-vars -->
<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <img class="navbar-logo" src="../assets/styles/images/price-tag.png" alt="logo.png">
    <router-link to="/" class="navbar-brand mr-auto">Price Scan</router-link>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTop"
        aria-controls="navbarTop"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- <template >
  <ais-instant-search :search-client="searchClient" index-name="products">
    <ais-search-box class="searchbox"/>
    <ais-hits >
     <template v-slot:item="{ item }">
        <h2>{{ item.title }}</h2>
      </template>
    </ais-hits>
  </ais-instant-search>
</template> -->
 

    <div class="collapse navbar-collapse" id="navbarTop" :class="{show: isNavOpen}">
      <ul class="navbar-nav mr-auto">

      </ul>
      <ul class="nav navbar-nav">
        <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Login</a>
        </router-link>
        <li v-if="isLoggedIn" class="li-pointer nav-item">
          <a @click="logout" class="nav-link">Logout {{ userEmail }}</a>
        </li>
        <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
          <a class="nav-link">Register</a>
        </router-link>
        <li>
          <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
            List <span class="badge badge-dark">{{ numItems }} (€ {{ cartValue }})</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <!-- /.container -->
</nav>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
// eslint-disable-next-line no-unused-vars
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';
export default {
  data() {
    return {
      isNavOpen: false,
      searchClient: algoliasearch(
        'EISJ6HLTKK',
        '94e369bf1a16b7395c44b2bd30547bef'
      ),
      
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    }
  }
}
</script>


<style scoped lange="sass">
.navbar-btn a {
  color: white; 
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
.navbar-logo{
  margin-right: 10px;
  width:30px;
  height:30px;
}

.navbar-btn {
  margin-left: 10px;

}
body {
  font-family: sans-serif;
  padding: 1em;
}
.searchbox{
  margin-left: 275px;
  
}

</style>

<template>
<div class="container" :class="{loadingItem: isProductLoading}">
    <div class="search-holder">
      <div class="search-holder__banner">
        <div class="col-xs-12 text-center hero-header-container">
          <div class="search-bar">
            <div class="form-holder">
              <div class="navbarSearch">
                <input
                v-model="searchQuery"
                  class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"
                  type="text"
                  placeholder="Find the Best Prices for your groceries and essentials."
                />
              </div>
              <img
                class="icon"
                src="https://hackr.io/assets/images/header-icons/search-header.svg"
                width="17"
                height="17"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="row text-center" v-if="isProductLoading">
    <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
  </div>
  <div v-else class="row action-panel">
    <div class="col-12">
      <div class="btn-group btn-group-sm pull-right">
				<button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
          <i class="fa fa-list" aria-hidden="true"></i> List
				</button>
				<button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
          <i class="fa fa-th" aria-hidden="true"></i> Grid
				</button>
      </div>
    </div>
  </div>


  <div class="row" v-if="!isProductLoading">
    <app-product-item v-for="prod in filteredProducts" :item="prod" :key="prod.id" :displayList="displayList"></app-product-item>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from './product/ProductItem.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';



export default {

  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false,
      searchQuery: "",
    }
    
  },
  computed: {
    ...mapGetters(['products', 'isProductLoading',]),
    filteredProducts:function(){
      return this.products.filter((product)=>{
        return product.title.toLowerCase().match(this.searchQuery.toLowerCase());
      })

    }
    
  },
  components: {
    appProductItem: ProductItem,
    GridLoader,

  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    },
    
  }
}
</script>

<style lang="scss">
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
.search-holder {
  margin-top: 10px;
  padding:20px;
    &__banner {
      margin: 0 auto;
      width: 80%;
      padding-left: 15px;
      padding-right: 15px;
      text-align: center;
    }
    &__fullbanner {
      margin: 0 auto;
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      text-align: center;
    }
    .hero-header {
      margin: 0 0 25px;
      line-height: 1;
      font-size: 34px;
    }
    .search-bar {
      .form-holder {
        position: relative;
      }
      .form-control {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out 0.15s,
          -webkit-box-shadow ease-in-out 0.15s;
        -o-transition: border-color ease-in-out 0.15s,
          box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      }
      .navbar-search-input {
        z-index: 1 !important;
        height: 51px;
        font-size: 18px;
        padding: 6px 18px 7px 45px;
        background-color: #ffffff !important;
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.11);
        border-color: #eeeeee;
      }
      .icon {
        left: 12px;
        font-size: 18px;
        padding-left: 2px;
        opacity: 0.7;
        color: var(--theme-primary-light);
        position: absolute;
        top: 50%;
        left: 17px;
        transform: translateY(-50%) scale(1.1);
        opacity: 0.5;
        z-index: 2;
        transition: all 0.2s linear;
      }
    }
  }

</style>

<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./layout/header/Header.vue";
import Footer from "./layout/footer/Footer.vue";

export default {
  data() {
    return {
      isLogout: this.$store.state.auth.isLogin,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {},
  updated() {},
  async created() {
    await this.$store.dispatch("updateCartCurrent");
  },
};
</script>

<template>
  <Header
    v-if="
    // nếu là các mảng đường dẫn home, register... thì sẽ có component header hiển thị
      [
        'home',
        'register',
        'products',
        'product',
        'search-product',
        'contact',
        'login',
      ].indexOf($route.name) > -1
    "
  />
  <RouterView />
  <Footer
    v-if="
      [
        'login',
        'home',
        'register',
        'products',
        'product',
        'search-product',
        'contact',
      ].indexOf($route.name) > -1
    "
  />
</template>

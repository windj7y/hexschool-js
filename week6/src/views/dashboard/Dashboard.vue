<template>
  <div id="admin">
    <div class="nav">
      <div class="container text-center">
        <router-link to="/">前台首頁</router-link> |
        <router-link to="/admin/products">產品列表</router-link> |
        <router-link to="/admin/coupons">優惠券</router-link> |
        <router-link to="/admin/orders">訂單列表</router-link> |
        <router-link to="/admin/storage">圖片儲存列表</router-link> |
        <a href="#" @click.prevent="logout">登出</a>
      </div>
    </div>
    <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const url = `${process.env.VUE_APP_APIPATH}api/auth/check`;

      this.$http.post(url, { api_token: this.token })
        .then((res) => {
          this.checkSuccess = res.data.success;
        })
        .catch((error) => {
          console.log(error);
          this.$router.push('/login');
        });
    },
    logout() {
      document.cookie = 'hexToken=; expires=';
      this.$router.push('/login');
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>

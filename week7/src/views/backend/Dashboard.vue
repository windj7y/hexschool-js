<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark-gray mb-5">
      <div class="container">
        <router-link class="navbar-brand" to="/admin/products">Book思議 - 後台管理</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/admin/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupons">優惠券列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/orders">訂單列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/storages">圖片儲存列表</router-link>
            </li>
            <li class="nav-item">
              <a href="#" @click.prevent="logout">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
        .catch(() => {
          this.$toastr.e('驗證失敗，請重新登入');
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

<style lang="scss">
.navbar-nav {
  .nav-item {
    a {
      display: block;
      padding: 10px;
      color: rgba(255,255,255,0.85);

      &:hover {
        color: #ffffff;
      }

      &.router-link-exact-active {
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}

.bg-dark-gray {
  background-color: #494e4e;
}
</style>

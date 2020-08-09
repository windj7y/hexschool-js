<template>
  <div class="login">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <form class="form-login" @submit.prevent="login">
        <h2 class="h3 mb-3"><i class="fas fa-adjust"></i> 後台管理系統</h2>
        <div class="form-group">
          <label for="email">電子郵件</label>
          <input type="email" class="form-control" id="email" placeholder="請輸入電子郵件" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" class="form-control" id="password" placeholder="請輸入密碼" v-model="user.password" required>
        </div>
        <button class="btn btn-lg btn-primary btn-block"><i class="fas fa-sign-in-alt"></i> 登入</button>
        <div class="text-right mt-2">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/auth/login`;

      this.$http.post(url, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token } = res.data;
          const { expired } = res.data;

          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)};`;
          this.$router.push('/admin/products');
        })
        .catch(() => {
          this.isLoading = false;
          this.$toastr.e('登入失敗，請重新登入');
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  background: linear-gradient(to bottom, #17a2b8 50%, #f5f5f5 50%) no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-login {
    background-color: #fff;
    max-width: 330px;
    padding: 35px 40px;
    margin: auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.20);

    h2 {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }

    label {
      text-align: left;
      color: #666;
      font-weight: bold;
    }
  }
}
</style>

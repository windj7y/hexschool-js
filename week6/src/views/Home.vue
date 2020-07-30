<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4" id="nav">
      <div class="container">
        <router-link class="navbar-brand" to="/">Book思議</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout">結帳</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#nav {
  a {
      &.router-link-exact-active {
        color: #fff;
      }
  }
}
</style>

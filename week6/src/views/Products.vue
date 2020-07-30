<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="text-center">產品列表</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" class="text-left" width="200">產品名稱</th>
          <th scope="col">介紹</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-left">{{ item.title }}</td>
          <td class="text-left">{{ item.content }}</td>
          <td>{{ item.price }}</td>
          <td>
            <router-link :to="`/product/${item.id}`">看產品</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.table {
  th {
    text-align: center;
  }

  td {
    text-align: center;
    vertical-align: middle;
  }
}
</style>

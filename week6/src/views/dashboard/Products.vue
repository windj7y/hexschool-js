<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="text-center">產品列表</h2>
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col" class="text-left" width="150">分類</th>
          <th scope="col" class="text-left">產品名稱</th>
          <th scope="col" width="120">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-left">{{ item.category }}</td>
          <td class="text-left">{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
              <span class="icon-green" v-if="item.enabled">O</span>
              <span class="icon-red" v-else>X</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
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

.icon-green {
  color: #00e000;
}

.icon-red {
  color: red;
}
</style>

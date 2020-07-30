<template>
  <div class="container text-center">
    <loading :active.sync="isLoading"></loading>
    <h2>單一產品頁面</h2>
    <h3 class="mt-4">{{ product.title }}</h3>
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.data;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

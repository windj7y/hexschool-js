<template>
  <div class="text-center">
    <h2>這是結帳頁</h2>
    <button type="button" class="btn btn-info mt-2" @click="checkout"><font-awesome-icon icon="check"/> 確定結帳</button>
  </div>
</template>

<script>
export default {
  methods: {
    checkout() {
      this.$router.push('/complete');
    },
  },
};
</script>

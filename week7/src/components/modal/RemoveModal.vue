<template>
  <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="removeModalLabel" aria-hidden="true">
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="removeModalLabel">刪除產品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否刪除：【{{ tempProduct.title }}】產品？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="removeProduct()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempProduct'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    removeProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;

      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          $('#removeModal').modal('hide');
          this.$toastr.s('刪除產品成功');
          this.$emit('update');
        })
        .catch(() => {
          this.isLoading = false;
          $('#removeModal').modal('hide');
          this.$toastr.e('刪除產品失敗');
        });
    },
  },
};
</script>

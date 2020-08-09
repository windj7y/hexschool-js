<template>
  <div class="modal fade" id="removeImageModal" tabindex="-1" role="dialog" aria-labelledby="removeImageModalLabel" aria-hidden="true">
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="removeImageModalLabel">刪除圖片</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否刪除此圖片？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="removeStorage()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempStorage'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    removeStorage() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`;

      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          $('#removeImageModal').modal('hide');
          this.$toastr.s('刪除圖片成功');
          this.$emit('update');
        })
        .catch(() => {
          this.isLoading = false;
          $('#removeImageModal').modal('hide');
          this.$toastr.e('刪除圖片失敗');
        });
    },
  },
};
</script>

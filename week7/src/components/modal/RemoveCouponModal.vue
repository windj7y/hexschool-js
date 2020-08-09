<template>
  <div class="modal fade" id="removeCouponModal" tabindex="-1" role="dialog" aria-labelledby="removeCouponModalLabel" aria-hidden="true">
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="removeCouponModalLabel">刪除優惠券</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否刪除：【{{ tempCoupon.title }}】優惠券？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="removeCoupon()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempCoupon'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    removeCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;

      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          $('#removeCouponModal').modal('hide');
          this.$toastr.s('刪除優惠券成功');
          this.$emit('update');
        })
        .catch(() => {
          this.isLoading = false;
          $('#removeCouponModal').modal('hide');
          this.$toastr.e('刪除優惠券失敗');
        });
    },
  },
};
</script>

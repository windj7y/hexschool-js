<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="couponModalLabel" v-if="tempCoupon.id">編輯優惠券</h5>
          <h5 class="modal-title" id="couponModalLabel" v-else>新增優惠券</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="updateCoupon">
            <div class="modal-body">
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="title">名稱</label>
                  <input type="text" class="form-control" :class="classes" name="名稱" id="title" v-model="tempCoupon.title" placeholder="請輸入名稱">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="code">優惠碼</label>
                  <input type="text" class="form-control" :class="classes" name="優惠碼" id="code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="row">
                <div class="form-group col-6">
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <label for="deadline_date">到期日</label>
                    <input type="date" class="form-control" :class="classes" name="到期日" id="deadline_date" v-model="deadline.date">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group col-6">
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <label for="deadline_time">到期時間</label>
                    <input type="time" step="1" class="form-control" :class="classes" name="到期時間" id="deadline_time" v-model="deadline.time">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="form-group">
                <validation-provider rules="required|numeric" v-slot="{ errors, classes }">
                  <label for="percent">折扣百分比</label>
                  <input type="number" class="form-control" :class="classes" name="折扣百分比" id="percent" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="enabled" v-model="tempCoupon.enabled">
                  <label class="form-check-label" for="enabled">是否啟用</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button class="btn btn-info" :disabled="invalid">確認</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempCoupon', 'deadline'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    updateCoupon() {
      this.isLoading = true;
      this.tempCoupon.deadline_at = `${this.deadline.date} ${this.deadline.time}`;

      // 新增優惠券
      let url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let method = 'post';
      let type = '新增';

      // 編輯優惠券
      if (this.tempCoupon.id) {
        url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        method = 'patch';
        type = '編輯';
      }

      this.$http[method](url, this.tempCoupon)
        .then(() => {
          this.isLoading = false;
          $('#couponModal').modal('hide');
          this.$toastr.s(`${type}優惠券成功`);
          this.$emit('update');
        })
        .catch(() => {
          this.isLoading = false;
          $('#couponModal').modal('hide');
          this.$toastr.e(`${type}優惠券失敗`);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-6">
        <h3><i class="fas fa-user-tag"></i> 優惠券列表</h3>
      </div>
      <div class="col-6 text-right">
        <button type="button" class="btn btn-info" @click="showModal('', 'couponModal')">新增優惠券</button>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" class="text-left">名稱</th>
          <th scope="col" width="140">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col" width="140">是否啟用</th>
          <th scope="col" width="100">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-left">{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.deadline.datetime }}</td>
          <td>
            <span class="icon-green" v-if="item.enabled"><i class="fas fa-check"></i></span>
            <span class="icon-red" v-else><i class="fas fa-times"></i></span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm mr-1" title="編輯" @click="showModal(item, 'couponModal')" :disabled="loadingItem === item.id">
              <i v-if="loadingItem === item.id" class="spinner-border spinner-border-sm"></i>
              <i v-else class="fas fa-pen"></i>
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" title="刪除" @click="showModal(item, 'removeCouponModal')"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pages="pagination" @update="getCoupons"></pagination>
    <couponModal :tempCoupon="tempCoupon" :deadline="deadline" @update="getCoupons"></couponModal>
    <removeCouponModal :tempCoupon="tempCoupon" @update="getCoupons"></removeCouponModal>
  </div>
</template>

<script>
/* global $ */

import couponModal from '@/components/modal/CouponModal.vue';
import removeCouponModal from '@/components/modal/RemoveCouponModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    couponModal,
    removeCouponModal,
    pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      deadline: {
        date: '',
        time: '',
      },
      pagination: {},
      paged: 10,
      isLoading: false,
      loadingItem: '',
    };
  },
  methods: {
    showModal(item, modalName) {
      this.tempCoupon = item === '' ? {} : JSON.parse(JSON.stringify(item));

      if (this.tempCoupon.id && modalName === 'couponModal') {
        this.getCoupon(this.tempCoupon.id);
        return;
      }
      $(`#${modalName}`).modal('show');
    },
    getCoupons(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}&paged=${this.paged}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          this.$toastr.e('無法顯示優惠券列表');
        });
    },
    getCoupon(id) {
      this.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;

      this.$http.get(url)
        .then((res) => {
          this.loadingItem = '';
          this.tempCoupon = res.data.data;

          const deadlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.deadline.date, this.deadline.time] = deadlineAt;
          $('#couponModal').modal('show');
        })
        .catch(() => {
          this.loadingItem = '';
          this.$toastr.e('無法取得優惠券資料');
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

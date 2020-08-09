<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-12">
        <h3><i class="fas fa-image"></i> 圖片儲存列表</h3>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" width="70%">圖片縮圖</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in storages" :key="item.id">
          <td>
            <img :src="item.path" class="thumbnail">
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" title="刪除" @click="showModal(item)"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pages="pagination" @update="getStorages"></pagination>
    <removeImageModal :tempStorage="tempStorage" @update="getStorages"></removeImageModal>
  </div>
</template>

<script>
/* global $ */

import removeImageModal from '@/components/modal/RemoveImageModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    removeImageModal,
    pagination,
  },
  data() {
    return {
      storages: [],
      tempStorage: {},
      pagination: {},
      paged: 10,
      isLoading: false,
    };
  },
  methods: {
    showModal(item) {
      this.tempStorage = JSON.parse(JSON.stringify(item));
      $('#removeImageModal').modal('show');
    },
    getStorages(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}&paged=${this.paged}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.storages = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          this.$toastr.e('無法顯示圖片列表');
        });
    },
  },
  created() {
    this.getStorages();
  },
};
</script>

<style lang="scss">
.thumbnail {
  max-width: 200px;
  height: auto;
}
</style>

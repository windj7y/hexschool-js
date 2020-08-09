<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel" v-if="tempProduct.id">編輯產品</h5>
          <h5 class="modal-title" id="productModalLabel" v-else>新增產品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="updateProduct">
            <div class="modal-body">
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="imageUrl">* 圖片網址</label>
                      <input type="text" class="form-control" :class="classes" name="圖片網址" id="imageUrl" v-model="tempProduct.imageUrl[0]" placeholder="請輸入圖片網址">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label for="imageFile">或 上傳圖片</label>
                    <input type="file" class="form-control-file" id="imageFile" ref="file" @change="uploadFile">
                    <div class="mt-2" v-if="uploadingStatus">圖片上傳中...</div>
                  </div>
                  <img :src="tempProduct.imageUrl[0]" class="img-fluid mt-3">
                </div>
                <div class="col-8">
                  <div class="form-group">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                      <label for="title">* 產品名稱</label>
                      <input type="text" class="form-control" :class="classes" name="產品名稱" id="title" v-model="tempProduct.title" placeholder="請輸入產品名稱">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <validation-provider rules="required" v-slot="{ errors, classes }">
                        <label for="category">* 產品分類</label>
                        <input type="text" class="form-control" :class="classes" name="產品分類" id="category" v-model="tempProduct.category" placeholder="請輸入產品分類">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-6">
                      <label for="unit">單位</label>
                      <input type="text" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <validation-provider rules="numeric" v-slot="{ errors, classes }">
                        <label for="origin_price">原價</label>
                        <input type="number" class="form-control" :class="classes" name="原價" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="form-group col-6">
                      <validation-provider rules="numeric" v-slot="{ errors, classes }">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" :class="classes" name="售價" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-12">
                      <validation-provider rules="required" v-slot="{ errors, classes }">
                        <label for="content">* 產品描述</label>
                        <textarea class="form-control" :class="classes" name="產品描述" id="content" rows="5" v-model="tempProduct.content" placeholder="請輸入產品描述"></textarea>
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-12">
                      <validation-provider rules="required" v-slot="{ errors, classes }">
                        <label for="description">* 說明內容</label>
                        <textarea class="form-control" :class="classes" name="說明內容" id="description" rows="5" v-model="tempProduct.description" placeholder="請輸入說明內容"></textarea>
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-4">
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="ishot" v-model="tempProduct.options.isHot">
                        <label class="form-check-label" for="ishot">是否為熱門產品</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-4">
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="enabled" v-model="tempProduct.enabled">
                        <label class="form-check-label" for="enabled">是否啟用</label>
                      </div>
                    </div>
                  </div>
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
  props: ['tempProduct'],
  data() {
    return {
      isLoading: false,
      uploadingStatus: false,
    };
  },
  methods: {
    updateProduct() {
      this.isLoading = true;

      // 新增產品
      let url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let method = 'post';
      let type = '新增';

      // 編輯產品
      if (this.tempProduct.id) {
        url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        method = 'patch';
        type = '編輯';
      }

      this.$http[method](url, this.tempProduct)
        .then(() => {
          this.isLoading = false;
          $('#productModal').modal('hide');
          this.$toastr.s(`${type}產品成功`);
          this.$emit('update');
        })
        .catch(() => {
          this.isLoading = false;
          $('#productModal').modal('hide');
          this.$toastr.e(`${type}產品失敗`);
        });
    },
    uploadFile() {
      const file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.uploadingStatus = true;

      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.uploadingStatus = false;
          this.tempProduct.imageUrl.push(res.data.data.path);
          this.$toastr.s('上傳圖片成功');
        })
        .catch(() => {
          this.uploadingStatus = false;
          this.$toastr.e('上傳圖片失敗，請檢查圖片大小是否超過 2MB');
        });
    },
  },
};
</script>

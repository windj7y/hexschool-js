Vue.component('productview', {
    props: ['tempData', 'user', 'status'],
    template: '#productView',
    methods: {
        updateData() {
            //新增產品
            let url    = `${ this.user.api }${ this.user.uuid }/admin/ec/product`;
            let method = 'post';

            //編輯產品
            if(this.tempData.id) {
                url    = `${ this.user.api }${ this.user.uuid }/admin/ec/product/${ this.tempData.id }`;
                method = 'patch';
            }

            axios.defaults.headers.common.Authorization = `Bearer ${ this.user.token }`;
            axios[method](url, this.tempData)
                .then(() => {
                    $('#productView').modal('hide');
                    this.$emit('get-data');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        uploadFile() {
            //使用 $refs 從父元件取得子元件的資料，需先在html element加入ref的attribute
            const file = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const url = `${ this.user.api }${ this.user.uuid }/admin/storage`;
            axios.defaults.headers.common.Authorization = `Bearer ${ this.user.token }`;
            this.status.uploadingFile = true;
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.status.uploadingFile = false;
                this.tempData.imageUrl.push(response.data.data.path);
            })
            .catch(error => {
                this.status.uploadingFile = false;
                console.log('上傳圖檔不可超過 2MB', error);
            });
        }
    }
})

Vue.component('removeview', {
    props: ['tempData', 'user'],
    template: '#removeView',
    methods: {
        removeData() {
            const url = `${ this.user.api }${ this.user.uuid }/admin/ec/product/${ this.tempData.id}`;
            axios.defaults.headers.common.Authorization = `Bearer ${ this.user.token }`;
            axios.delete(url)
                .then(response => {
                    $('#removeView').modal('hide');
                    this.$emit('get-data');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});

Vue.component('pagination', {
    props: ['pages'],
    template: '#pagination',
    methods: {
        updatePages(page) {
            this.$emit('get-data', page);
        }
    }
})

new Vue({
    el: '#app',
    data() {
        return {
            user: {
                api:   'https://course-ec-api.hexschool.io/api/',
                uuid:  '4e04c0f4-4640-4a82-9572-23fa0dfcbfa2',
                token: ''
            },
            products: [],
            status: {
                uploadingFile: false
            },
            tempData: {
                imageUrl: [],
            },
            pagination: {},
        }
    },
    methods: {
        showModal(item, modalName) {
            this.tempData = item == '' ? { imageUrl: [] } : JSON.parse(JSON.stringify(item));
            if(this.tempData.id && modalName == 'productView') {
                this.getSingleData(this.tempData.id);
                return;
            }
            $(`#${ modalName }`).modal('show');
        },
        getData(page = 1) {
            const url = `${ this.user.api }${ this.user.uuid }/admin/ec/products?page=${ page }`;
            axios.defaults.headers.common.Authorization = `Bearer ${ this.user.token }`;
            axios.get(url)
                .then(response => {
                    this.products   = response.data.data;
                    this.pagination = response.data.meta.pagination;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getSingleData(id) {
            const vm  = this;
            const url = `${ vm.user.api }${ vm.user.uuid }/admin/ec/product/${ id }`;
            axios.defaults.headers.common.Authorization = `Bearer ${ vm.user.token }`;
            axios.get(url)
                .then(response => {
                    vm.tempData = response.data.data;
                    $('#productView').modal('show');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        this.getData();
    }
});
import zh_TW from './zh_TW.js';

Vue.component('loading', VueLoading);
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// Class 設定檔案
VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
});

// 將語系加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

// 千分位轉換
Vue.filter('money', function(num) {
    var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
});

new Vue({
    el: '#cart',
    data: {
        api: 'https://course-ec-api.hexschool.io/api/',
        uuid: '4e04c0f4-4640-4a82-9572-23fa0dfcbfa2',
        cart: [],
        cartTotal: 0,
        quantity: 0,
        isLoading: false,
        form: {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: ''
        }
    },
    methods: {
        getCart() {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/shopping`;
            
            axios.get(url)
                .then(res => {
                    this.cart      = res.data.data;
                    this.cartTotal = 0;
                    this.quantity  = 0;

                    this.cart.forEach(item => {
                        let subTotal    = item.product.price * item.quantity
                        this.cartTotal += subTotal;
                        this.quantity  += item.quantity;
                    });

                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        },
        removeAllCart() {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/shopping/all/product`;

            axios.delete(url)
                .then(res => {
                    this.getCart();
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        },
        removeCart(id) {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/shopping/${ id }`;
            
            axios.delete(url)
                .then(res => {
                    this.getCart();
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        },
        updateQuantity(id, num) {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/shopping`;
            const updateData = {
                product: id,
                quantity: num
            }
            
            axios.patch(url, updateData)
                .then(res => {
                    this.getCart();
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        },
        createOrder() {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/orders`;
            
            axios.post(url, this.form)
                .then(res => {
                    this.isLoading = false;
                    $(this.$refs.orderModal).modal('show');
                    
                    setTimeout(() => {
                        $(this.$refs.orderModal).modal('hide');
                        this.getCart();
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        }
    },
    created() {
        this.getCart();
    }
})
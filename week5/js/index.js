Vue.component('loading', VueLoading);

new Vue({
    el: '#app',
    data: {
        api: 'https://course-ec-api.hexschool.io/api/',
        uuid: '4e04c0f4-4640-4a82-9572-23fa0dfcbfa2',
        products: [],
        quantity: 0,
        errorMsg: '',
        isLoading: false,
    },
    methods: {
        getProducts() {
            this.isLoading = true;
            const url = `${ this.api }${ this.uuid }/ec/products`;
            
            axios.get(url)
                .then(res => {
                    this.products  = res.data.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                })
        },
        addCart(id) {
            this.isLoading = true;
            const url  = `${ this.api }${ this.uuid }/ec/shopping`;
            const cart = {
                product: id,
                quantity: '1'
            };
            
            axios.post(url, cart)
                .then(res => {
                    this.isLoading = false;
                    $(this.$refs.cartModal).modal('show');
                    
                    setTimeout(() => {
                        $(this.$refs.cartModal).modal('hide');
                        this.getQuantity();
                    }, 1000);
                })
                .catch(error => {
                    this.errorMsg  = error.response.data.errors[0];
                    this.isLoading = false;
                    $(this.$refs.errorModal).modal('show');
                    
                    setTimeout(() => {
                        $(this.$refs.errorModal).modal('hide');
                    }, 1000);
                })
        },
        getQuantity() {
            const url = `${ this.api }${ this.uuid }/ec/shopping`;
            
            axios.get(url)
                .then(res => {
                    this.quantity = res.data.data.length === 0 ? 0 : res.data.data.map(item => item.quantity).reduce((first, current) => first + current);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    created() {
        this.getProducts();
        this.getQuantity();
    }
})
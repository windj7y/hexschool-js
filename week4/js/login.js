new Vue({
    el: '#app',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        signin() {
            axios.post('https://course-ec-api.hexschool.io/api/auth/login', this.user)
                .then(response => {
                    const token   = response.data.token;
                    const expired = response.data.expired;
                    //儲存cookie
                    document.cookie        = `hexToken=${ token }; expires=${ new Date(expired * 1000) }; path=/`;
                    document.location.href = 'product.html';
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
})
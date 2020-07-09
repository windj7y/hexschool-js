const app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1593945793253,
                title: '驀然回首，你依然在',
                category: '愛情小說',
                content: '在那些褪色的時光記憶裡，我想念著你，在那些閃亮的未來憧憬裡，我愛著你。',
                description: '所有的愛情關係都只會有兩種結果：一、他們修成正果；二、他們分手。',
                imageUrl: 'https://upload.cc/i1/2020/06/30/DjcqMl.jpg',
                enabled: true,
                origin_price: 220,
                price: 198,
                unit: '本',
                stock: 2,
                checkoutChecked: ['1', '2']
            },
            {
                id: 1593945950556,
                title: '在天堂遇見的下一個人',
                category: '心理勵志',
                content: '上一個故事沒寫的是 ── 與死亡擦身而過的女孩，是如何度過此生？當她踏上自己的天堂旅程，才明白每個錯誤背後都有著更大的目的。',
                description: '生命與生命之間不但彼此相連，每一次結束也是另一個開始。',
                imageUrl: 'https://upload.cc/i1/2020/06/30/CIjA3n.jpg',
                enabled: true,
                origin_price: 300,
                price: 237,
                unit: '本',
                stock: 5,
                checkoutChecked: ['1', '3']
            },
            {
                id: 1593949467825,
                title: '算計',
                category: '推理小說',
                content: '12位年齡不同、身份不同、目的不同的參與者，應徵了一份超高時薪的工作，必須待在一個地下密室長達七天之久，中途不得離開。',
                description: '本書就是在異常、異樣的氛圍之中，用一種強烈的手法來塑造無比有趣的推理小說。',
                imageUrl: 'https://upload.cc/i1/2020/07/02/VlwBWs.jpg',
                enabled: false,
                origin_price: 300,
                price: 270,
                unit: '本',
                stock: 0,
                checkoutChecked: []
            }
        ],
        checkoutMethod: [
            {
                classId: 1,
                className: '信用卡付款'
            },
            {
                classId: 2,
                className: 'ATM轉帳'
            },
            {
                classId: 3,
                className: '超商取貨付現'
            },
            {
                classId: 4,
                className: '貨到付款'
            }
        ],
        tempData: ''
    },
    methods: {
        showModal(item, modalName) {
            //未先定義checkoutChecked的話，會產生選取的問題
            this.tempData      = item == '' ? { checkoutChecked: [] } : JSON.parse(JSON.stringify(item));
            $(`#${ modalName }`).modal('show');
        },
        removeData() {
            this.products.splice(this.products.findIndex(item => item.id === this.tempData.id), 1);
            this.tempData = {};
            $('#removeView').modal('hide');
        },
        updateData() {
            if(this.tempData.id) {
                this.products.forEach((item, index) => {
                    if(item.id === this.tempData.id) {
                        //強制加入雙向綁定，這樣資料才能正確渲染到畫面上
                        this.$set(this.products, index, this.tempData);
                    }
                });
            }
            else {
                this.tempData.id = new Date().getTime();
                this.products.push(this.tempData);
            }
            this.tempData = {};
            $('#productView').modal('hide');
        }
    }
});
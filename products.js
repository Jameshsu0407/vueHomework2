import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
	data() {
		return {
			apiUrl: "https://vue3-course-api.hexschool.io/v2",
			apiPath: "cation_api",
			products: [],
			tempProduct: {},
		};
	},
	methods: {
        // 確認是否登入
		checkLogin() {
			const url = `${this.apiUrl}/api/user/check`;
			axios
				.post(url)
				.then(() => {
					this.getData();
				})
				.catch((err) => {
					alert(err.response.data.message);
					window.location = "login.html";
				});
		},
        // 取得資料
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
			axios
				.get(url)
				.then((res) => {
					this.products = res.data.products;
                    // console.log(this.products)
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
        },
	},
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)cationToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
		axios.defaults.headers.common.Authorization = token;
		this.checkLogin();
	},
}).mount("#app");

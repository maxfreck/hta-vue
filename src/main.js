import "./.app/app.ico"

import Vue from "vue"
import App from "./.app/components/App.vue"

new Vue({
	render: h => h(App),
}).$mount('#app')

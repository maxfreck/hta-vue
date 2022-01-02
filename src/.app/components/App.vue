<template>
	<div id="app">
			<h1 :title="this.thisMoment">Hello, {{ userName }}, this is HTA powered by Vue.js!</h1>
			<p>Enter your name <input v-model="username" placeholder="..."></p>
	</div>
</template>

<script>
export default {
	computed: {
		thisMoment: function() {
			return new Date().toString();
		},

		userName: function() {
			return this.username === '' ? 'Mr. Incognito' : this.username;
		},
	},

	data: function() {
		return {
			username: ''
		}
	}
}
</script>

<style lang="css">
html {
	margin: 0;
	padding: 0;
	height: 100%;
	color: #d9d9d9;
	text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
	background-image: linear-gradient(to bottom, #4e54c8 0%, #8f94fb 100%);
	font-family: sans-serif;
	text-align: center;
}
body {
	margin: 0;
	padding: 0;
}
</style>
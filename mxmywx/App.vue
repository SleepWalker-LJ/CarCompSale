<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		globalData: {
			http: 'https://www.mxmywx.com',
			selectedMenuId:1,
			queryResult1:[],
			user:{},
			header:{'Cookie': ''},
			article:[],
			listDetail:[]
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./styles/iconfont.wxss";
	@import "./styles/base.wxss";
</style>

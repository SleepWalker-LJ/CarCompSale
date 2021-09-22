<template>
	<view>
		<web-view v-if="content" :src="content"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productPageId:'',
				content:'',
			}
		},
		onLoad(options) {
			this.productPageId=options.id
		},
		methods: {
			getSeriesDetail(){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/productPage/getProductPageById.api?productPageId=${this.productPageId}`
				})
				.then(res=>{
					this.content=res.data.content
					console.log("加强件详情："+res.data);
				})
			}
		},
		mounted() {
			this.getSeriesDetail()
		}
	}
</script>

<style lang="scss">
	
</style>

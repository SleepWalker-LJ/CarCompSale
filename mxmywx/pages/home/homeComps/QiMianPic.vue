<template>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			articleImgs:Array
		},
		methods: {
			itemClick(index){
				console.log("dasdsa");
				uni.navigateTo({
					url:`./ArticleDetail?id=${index}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qimian-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.qimian-item {
			padding: 10rpx;
			width: 40%;
			height: 200rpx;

			image {}
		}
	}
</style>

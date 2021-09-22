<template>
	<view>
		<view class="fitting-item" v-for="(item,index) in fittingsList" :key="key">
			<navigator :url="`seriesDetail/SeriesDetail?id=${item.productPageId}`">
				<view class="fitting-item-title">{{item.title}}</view>
				<image v-if="item.img" :src="item.img" mode=""></image>
				<view class="fitting-item-introduce">{{item.introduction}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fittingsList:[],      // 加强件列表
			}
		},
		methods: {
			getFittingsList(){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/product/getAllProduct.api`
				})
				.then(res=>{
					this.fittingsList=res.data
					console.log("加强件："+res.data);
				})
			}
		},
		mounted() {
			this.getFittingsList()
		}
	}
</script>

<style lang="scss">
	.fitting-item{
		margin: 10rpx;
		border: 3rpx #333 solid;
		.fitting-item-title{
			font-size: 40rpx;
			font-weight: 700;
			padding: 18rpx;
			// margin-top: 10rpx;
			text-align: center;
			color: #fccf01;
			background-color: #333;
		}
		image{
			padding: 5%;
		}
		.fitting-item-introduce{
			text-indent: 2em;
			text-align: center;
			padding-bottom: 20rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
		}
	}
</style>

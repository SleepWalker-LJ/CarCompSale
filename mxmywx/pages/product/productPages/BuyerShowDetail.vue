<template>
	<view>
		<view class="detail"  v-if="showDetailData">
			<view class="buyshow-time" v-show="isShow">
				{{showDetailData.date | getTime}}
			</view>
			<image v-if="showDetailData.img" @click="imgClick" :src="showDetailData.img" mode="aspectFill"></image>
			<view class="divbox" v-show="isShow">
				<view class="buyshow-content">
					{{showDetailData.content}}
				</view>
				<view class="buyshow-car">
					<!-- {{showDetailData.carInfo.menuInfo}} -->
					<!-- {{showDetailData.carInfo.modelInfo}} -->
					<text v-if="showDetailData.carInfo.brandmenuInfo">
						{{showDetailData.carInfo.brandmenuInfo}}
					</text>
					<!-- {{showDetailData.carInfo.seriesInfo}} -->
					<text v-if="showDetailData.title">
						{{showDetailData.title}}
					</text>
					<text v-if="showDetailData.carInfo.itemInfo">
						{{showDetailData.carInfo.itemInfo}}
					</text>
					<span>♡ {{showDetailData.like}}</span>
				</view>
				<!-- <view class="buyshow-like">
					♡ {{showDetailData.like}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../../utils/utils.js'
	
	export default{
		data() {
			return {
				commentId:'',
				showDetailData:{},
				isShow:true
			}
		},
		filters: {
			getTime(time) {
				// 解析时间戳
				const date = new Date(time);
				return formatDate(date, 'yyyy-MM');
			}
		},
		onLoad(options) {
			this.commentId=options.id
		},
		methods:{
			getShowDetail(){
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/comment/getCommentById.api?commentId=${this.commentId}`
					})
					.then(res => {
						this.showDetailData = res.data
						if(res.data.itemType===1){
							this.request({
									url: `${getApp().globalData.http}/qaasms/api/item/getItemInfoById.api?itemId=${res.data.itemId}`
								})
								.then(res2 => {
									this.showDetailData.carInfo = res2.data
									this.$forceUpdate()
								})
						}else{
							this.request({
									url: `${getApp().globalData.http}/qaasms/api/itemSingle/getItemSingleById.api?singleId=${res.data.itemId}`
								})
								.then(res2 => {
									this.showDetailData.title = res2.data.title
									this.$forceUpdate()
								})
						}
					})
			},
			imgClick(){
				this.isShow=!this.isShow
			}
		},
		mounted() {
			this.getShowDetail()
		}
	}
</script>

<style lang="scss">
	.detail{
		position: relative;
		width: 100%;
		height: 100vh;
		
		image {
			width: 100%;
			height: 100%;
		}
		.buyshow-time{
			color: #fff;
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			padding-left: 20rpx;
			padding-top: 10rpx;
			background: rgba($color: #222222, $alpha: .4);
		}
		.divbox{
			background: rgba($color: #222222, $alpha: .4);
			color: #fff;
			padding-left: 10rpx;
			padding-right: 10rpx;
			// text-align: center;
			position: absolute;
			bottom: 20rpx;
			left: 0rpx;
			right: 0rpx;
			.buyshow-content{
				text-indent: 2em;
			}
			.buyshow-car{
				margin-top: 10rpx;
				span{
					position: absolute;
					bottom: 0;
					right: 20rpx;
				}
			}
		}
		// .buyshow-like{
		// 	background: rgba($color: #222222, $alpha: .4);
		// 	color: #fff;
		// 	position: absolute;
		// 	bottom: 20rpx;
		// 	right: 20rpx;
		// }
		// .buyshow-car{
		// 	background: rgba($color: #222222, $alpha: .4);
		// 	color: #fff;
		// 	position: absolute;
		// 	bottom: 20rpx;
		// 	left: 20rpx;
		// }
		
		// .buyshow-content {
		// 	background: rgba($color: #222222, $alpha: .4);
		// 	color: #fff;
		// 	padding-left: 10rpx;
		// 	padding-right: 10rpx;
		// 	text-align: center;
		// 	position: absolute;
		// 	bottom: 60rpx;
		// 	left: 0rpx;
		// 	right: 0rpx;
		// }
	}
</style>

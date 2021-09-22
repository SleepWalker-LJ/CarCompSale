<template>
	<view>
		<uni-segmented-control :current="current" :values="items.map(v => v.title)" @clickItem="onClickItem"
			styleType="text" activeColor="#fccf01">
		</uni-segmented-control>
		<!-- 产品介绍 -->
		<view class="product" v-if="current===0">
			<image :src="productImg" mode="widthFix"></image>
		</view>
		<!-- 买家秀 -->
		<view class="buy" v-else>
			<view v-if="item.display==1" class="buyshow" v-for="(item,index) in buyerShowData"
				@click="itemClick(item.commentId)" :key="index">
				<view class="buyshow-time">
					{{item.date | getTime}}
				</view>
				<image v-if="item.img" :src="item.img" mode="widthFix"></image>
				<view class="buyshow-content">
					{{item.content}}
				</view>
				<view class="buyshow-car">
					<!-- {{item.carInfo.menuInfo}} -->
					<!-- {{item.carInfo.modelInfo}} -->
					<text v-if="item.carInfo.brandmenuInfo">{{item.carInfo.brandmenuInfo}}</text>
					<text>{{item.title}}</text>
					<!-- {{item.carInfo.seriesInfo}} -->
					<text v-if="item.carInfo.itemInfo">{{item.carInfo.itemInfo}}</text>
				</view>
				<view class="buyshow-like">
					♡ {{item.like}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../utils/utils.js'

	export default {
		data() {
			return {
				productImg: '',
				items: [{
						title: "品牌介绍"
					},
					{
						title: "买家评论"
					}
				],
				current: 0,
				buyerShowData: [],
			}
		},
		filters: {
			getTime(time) {
				// 解析时间戳
				const date = new Date(time);
				return formatDate(date, 'yyyy-MM');
			}
		},
		methods: {
			// 获取产品图片
			getProductImg() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/system/getSystemInfo.api`
					})
					.then(res => {
						this.productImg = res.data.productIntroduction
					})
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 跳转到买家秀详情
			itemClick(id) {
				uni.navigateTo({
					url: `./productPages/BuyerShowDetail?id=${id}`
				})
			},
			// 获取买家秀
			getBuyerShow() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/comment/getAllComment.api`
					})
					.then(res => {
						this.buyerShowData = res.data
						for (let i = 0; i < res.data.length; i++) {
							if(res.data[i].itemType===1){
								this.request({
										url: `${getApp().globalData.http}/qaasms/api/item/getItemInfoById.api?itemId=${res.data[i].itemId}`
									})
									.then(res2 => {
										this.buyerShowData[i].carInfo = res2.data
										this.$forceUpdate()
										// console.log(this.buyerShowData[i]);
									})
							}else{
								this.request({
										url: `${getApp().globalData.http}/qaasms/api/itemSingle/getItemSingleById.api?singleId=${res.data[i].itemId}`
									})
									.then(res2 => {
										this.buyerShowData[i].title = res2.data.title
										this.$forceUpdate()
										// console.log(this.buyerShowData[i]);
									})
							}
						}
					})

			}
		},
		mounted() {
			this.getProductImg(),
				this.getBuyerShow()
		}
	}
</script>

<style lang="scss">
	.buy {
		// position: relative;
		margin-left: 10rpx;
		margin-top: 10rpx;
		margin-right: 10rpx;
		column-count: 2;
		column-gap: 0;
		width: 100%;


		.buyshow {
			height: 100%;
			// -webkit-column-break-inside: avoid;
			// page-break-inside:avoid;
			break-inside: avoid;
			column-span: 1;
			margin-bottom: 10rpx;
			position: relative;

			image {
				width: 95%;
			}

			.buyshow-time {
				color: #fff;
				position: absolute;
				top: 5rpx;
				left: 20rpx;
			}

			.buyshow-like {
				color: #fff;
				position: absolute;
				bottom: 0;
				right: 20rpx;
			}

			.buyshow-car {
				color: #fff;
				position: absolute;
				bottom: 0;
				left: 20rpx;
			}

			.buyshow-content {
				color: #fff;
				text-align: center;
				position: absolute;
				bottom: 40rpx;
				left: 10rpx;
				right: 20rpx;

				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>

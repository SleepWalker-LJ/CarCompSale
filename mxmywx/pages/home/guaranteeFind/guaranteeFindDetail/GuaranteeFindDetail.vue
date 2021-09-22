<template>
	<view>
		<view class="gfd-item" v-for="(item,index) in result">
			<view class="gfd-item-id">
				{{item.identification}}
			</view>
			<view class="gfd-item-pastdue">
				是否过期：
				{{item.endDate-28800000 | judgeTime}}
			</view>
			<view class="gfd-item-proDetail">
				产品信息：
				<view>{{item.brandmenuInfo}}</view>
				<view>{{item.menuInfo}}</view>
				<view>{{item.modelInfo}}</view>
				<view>{{item.itemInfo}}</view>
			</view>
			<view class="gfd-item-time">
				<view>质保时间：</view>
				<text>{{item.startDate-28800000 | getStartTime}}</text>
				-------
				<text>{{item.endDate-28800000 | getEndTime}}</text>
			</view>
			<view class="gfd-item-info">
				备注：{{item.info}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../../../utils/utils.js'

	export default {
		data() {
			return {
				result: [],
				productDetails: []
			}
		},
		filters: {
			getStartTime(time) {
				// 解析时间戳
				const date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			getEndTime(time) {
				// 解析时间戳
				const date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
			},
			judgeTime(time){
				const date = new Date();
				if(date>time){
					return "过期了"
				}else{
					return "没过期"
				}
			}
		},
		methods: {

		},
		mounted() {
			this.result = getApp().globalData.queryResult1;
			console.log(this.result);
		}
	}
</script>

<style lang="scss">
	.gfd-item{
		border-bottom: 4rpx solid #eee;
		padding-bottom: 40rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		align-content: center;
		.gfd-item-id{
			width: 80%;
			font-weight: 700;
			font-size: 36rpx;
			padding-bottom: 20rpx;
		}
		.gfd-item-pastdue{
			width: 80%;
			padding-bottom: 20rpx;
		}
		.gfd-item-proDetail{
			width: 80%;
			padding-bottom: 20rpx;
			view{
				margin-left: 50rpx;
			}
		}
		.gfd-item-time{
			width: 80%;
			padding-bottom: 20rpx;
		}
		.gfd-item-info{
			width: 80%;
		}
	}
</style>

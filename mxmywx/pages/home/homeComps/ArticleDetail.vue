<template>
	<view class="ad">
		<view class="title">
			{{articleDetail.title}}
		</view>
		<view class="img">
			<image :src="articleDetail.img" mode="widthFix"></image>
		</view>
		<view class="content">
			{{articleDetail.content}}
		</view>
		<view class="time">
			{{articleDetail.date | getTime}}
		</view>
	</view>
</template>

<script>
	import {formatDate} from "../../../utils/utils.js"
	
	export default{
		data() {
			return {
				id:'',
				articleDetail:{}
			}
		},
		filters:{
			getTime(time){
				let date=new Date(time)
				return formatDate(date, 'yyyy-MM');
			}
		},
		onLoad(options) {
			this.id=options.id
			this.articleDetail=getApp().globalData.article[this.id]
		},
	
	}
</script>

<style lang="scss">
	.ad{
		.title{
			margin: 40rpx;
			font-weight: 700;
			text-align: center;
		}
		.content{
			margin: 40rpx;
			text-align: center;
		}
		.time{
			margin: 40rpx;
		}
	}
</style>

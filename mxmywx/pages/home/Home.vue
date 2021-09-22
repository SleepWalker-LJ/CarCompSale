<template>
	<scroll-view class="home_scroll_view" scroll-y show-scrollbar="false">

		<!-- 轮播图 -->
		<view class="home_swiper">
			<swiper autoplay indicator-dots circular>
				<swiper-item class="home_swiper_item" v-for="(item,index) in bannerImgs" :key="index">
					<image class="img" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 导航图标 -->
		<view class="home_nav">
			<!-- 网点查询 -->
			<navigator url="guaranteeFind/NetSearch" class="home_nav_item">
				<view class="home_nav_icon">
					<image :src="navImgs[0].img" mode="widthFix"></image>
				</view>
				<view class="home_nav_title">{{navImgs[0].title}}</view>
			</navigator>
			<!-- 认证技师 -->
			<navigator url="guaranteeFind/Attestation" class="home_nav_item">
				<view class="home_nav_icon">
					<image :src="navImgs[1].img" mode="widthFix"></image>
				</view>
				<view class="home_nav_title">{{navImgs[1].title}}</view>
			</navigator>
			<!-- 质保录入 -->
			<view url="guaranteeFind/GuaranteeEnter" @click="Enter()" class="home_nav_item">
				<view class="home_nav_icon">
					<image :src="navImgs[2].img" mode="widthFix"></image>
				</view>
				<view class="home_nav_title">{{navImgs[2].title}}</view>
			</view>
			<!-- 质保查询 -->
			<navigator url="guaranteeFind/GuaranteeFind" class="home_nav_item">
				<view class="home_nav_icon">
					<image :src="navImgs[3].img" mode="widthFix"></image>
				</view>
				<view class="home_nav_title">{{navImgs[3].title}}</view>
			</navigator>
			<!-- 登录 -->
			<navigator url="guaranteeFind/Login" class="home_nav_item">
				<view class="home_nav_icon">
					<image :src="navImgs[4].img" mode="widthFix"></image>
				</view>
				<view class="home_nav_title">{{navImgs[4].title}}</view>
			</navigator>
		</view>

		<!-- 品牌案例 -->
		<view class="home_brand">
			<view class="home_brand_title">
				<text>品牌案例 BRAND INTRODUCTION</text>
			</view>
			<view class="line">
				
			</view>
			<view class="home_brand_video">
				<video objectFit="cover" poster="https://www.mxmywx.com/index.png"
					src="https://www.mxmywx.com/index.mp4" controls></video>
			</view>
		</view>

		<!-- 漆面 -->
		<view class="home_Lacquered">
			<view class="home_Lacquered_title">
				<text>精选图文 QUALITY PICTURES</text>
			</view>
			<view class="line">
				
			</view>
			<view class="qimian-content">
				<navigator class="qimian-item" v-for="(item,index) in articles"
					:url="`homeComps/ArticleDetail?id=${index}`" :key="index">
					<image :src="item.img" mode=""></image>
				</navigator>
			</view>
		</view>

		<view class="list">
			<view class="list_title">
				<text>文章列表 QUALITY ARTICLES</text>
			</view>
			<view class="line">
				
			</view>
			<navigator :url="`homeComps/ListDetail?id=${index}`" class="list-item" v-for="(item,index) in articleList">
				<!-- <image :src="item.img" mode=""></image> -->
				<text class="t1"><span></span>{{item.title}}</text>
				<text class="t2">{{item.date | getTime}}</text>
			</navigator>
		</view>
		
		<view class="copyright">
			<text>粤ICP备2021060786号
Copyright  佛山民鑫贸易有限公司</text>
		</view>
	</scroll-view>
</template>

<script>
	import QiMianPic from "./homeComps/QiMianPic.vue"
	import QiMianVideo from "./homeComps/QiMianVideo.vue"
	import {
		formatDate
	} from "../../utils/utils.js"

	export default {
		data() {
			return {
				items: [{
						title: "图片案例"
					},
					{
						title: "视频案例"
					}
				],
				navImgs: [{
						img: require('../../static/img/home/net.png'),
						title: "网点查询"
					},
					{
						img: require('../../static/img/home/mine.png'),
						title: "认证技师"
					},
					{
						img: require('../../static/img/home/enter.png'),
						title: "质保录入"
					},
					{
						img: require('../../static/img/home/find.png'),
						title: "质保查询"
					},
					{
						img: require('../../static/img/home/login.png'),
						title: "登录"
					}
				],
				bannerImgs: [],
				articles: [],
				articleList: []
			}
		},
		filters: {
			getTime(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM');
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 获取轮播数据
			getBanner() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/system/getSystemImgList.api`
					})
					.then(res => {
						this.bannerImgs = res.data.array
					})
			},
			// 获取文章数据
			getArticle() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/article/getAllArticleByType.api?type=TEXT`
					})
					.then(res => {
						this.articles = res.data
						getApp().globalData.article = res.data
					})
			},
			// 获取列表文章
			getListDetail() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/article/getAllArticleByType.api?type=URL`
					})
					.then(res => {
						this.articleList = res.data
						getApp().globalData.listDetail = res.data
					})
			},
			// 进入质保
			Enter() {
				if (!getApp().globalData.header.Cookie) {
					uni.navigateTo({
						url: "guaranteeFind/Login"
					})
				} else {
					uni.navigateTo({
						url: "guaranteeFind/GuaranteeEnter"
					})
				}
			}
		},
		components: {
			QiMianPic,
			QiMianVideo
		},
		mounted() {
			this.getBanner()
			this.getArticle()
			this.getListDetail()
		}
	}
</script>

<style lang="scss" scoped>
	.home_scroll_view {
		// height：屏幕的高度 - 头部标题的高度
		height: 100vh;
		width: 100%;
		font-size: 32rpx;

		/* 轮播图 */
		.home_swiper {
			swiper {
				height: 420rpx;

				.home_swiper_item {
					.img {
						height: 100%;
						// width: 100%;
					}
				}
			}
		}

		/* 圆形导航图标 */
		.home_nav {
			font-size: 26rpx;
			font-weight: 500;
			// TODO 这里怎么用flex布局调整好？
			width: 100%;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
			border-bottom: 9rpx solid #eee;

			.home_nav_item {
				.home_nav_icon {
					color: #333;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 120rpx;
					height: 120rpx;
					background-color: #333;
					border-radius: 50%;

					image {
						width: 50rpx;
					}
				}

				.home_nav_title {
					margin-top: 10rpx;
					text-align: center;
				}
			}
		}

		/* 视频 */
		.home_brand {
			// padding: 60rpx 0 25rpx 70rpx;

			padding-top: 30rpx;
			padding-bottom: 10rpx;
			border-bottom: 9rpx solid #eee;

			.home_brand_title {
				text-align: center;
				padding-left: 10%;
				padding-right: 10%;
				font-weight: 700;
				margin-bottom: 20rpx;
			}
			
			.line{
				height: 8rpx;
				margin-left: 40%;
				margin-right: 40%;
				background-color: $uni-color-gold;
				margin-bottom: 20rpx;
			}

			.home_brand_video {
				padding-left: 10rpx;
				padding-right: 10rpx;
				width: 100%;
				height: 420rpx;
			}
		}

		/* 精选文章 */
		.home_Lacquered {
			padding-top: 30rpx;
			padding-bottom: 50rpx;
			border-bottom: 9rpx solid #eee;

			.home_Lacquered_title {
				text-align: center;
				font-weight: 700;
				margin-bottom: 20rpx;
				padding-left: 10%;
				padding-right: 10%;
			}
			
			.line{
				height: 8rpx;
				margin-left: 40%;
				margin-right: 40%;
				background-color: #fccf01;
				margin-bottom: 20rpx;
			}

			.qimian-content {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.qimian-item {
					padding: 10rpx;
					width: 50%;
					height: 250rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		/* 文章列表 */
		.list {
			padding-top: 30rpx;
			padding-bottom: 50rpx;

			.list_title {
				font-weight: 700;
				margin-bottom: 20rpx;
				padding-left: 10%;
				padding-right: 10%;
				text-align: center;
			}
			
			.line{
				height: 8rpx;
				margin-left: 40%;
				margin-right: 40%;
				background-color: #fccf01;
				margin-bottom: 20rpx;
			}

			.list-item {
				font-size: 28rpx;
				height: 70rpx;
				margin-left: 10rpx;
				margin-right: 10rpx;
				margin-bottom: 10rpx;
				// background-color: #eee;
				line-height: 70rpx;
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;

				// image {
				// 	margin-left: 30rpx;
				// 	width: 100rpx;
				// 	height: 100rpx;
				// }
				
				
				.t1 {
					margin-left: 30rpx;
					color: #000;
					width: 500rpx;
					word-break: keep-all;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					// span{
					// 	width: 10rpx;
					// 	height: 10rpx;
					// 	border-radius: 50%;
					// 	background-color: #fccf01;
					// }
					
				}

				.t2 {
					margin-right: 30rpx;
					color: #000;
				}
			}
		}
		
		.copyright{
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			background-color: #333;
			height: 120rpx;
			text-align: center;
			color: #fff;
			font-size: 24rpx;
			line-height: 40rpx;
		}
	}
</style>

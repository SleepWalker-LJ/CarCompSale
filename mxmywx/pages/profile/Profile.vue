<template>
	<view>
		<uni-segmented-control :current="current" :values="items.map(v => v.title)" @clickItem="onClickItem"
			styleType="text" activeColor="#fccf01">
		</uni-segmented-control>
		
		<view v-if="current===0">
			<image class="about-img" :src="aboutImg" mode="widthFix"></image>
		</view>
		
		<view class="contact-us" v-else>
			<text>请输入你的个人信息以便与我们取得联系</text>
			<form>
				<input class="input-name" type="text" v-model="name" placeholder="您的姓名*"/>
				<input class="input-email" type="text" v-model="email" placeholder="您的邮箱*"/>
				<input class="input-phone" type="text" v-model="phone" placeholder="您的电话*"/>
				<textarea class="textarea-content" v-model="content" placeholder="留言内容" />
				<button @click="btnSend" class="btn-send" type="default">发送信息</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						title: "品牌介绍"
					},
					{
						title: "联系我们"
					}
				],
				current: 0,
				aboutImg:'',
				name:'',
				email:'',
				phone:'',
				content:''
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 获取关于图片
			getAboutImg(){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/system/getSystemInfo.api`
				})
				.then(res=>{
					this.aboutImg=res.data.aboutUs
				})
			},
			// 发送留言
			btnSend(){
				if(this.name && this.email && this.phone && this.content){
					this.request({
						url:`${getApp().globalData.http}/qaasms/api/feedback/insertFeedback.api`,
						method:"POST",
						dataType:"json",
						data:{
							name:this.name,
							email:this.email,
							telephone:this.phone,
							content:this.content
						}
					})
					.then(res=>{
						if(res.status===8000){
							uni.showToast({
							    title: '留言成功',
							    duration: 1500
							});
							this.name="",
							this.email="",
							this.phone="",
							this.content=""
						}else{
							uni.showToast({
							    title: '留言失败',
							    duration: 1500
							});
						}
					})
				}else{
					uni.showToast({
					    title: '请填写完整信息',
					    duration: 1500
					});
				}
			}
		},
		mounted() {
			this.getAboutImg()
		}
	}
</script>

<style lang="scss">
	.aboutImg{
		width: 100%;
	}
	
	.contact-us{
		padding-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.input-name{
			border: 3rpx black solid;
			margin-top: 20rpx;
			padding: 20rpx 10rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.input-email{
			border: 3rpx black solid;
			margin-top: 20rpx;
			padding: 20rpx 10rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.input-phone{
			border: 3rpx black solid;
			margin-top: 20rpx;
			padding: 20rpx 10rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.textarea-content{
			border: 3rpx black solid;
			margin-top: 20rpx;
			padding: 20rpx 10rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.btn-send{
			color: #fff;
			background-color: #333;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}
	}
</style>

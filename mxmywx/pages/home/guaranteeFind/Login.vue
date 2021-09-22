<template>
	<view class="l">
		<view v-if="!isLogin" class="login">
			<form method="post">
				<input class="login-name" type="text" v-model="userName" placeholder="用户名" name="u"></input>
				<input type="password" class="login-pwd" v-model="password" placeholder="密码" name="p"></input>
				<button class="login-btn" @click="loginClick" type="submit">登录</button>
			</form>
		</view>
		<view v-else class="logined">
			<view class="show-msg">当前用户：{{isLogin}}</view>
			<view>
				<button @click="outClick">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				password: '',
				isLogin: null
			}
		},
		methods: {
			// 登录
			loginClick() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/admin/login.api?adminName=${this.userName}&password=${this.password}`,
						method: "POST"
					})
					.then(res => {
						getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.JSESSIONID;
						if(res.status===4000){
							uni.showToast({
								title:"登录失败，请检查用户名或密码",
								duration:1500,
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"登录成功,2秒后跳转到首页",
								duration:1000,
								icon:"none"
							})
							setTimeout(()=>{
								uni.showToast({
									title:"登录成功,1秒后跳转到首页",
									duration:1000,
									icon:"none"
								})
								setTimeout(()=>{
									uni.navigateBack()
								},1000)
							},1000)
						}
					})
			},
			// 退出登录
			outClick() {
				let header = getApp().globalData.header; 
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/admin/loginOut.api`,
						method: "POST",
						header: header
					})
					.then(res => {
						// console.log(res);
						getApp().globalData.header.Cookie=""
						uni.navigateBack()
					})
			},
			// 是否登录
			isLoginIng() {
				let header = getApp().globalData.header; 
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/admin/isLogin.api`,
						method: "POST",
						header: header
					})
					.then(res => {
						if (res.status == 6001) {
							this.isLogin = res.data
							// console.log("没登录" + res.stats);
						} else {
							this.isLogin = res.data.adminName
							// console.log("登录了" + res.data.adminId);
						}
					})
			}
		},
		created() {
			this.isLoginIng()	
		}
	}
</script>

<style lang="scss">
	.l {
		height: 100%;

		.login {
			height: 100vh;
			background-color: #2a2a2a;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;

			.login-name {
				width: 500rpx;
				height: 90rpx;
				border-bottom: 3rpx #fff solid;
				margin-bottom: 50rpx;
			}

			.login-pwd {
				width: 500rpx;
				height: 90rpx;
				border-bottom: 3rpx #fff solid;
				margin-bottom: 100rpx;
			}

			.login-btn {}
		}
		
		.logined{
			.show-msg{
				height: 200rpx;
				line-height: 200rpx;
				text-align: center;
				margin-bottom: 90%;
				font-size: 40rpx;
			}
			button{
				width: 80%;
				background-color: #eee;
			}
		}
	}
</style>

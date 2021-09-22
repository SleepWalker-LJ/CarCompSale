<template>
	<view>
		<view class="attestation" v-for="(item,index) in attestationData">
			<image :src="item.img" mode=""></image>
			<view class="attestation-con">
				<view class="attestation-con-up">
					<text>{{item.name}} </text>
					(<text>{{item.title}}</text>)
					<text class="phone">{{item.telephone}}</text>
				</view>
				<view class="attestation-con-down">
					<view>{{item.info}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attestationData: []
			}
		},
		methods: {
			getAttestation() {
				let that = this
				that.request({
						url: `${getApp().globalData.http}/qaasms/api/technician/getAllTechnician.api`
					})
					.then(res => {
						that.attestationData = res.data
					})
			}
		},
		mounted() {
			this.getAttestation()
		}
	}
</script>

<style lang="scss">
	.attestation {
		padding: 30rpx;
		font-size: 32rpx;
		border-bottom: 3rpx #eee solid;
		display: flex;
		image{
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
		.attestation-con{
			width: 100%;
			
			.attestation-con-up{
				position: relative;
				.phone{
					position: absolute;
					top: 0;
					right: 20rpx;
				}
				
				// display: flex;
				// flex-wrap: nowrap;
				// justify-content: space-around;
				
			}
			.attestation-con-down{
				margin-top: 5rpx;
			}
		}
		// view{
		// 	margin-bottom: 30rpx;
		// }
	}
</style>

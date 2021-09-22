<template>
	<view>
		<view class="net-item" v-for="(item,index) in netData" :key="index">
			<view>
				店名：{{item.name}}
			</view>
			<view>
				地址：{{item.address}}
			</view>
			<view>
				电话：{{item.telephone}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				netData:[]
			}
		},
		methods:{
			getNet(){
				let that=this
				that.request({
					url:`${getApp().globalData.http}/qaasms/api/outlets/getAllOutlets.api`
				})
				.then(res=>{
					that.netData=res.data
				})
			}
		},
		mounted() {
			this.getNet()
		}
	}
</script>

<style lang="scss">
	.net-item{
		padding: 30rpx;
		font-size: 32rpx;
		border-bottom: 3rpx #eee solid;
		view{
			margin-bottom: 20rpx;
		}
	}
</style>

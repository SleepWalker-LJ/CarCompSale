<template>
	<view>
		<web-view v-if="htm" :src="htm"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htm:''
			}
		},
		onLoad(options) {
			this.htm=options.htm
		},
		methods: {
			
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
	
</style>

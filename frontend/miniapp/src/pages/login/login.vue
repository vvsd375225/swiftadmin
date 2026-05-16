<template>
  <view class="page-container" style="padding:40rpx;">
    <view class="login-box card">
      <text class="login-title">用户登录</text>
      <view class="form-group">
        <text class="label">用户名</text>
        <input class="input" v-model="username" placeholder="请输入用户名" />
      </view>
      <view class="form-group">
        <text class="label">密码</text>
        <input class="input" v-model="password" type="password" placeholder="请输入密码" />
      </view>
      <button class="login-btn" :loading="loading" @click="doLogin">登 录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loginApi } from '@/api/index'

const username = ref('')
const password = ref('')
const loading = ref(false)

async function doLogin() {
  if (!username.value || !password.value) {
    uni.showToast({ title: '请输入用户名和密码', icon: 'none' })
    return
  }
  loading.value = true
  try {
    const r = await loginApi(username.value, password.value)
    if (r.data.token) {
      uni.setStorageSync('token', r.data.token)
      uni.setStorageSync('user', JSON.stringify(r.data.user || { username: username.value }))
    }
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => { uni.navigateBack() }, 1000)
  } catch (e) { /* handled in request */ }
  loading.value = false
}
</script>

<style scoped>
.login-box { padding: 40rpx; }
.login-title { font-size: 40rpx; font-weight: bold; text-align: center; display: block; margin-bottom: 40rpx; }
.form-group { margin-bottom: 24rpx; }
.label { font-size: 28rpx; color: #333; display: block; margin-bottom: 10rpx; }
.input { border: 1rpx solid #ddd; border-radius: 8rpx; padding: 16rpx 20rpx; font-size: 28rpx; height: 80rpx; }
.login-btn { background: #1989fa; color: #fff; border-radius: 8rpx; font-size: 32rpx; margin-top: 30rpx; }
</style>

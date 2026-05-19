<template>
  <view class="page-container">
    <view class="user-header card" v-if="user">
      <image class="avatar" :src="user.avatar || '/static/default-avatar.png'" mode="aspectFill" />
      <view class="user-info">
        <text class="username">{{ user.nickname || user.username }}</text>
        <text class="user-role">{{ user.role || '管理员' }}</text>
      </view>
    </view>
    <view class="user-header card flex-center" v-else @click="goLogin">
      <image class="avatar" src="/static/default-avatar.png" mode="aspectFill" />
      <view class="user-info">
        <text class="username">点击登录</text>
        <text class="user-role">登录后查看更多功能</text>
      </view>
    </view>

    <view class="menu-list card">
      <view class="menu-item" v-for="(m, i) in menus" :key="i" @click="m.action">
        <text class="menu-icon">{{ m.icon }}</text>
        <text class="menu-name">{{ m.name }}</text>
        <text class="menu-arrow">></text>
      </view>
    </view>

    <view class="menu-list card" v-if="user">
      <view class="menu-item logout" @click="logout">
        <text class="menu-icon">🚪</text>
        <text class="menu-name" style="color:#e74c3c">退出登录</text>
        <text class="menu-arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onShow } from '@dcloudio/uni-app'

const user = ref<any>(null)
const menus = ref([
  { name: '我的消息', icon: '🔔', action: () => uni.switchTab({ url: '/pages/message/index' }) },
  { name: '我的文章', icon: '📝', action: () => uni.switchTab({ url: '/pages/article/index' }) },
  { name: '关于我们', icon: 'ℹ️', action: () => uni.showToast({ title: 'SwiftAdmin v1.0', icon: 'none' }) }
])

function checkLogin() {
  try {
    const u = uni.getStorageSync('user')
    if (u) { user.value = JSON.parse(u) }
    else { user.value = null }
  } catch (e) { user.value = null }
}

function goLogin() { uni.navigateTo({ url: '/pages/login/login' }) }
function logout() {
  uni.showModal({
    title: '提示', content: '确定退出登录?',
    success: (res: any) => {
      if (res.confirm) {
        uni.removeStorageSync('token')
        uni.removeStorageSync('user')
        user.value = null
        uni.showToast({ title: '已退出', icon: 'none' })
      }
    }
  })
}

onShow(() => { checkLogin() })
</script>

<style scoped>
.user-header { display: flex; align-items: center; margin-bottom: 16rpx; }
.avatar { width: 100rpx; height: 100rpx; border-radius: 50%; flex-shrink: 0; }
.user-info { margin-left: 20rpx; display: flex; flex-direction: column; }
.username { font-size: 32rpx; font-weight: bold; }
.user-role { font-size: 24rpx; color: #999; margin-top: 6rpx; }
.menu-list { margin-bottom: 16rpx; }
.menu-item { display: flex; align-items: center; padding: 24rpx 0; border-bottom: 1rpx solid #f0f0f0; }
.menu-item:last-child { border-bottom: none; }
.menu-icon { font-size: 36rpx; margin-right: 16rpx; }
.menu-name { flex: 1; font-size: 28rpx; }
.menu-arrow { color: #ccc; font-size: 28rpx; }
.logout { border-top: 1rpx solid #f0f0f0; margin-top: 8rpx; padding-top: 28rpx; }
</style>

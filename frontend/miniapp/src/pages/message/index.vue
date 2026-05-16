<template>
  <view class="page-container">
    <view class="msg-toolbar card" v-if="unreadCount > 0">
      <text>未读消息: {{ unreadCount }} 条</text>
      <text class="mark-all" @click="markAllRead">全部已读</text>
    </view>
    <view v-if="loading" class="loading-text">加载中...</view>
    <view v-else>
      <view class="msg-item card" v-for="m in messages" :key="m.id" @longpress="deleteMsg(m.id)">
        <view class="msg-header">
          <text class="msg-title" :class="{ unread: m.is_read === 0 }">{{ m.title || '系统通知' }}</text>
          <text class="msg-time">{{ m.create_time }}</text>
        </view>
        <text class="msg-content">{{ m.content || '' }}</text>
        <text class="msg-type">[{{ m.type || '系统' }}]</text>
      </view>
      <view v-if="messages.length === 0" class="empty-text">暂无消息</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getNotificationListApi, getUnreadCountApi, markAllReadApi, deleteNotificationApi } from '@/api/index'

const messages = ref<any[]>([])
const loading = ref(true)
const unreadCount = ref(0)

async function fetchMessages() {
  loading.value = true
  try {
    const [r, u] = await Promise.all([getNotificationListApi(1, 50), getUnreadCountApi()])
    messages.value = r.data.list || []
    unreadCount.value = u.data.count || 0
  } catch (e) { /* handled */ }
  loading.value = false
}

async function markAllRead() {
  try { await markAllReadApi(); unreadCount.value = 0; fetchMessages() } catch (e) {}
}
async function deleteMsg(id: number) {
  uni.showModal({
    title: '提示', content: '确定删除这条消息?',
    success: async (res: any) => {
      if (res.confirm) {
        try { await deleteNotificationApi(id); fetchMessages() } catch (e) {}
      }
    }
  })
}

fetchMessages()
</script>

<style scoped>
.msg-toolbar { display: flex; justify-content: space-between; font-size: 26rpx; }
.mark-all { color: #1989fa; }
.msg-item { margin-bottom: 16rpx; }
.msg-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8rpx; }
.msg-title { font-size: 30rpx; font-weight: bold; }
.msg-title.unread { color: #e74c3c; }
.msg-title.unread::before { content: '● '; font-size: 20rpx; }
.msg-time { font-size: 22rpx; color: #bbb; }
.msg-content { font-size: 26rpx; color: #666; display: block; margin-bottom: 6rpx; }
.msg-type { font-size: 22rpx; color: #999; }
.loading-text, .empty-text { text-align: center; padding: 80rpx 0; color: #999; font-size: 28rpx; }
</style>

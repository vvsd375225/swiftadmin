<template>
  <div class="page">
    <van-nav-bar title="我的" fixed />
    <div class="content">
      <div class="header-card" v-if="token">
        <van-image round width="64" height="64" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <div style="margin-top:8px;font-size:16px;font-weight:bold">{{ username }}</div>
      </div>
      <div class="header-card" v-else>
        <van-button type="primary" to="/login">去登录</van-button>
      </div>
      <van-cell-group inset style="margin-top:12px">
        <van-cell title="浏览记录" icon="clock-o" is-link />
        <van-cell title="收藏文章" icon="star-o" is-link />
        <van-cell title="设置" icon="setting-o" is-link />
        <van-cell v-if="token" title="退出登录" icon="revoke" is-link @click="logout" />
      </van-cell-group>
    </div>
    <van-tabbar v-model="active" route active-color="#1989fa">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/article" icon="notes-o">文章</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const active = ref(2)
const token = ref(localStorage.getItem('token'))
const username = ref('用户')
function logout() { localStorage.removeItem('token'); token.value = ''; router.push('/login') }
</script>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding-top: 46px; padding-bottom: 50px; }
.header-card { display: flex; flex-direction: column; align-items: center; padding: 24px; background: #fff; }
</style>

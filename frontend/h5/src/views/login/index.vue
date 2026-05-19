<template>
  <div class="page">
    <van-nav-bar title="登录" fixed />
    <div class="login-form">
      <van-image round width="80" height="80" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" style="margin-bottom:24px" />
      <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="form.password" label="密码" type="password" placeholder="请输入密码" />
      <van-button type="primary" block :loading="logining" @click="handleLogin" style="margin-top:24px">登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/index'
import { showToast } from 'vant'
const router = useRouter()
const logining = ref(false)
const form = reactive({ username: 'admin', password: 'admin123' })
async function handleLogin() {
  if (!form.username || !form.password) { showToast('请填写完整'); return }
  logining.value = true
  try { const r: any = await loginApi(form); localStorage.setItem('token', r.data.token); showToast('登录成功'); router.push('/home') } catch(e: any) { showToast('登录失败') } finally { logining.value = false }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; padding-top: 46px; }
.login-form { display: flex; flex-direction: column; align-items: center; padding: 32px 24px; }
</style>

<template>
  <div>
    <n-card title="个人资料" style="max-width: 600px">
      <n-form ref="formRef" :model="formData" :rules="rules" label-width="80">
        <n-form-item label="用户名">
          <n-input :value="userStore.info.username" disabled />
        </n-form-item>
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="formData.nickname" placeholder="请输入昵称" />
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-form-item label="手机号">
          <n-input v-model:value="formData.mobile" placeholder="请输入手机号" />
        </n-form-item>
        <n-form-item label="新密码">
          <n-input v-model:value="formData.password" type="password" placeholder="不填则不修改" />
        </n-form-item>
      </n-form>
      <n-button type="primary" :loading="submitLoading" @click="handleSubmit">保存修改</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateAdminApi } from '@/api/admin'
import { useMessage } from 'naive-ui'

const message = useMessage()
const userStore = useUserStore()

const submitLoading = ref(false)

const formData = reactive({
  nickname: '',
  email: '',
  mobile: '',
  password: '',
})

const rules = {
  nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
}

onMounted(() => {
  formData.nickname = userStore.info.nickname || ''
  formData.email = userStore.info.email || ''
  formData.mobile = userStore.info.mobile || ''
})

async function handleSubmit() {
  submitLoading.value = true
  try {
    const data: any = { id: userStore.info.id, ...formData }
    if (!data.password) delete data.password
    await updateAdminApi(data)
    message.success('更新成功')
    userStore.info.nickname = formData.nickname
    userStore.info.email = formData.email
    userStore.info.mobile = formData.mobile
  } finally {
    submitLoading.value = false
  }
}
</script>

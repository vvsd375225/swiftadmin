import { defineStore } from 'pinia'
import { loginApi, getInfoApi, getPermissionsApi } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    info: {} as any,
    menus: [] as any[],
    permissions: [] as string[],
  }),
  actions: {
    async login(form: { username: string; password: string }) {
      const res = await loginApi(form)
      this.token = res.data.token
      localStorage.setItem('token', res.data.token)
      await this.getInfo()
      await this.getPermissions()
    },
    async getInfo() {
      const res = await getInfoApi()
      this.info = res.data
    },
    async getPermissions() {
      const res = await getPermissionsApi()
      this.menus = res.data.menus
      this.permissions = res.data.permissions
    },
    logout() {
      this.token = ''
      this.info = {}
      this.menus = []
      this.permissions = []
      localStorage.removeItem('token')
    },
  },
})

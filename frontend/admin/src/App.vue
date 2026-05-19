<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useDark } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
const isDark = useDark()

watch(() => layoutStore.settings.darkMode, (v) => { isDark.value = v }, { immediate: true })
</script>

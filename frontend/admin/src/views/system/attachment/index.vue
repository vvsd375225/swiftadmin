<template>
  <div>
    <!-- 工具栏 -->
    <n-card class="mb-4">
      <n-space align="center">
        <n-upload
          multiple
          :action="uploadUrl"
          :headers="uploadHeaders"
          @finish="handleUploadFinish"
        >
          <n-button type="primary">上传文件</n-button>
        </n-upload>
        <n-select
          v-model:value="searchForm.ext"
          placeholder="筛选文件类型"
          clearable
          style="width: 160px"
          :options="extOptions"
          @update:value="handleSearch"
        />
      </n-space>
    </n-card>

    <!-- 网格视图 -->
    <n-card v-if="tableData.length > 0">
      <n-grid :cols="6" :x-gap="12" :y-gap="12" responsive="screen">
        <n-grid-item v-for="item in tableData" :key="item.id">
          <n-card hoverable class="attachment-card">
            <template #cover>
              <div class="card-cover" @click="handlePreview(item)">
                <img v-if="isImage(item.ext)" :src="item.url" :alt="item.name" />
                <div v-else class="file-placeholder">
                  <n-icon size="48"><DocumentOutline /></n-icon>
                  <span class="ext-badge">{{ item.ext?.toUpperCase() }}</span>
                </div>
              </div>
            </template>
            <div class="card-body">
              <n-ellipsis :tooltip="false" style="max-width: 100%">
                <span class="file-name">{{ item.name }}</span>
              </n-ellipsis>
              <div class="file-info">
                <span class="file-size">{{ formatSize(item.size) }}</span>
                <n-button text type="error" size="small" @click="handleDelete(item.id)">
                  <template #icon><TrashOutline /></template>
                </n-button>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- 分页 -->
      <div class="mt-4" flex-center>
        <n-pagination
          :page="pagination.page"
          :page-size="pagination.pageSize"
          :item-count="pagination.itemCount"
          @update:page="handlePageChange"
        />
      </div>
    </n-card>

    <!-- 空状态 -->
    <n-card v-else>
      <n-empty description="暂无附件" />
    </n-card>

    <!-- 图片预览 -->
    <n-modal v-model:show="showPreview" preset="card" title="预览" style="width: 800px">
      <div flex-center>
        <img v-if="previewItem" :src="previewItem.url" :alt="previewItem.name" style="max-width: 100%; max-height: 70vh" />
      </div>
      <template #footer>
        <n-space justify="end">
          <span class="pr-4">{{ previewItem?.name }}</span>
          <span class="pr-4 text-gray-400">{{ previewItem ? formatSize(previewItem.size) : '' }}</span>
          <n-button @click="showPreview = false">关闭</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { DocumentOutline, TrashOutline } from '@vicons/ionicons5'
import { getAttachmentListApi, deleteAttachmentApi } from '@/api/attachment'

const message = useMessage()
const loading = ref(false)
const tableData = ref<any[]>([])
const showPreview = ref(false)
const previewItem = ref<any>(null)

const token = localStorage.getItem('token') || ''
const uploadUrl = '/admin/attachment/upload'
const uploadHeaders = { Authorization: `Bearer ${token}` }

const searchForm = reactive({ ext: '' })
const extOptions = [
  { label: 'JPG', value: 'jpg' },
  { label: 'PNG', value: 'png' },
  { label: 'GIF', value: 'gif' },
  { label: 'PDF', value: 'pdf' },
  { label: 'DOC', value: 'doc' },
  { label: 'DOCX', value: 'docx' },
  { label: 'ZIP', value: 'zip' },
]

const pagination = reactive({ page: 1, pageSize: 18, itemCount: 0 })

const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']

function isImage(ext: string) {
  return imageExts.includes(ext?.toLowerCase())
}

function formatSize(bytes: number): string {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++ }
  return size.toFixed(1) + ' ' + units[i]
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getAttachmentListApi({ page: pagination.page, limit: pagination.pageSize, ext: searchForm.ext })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.page = 1
  fetchData()
}

function handlePageChange(page: number) {
  pagination.page = page
  fetchData()
}

function handleUploadFinish() {
  message.success('上传成功')
  fetchData()
}

function handlePreview(item: any) {
  if (isImage(item.ext)) {
    previewItem.value = item
    showPreview.value = true
  } else {
    window.open(item.url, '_blank')
  }
}

async function handleDelete(id: number) {
  await deleteAttachmentApi(id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>

<style scoped>
.attachment-card {
  cursor: pointer;
}
.card-cover {
  height: 140px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--n-color-target);
}
.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.ext-badge {
  font-size: 12px;
  font-weight: bold;
  color: var(--n-text-color-3);
  background: var(--n-color);
  padding: 2px 8px;
  border-radius: 4px;
}
.card-body {
  padding: 4px 0;
}
.file-name {
  font-size: 13px;
}
.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.file-size {
  font-size: 12px;
  color: var(--n-text-color-3);
}
</style>

<template>
  <n-card title="文章管理" :bordered="false">
    <template #header-extra><n-button type="primary" size="small" @click="openAdd">新增文章</n-button></template>
    <n-space style="margin-bottom:12px">
      <n-input v-model:value="keyword" placeholder="搜索标题/标签" style="width:180px" clearable @keyup.enter="search" />
      <n-select v-model:value="catFilter" :options="catOpts" placeholder="全部栏目" style="width:150px" clearable />
      <n-button type="primary" @click="search">搜索</n-button>
    </n-space>
    <n-data-table :columns="cols" :data="list" :loading="loading" :pagination="pagination" />
    <n-modal v-model:show="showEditor" preset="card" style="width:960px" :title="editingId?'编辑文章':'新增文章'">
      <n-form label-placement="left" label-width="80">
        <n-form-item label="标题" required><n-input v-model:value="form.title" placeholder="文章标题" /></n-form-item>
        <n-form-item label="栏目"><n-tree-select v-model:value="form.category_id" :options="catTreeOpts" filterable /></n-form-item>
        <n-form-item label="封面"><n-input v-model:value="form.cover" placeholder="封面图片URL" /></n-form-item>
        <n-form-item label="摘要"><n-input v-model:value="form.summary" type="textarea" :rows="2" /></n-form-item>
        <n-form-item label="标签"><n-input v-model:value="form.tags" placeholder="多个用逗号分隔" /></n-form-item>
        <n-form-item label="内容" required>
          <div v-if="editor" style="border:1px solid #e5e5e5;border-radius:4px">
            <div style="display:flex;gap:2px;padding:6px 8px;border-bottom:1px solid #e5e5e5;flex-wrap:wrap;background:#fafafa">
              <n-button size="tiny" @click="editor.chain().focus().toggleBold().run()" :type="editor.isActive('bold')?'primary':'default'"><strong>B</strong></n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleItalic().run()" :type="editor.isActive('italic')?'primary':'default'"><em>I</em></n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleStrike().run()" :type="editor.isActive('strike')?'primary':'default'"><s>S</s></n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleHeading({level:2}).run()" :type="editor.isActive('heading',{level:2})?'primary':'default'">H2</n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleHeading({level:3}).run()" :type="editor.isActive('heading',{level:3})?'primary':'default'">H3</n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleBulletList().run()" :type="editor.isActive('bulletList')?'primary':'default'">UL</n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleOrderedList().run()" :type="editor.isActive('orderedList')?'primary':'default'">OL</n-button>
              <n-button size="tiny" @click="editor.chain().focus().toggleBlockquote().run()" :type="editor.isActive('blockquote')?'primary':'default'">"</n-button>
              <n-button size="tiny" @click="setLink">Link</n-button>
              <n-button size="tiny" @click="editor.chain().focus().undo().run()">↩</n-button>
              <n-button size="tiny" @click="editor.chain().focus().redo().run()">↪</n-button>
            </div>
            <div style="padding:8px 16px;min-height:300px;max-height:500px;overflow-y:auto"><EditorContent :editor="editor" /></div>
          </div>
        </n-form-item>
        <n-form-item label="状态"><n-switch v-model:value="form.status" :checked-value="1" :unchecked-value="0" /></n-form-item>
      </n-form>
      <template #footer><n-space justify="end"><n-button @click="showEditor=false">取消</n-button><n-button type="primary" :loading="saving" @click="handleSave">{{ editingId?'更新':'创建' }}</n-button></n-space></template>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, h } from 'vue'
import { useMessage, NButton, NTag } from 'naive-ui'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { getArticleListApi, saveArticleApi, updateArticleApi, deleteArticleApi, getArticleDetailApi } from '@/api/cms'
import { getCategoryTreeApi } from '@/api/cms'

const message = useMessage()
const loading = ref(false); const saving = ref(false); const list = ref<any[]>([])
const showEditor = ref(false); const editingId = ref(0)
const keyword = ref(''); const catFilter = ref(null as number|null)
const catTreeOpts = ref<any[]>([]); const catOpts = ref<any[]>([])
const form = reactive({ category_id: 0 as number|null, title: '', content: '', cover: '', summary: '', tags: '', status: 1 })
const pagination = reactive({ page:1,pageSize:15,itemCount:0,showSizePicker:true,pageSizes:[10,15,30],onChange:(p:number)=>{pagination.page=p;load()},onUpdatePageSize:(s:number)=>{pagination.pageSize=s;load()} })

const editor = useEditor({ content: '', extensions: [ StarterKit, Link.configure({ openOnClick: false }) ] })

const cols = [
  { title:'ID',key:'id',width:60 },{ title:'标题',key:'title',ellipsis:{tooltip:true} },{ title:'栏目',key:'category_name',width:100 },
  { title:'标签',key:'tags',width:100 },{ title:'浏览',key:'views',width:70 },
  { title:'状态',key:'status',width:70,render:(r:any)=>h(NTag,{type:r.status?'success':'default',size:'small'},{default:()=>r.status?'发布':'草稿'}) },
  { title:'发布时间',key:'publish_time',width:160 },
  { title:'操作',key:'act',width:140,render:(r:any)=>[h(NButton,{size:'tiny',onClick:()=>openEdit(r)},{default:()=>'编辑'}),h(NButton,{size:'tiny',type:'error',style:{marginLeft:'6px'},onClick:()=>handleDelete(r.id)},{default:()=>'删除'})] }
]

async function load(){loading.value=true;try{const r=await getArticleListApi({page:pagination.page,limit:pagination.pageSize,keyword:keyword.value,category_id:catFilter.value||undefined});list.value=r.data.list||[];pagination.itemCount=r.data.total||0}finally{loading.value=false}}
async function loadCats(){const r=await getCategoryTreeApi();const walk=(nodes:any[]):any[]=>nodes.map((n:any)=>({label:n.name,key:n.id,value:n.id,children:n.children?walk(n.children):undefined}));catTreeOpts.value=walk(r.data||[]);catOpts.value=(r.data||[]).flatMap((n:any)=>[{label:n.name,value:n.id},...(n.children||[]).map((c:any)=>({label:'  '+c.name,value:c.id}))])}
function search(){pagination.page=1;load()}

function openAdd(){editingId.value=0;form.category_id=0;form.title='';form.content='';form.cover='';form.summary='';form.tags='';form.status=1;editor.value?.commands.setContent('');showEditor.value=true}
async function openEdit(r:any){editingId.value=r.id;try{const d=await getArticleDetailApi(r.id);Object.assign(form,{category_id:d.data.category_id,title:d.data.title,content:d.data.content||'',cover:d.data.cover||'',summary:d.data.summary||'',tags:d.data.tags||'',status:d.data.status});editor.value?.commands.setContent(d.data.content||'');showEditor.value=true}catch(e:any){message.error('获取文章失败')}}
function setLink(){const url=prompt('链接地址');if(url&&editor.value)editor.value.chain().focus().setLink({href:url}).run()}
async function handleSave(){if(!form.title.trim()){message.warning('请填写标题');return};if(editor.value)form.content=editor.value.getHTML();saving.value=true;try{if(editingId.value){await updateArticleApi({id:editingId.value,...form})}else{await saveArticleApi(form)};message.success(editingId.value?'已更新':'已创建');showEditor.value=false;load()}catch(e:any){message.error(e?.response?.data?.msg||'失败')}finally{saving.value=false}}
async function handleDelete(id:number){await deleteArticleApi(id);message.success('已删除');load()}
onMounted(()=>{load();loadCats()})
onBeforeUnmount(()=>{editor.value?.destroy()})
</script>

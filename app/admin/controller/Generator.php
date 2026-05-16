<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Generator extends Base
{
    /** 字段类型 → 表单组件映射 */
    private $typeMap = [
        'varchar'   => ['Input', 'string'],
        'char'      => ['Input', 'string'],
        'text'      => ['Textarea', 'string'],
        'longtext'  => ['Textarea', 'string'],
        'mediumtext'=> ['Textarea', 'string'],
        'int'       => ['InputNumber', 'number'],
        'bigint'    => ['InputNumber', 'number'],
        'smallint'  => ['InputNumber', 'number'],
        'tinyint'   => ['Switch', 'switch'],
        'decimal'   => ['Input', 'number'],
        'float'     => ['Input', 'number'],
        'double'    => ['Input', 'number'],
        'datetime'  => ['DateTimePicker', 'datetime'],
        'date'      => ['DatePicker', 'date'],
        'time'      => ['TimePicker', 'time'],
        'json'      => ['Textarea', 'json'],
    ];

    private $excludeTables = ['swift_workflow_', 'swift_payment', 'swift_tenant', 'swift_cron_', 'swift_notification', 'swift_cms_'];

    /**
     * 列出所有可生成的数据表
     */
    public function index()
    {
        $tables = Db::query('SHOW TABLES');
        $prefix = config('database.connections.mysql.prefix') ?: 'swift_';

        $list = [];
        foreach ($tables as $row) {
            $table = current($row);
            $name = str_replace($prefix, '', $table);
            if ($this->isExcluded($table)) continue;

            $list[] = [
                'table'   => $table,
                'name'    => $name,
                'comment' => $this->getTableComment($table),
            ];
        }

        return $this->success(['list' => $list]);
    }

    /**
     * 获取表字段详情
     */
    public function fields()
    {
        $table = Request::get('table', '');
        if (!$table) return $this->error('请指定表名');

        $columns = Db::query("SHOW FULL COLUMNS FROM `{$table}`");
        $fields = [];
        foreach ($columns as $col) {
            $type = $this->parseType($col['Type']);
            $map  = $this->getTypeMapping($type, $col['Type']);
            $fields[] = [
                'name'      => $col['Field'],
                'type'      => $col['Type'],
                'base_type' => $type,
                'component' => $map[0],
                'val_type'  => $map[1],
                'comment'   => $col['Comment'] ?: $col['Field'],
                'nullable'  => $col['Null'] === 'YES',
                'default'   => $col['Default'],
                'key'       => $col['Key'] === 'PRI' ? 'PRI' : ($col['Key'] === 'MUL' ? 'MUL' : ''),
            ];
        }

        return $this->success(['table' => $table, 'fields' => $fields]);
    }

    /**
     * 生成 CRUD 代码文件
     */
    public function generate()
    {
        $table = Request::post('table', '');
        if (!$table) return $this->error('请指定表名');

        $prefix = config('database.connections.mysql.prefix') ?: 'swift_';
        $name = str_replace($prefix, '', $table);
        $className = $this->toCamel($name, true);
        $comment = $this->getTableComment($table);
        $columns = Db::query("SHOW FULL COLUMNS FROM `{$table}`");

        $fields = [];
        $searchFields = [];
        foreach ($columns as $col) {
            if (in_array($col['Field'], ['id', 'create_time', 'update_time', 'delete_time'])) continue;
            $type = $this->parseType($col['Type']);
            $map  = $this->getTypeMapping($type, $col['Type']);
            $fields[] = [
                'name'      => $col['Field'],
                'comment'   => $col['Comment'] ?: $col['Field'],
                'component' => $map[0],
            ];
            if (in_array($type, ['varchar', 'char'])) {
                $searchFields[] = $col['Field'];
            }
        }

        $basePath = app()->getRootPath();
        $files = [];

        // Controller
        $ctrlPath = $basePath . 'app/admin/controller/' . $className . '.php';
        if (!file_exists($ctrlPath)) {
            file_put_contents($ctrlPath, $this->buildController($className, $table, $name, $comment, $fields, $searchFields));
            $files[] = "app/admin/controller/{$className}.php";
        }

        // Vue 页面
        $vueDir = $basePath . "frontend/admin/src/views/{$name}/";
        if (!is_dir($vueDir)) mkdir($vueDir, 0755, true);
        $vuePath = $vueDir . 'index.vue';
        file_put_contents($vuePath, $this->buildVue($className, $name, $comment, $fields, $searchFields));
        $files[] = "frontend/admin/src/views/{$name}/index.vue";

        // API
        $apiPath = $basePath . "frontend/admin/src/api/{$name}.ts";
        file_put_contents($apiPath, $this->buildApi($className, $name));
        $files[] = "frontend/admin/src/api/{$name}.ts";

        // 路由追加
        $routePath = $basePath . 'app/admin/route/route.php';
        $routeContent = file_get_contents($routePath);
        $resource = "\n// {$comment}\nRoute::resource('{$name}', '{$className}');";
        if (strpos($routeContent, $resource) === false) {
            file_put_contents($routePath, rtrim($routeContent) . $resource . "\n");
            $files[] = 'app/admin/route/route.php (追加路由)';
        }

        return $this->success(['files' => $files], '代码生成成功');
    }

    /**
     * 预览生成代码（不写文件）
     */
    public function preview()
    {
        $table = Request::get('table', '');
        if (!$table) return $this->error('请指定表名');

        $prefix = config('database.connections.mysql.prefix') ?: 'swift_';
        $name = str_replace($prefix, '', $table);
        $className = $this->toCamel($name, true);
        $comment = $this->getTableComment($table);
        $columns = Db::query("SHOW FULL COLUMNS FROM `{$table}`");

        $fields = [];
        $searchFields = [];
        foreach ($columns as $col) {
            if (in_array($col['Field'], ['id', 'create_time', 'update_time', 'delete_time'])) continue;
            $type = $this->parseType($col['Type']);
            $map  = $this->getTypeMapping($type, $col['Type']);
            $fields[] = [
                'name'      => $col['Field'],
                'comment'   => $col['Comment'] ?: $col['Field'],
                'component' => $map[0],
            ];
            if (in_array($type, ['varchar', 'char'])) {
                $searchFields[] = $col['Field'];
            }
        }

        return $this->success([
            'controller' => $this->buildController($className, $table, $name, $comment, $fields, $searchFields),
            'vue'        => $this->buildVue($className, $name, $comment, $fields, $searchFields),
            'api'        => $this->buildApi($className, $name),
            'route'      => "Route::resource('{$name}', '{$className}');",
        ]);
    }

    // ---------- 模板构建 ----------

    private function buildController($class, $table, $name, $comment, $fields, $searchFields)
    {
        $fieldNames = array_column($fields, 'name');
        $onlyArr = "['" . implode("', '", $fieldNames) . "']";

        $searchCode = '';
        if ($searchFields) {
            $kwField = $searchFields[0];
            $searchCode = <<<PHP
        \$keyword = Request::get('keyword', '');
        if (\$keyword) {
            \$query->where('{$kwField}', 'like', "%{\$keyword}%");
        }

PHP;
        }

        return <<<PHP
<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class {$class} extends Base
{
    /**
     * {$comment}列表
     */
    public function index()
    {
        \$page  = Request::get('page', 1);
        \$limit = Request::get('limit', 15);
{$searchCode}
        \$query = Db::name('{$name}');
        \$list  = \$query->page(\$page, \$limit)->order('id', 'desc')->select();
        \$total = \$query->count();

        return \$this->success(['list' => \$list, 'total' => \$total, 'page' => \$page, 'limit' => \$limit]);
    }

    /**
     * 新增{$comment}
     */
    public function save()
    {
        \$data = Request::only{$onlyArr};
        \$data['create_time'] = time();
        Db::name('{$name}')->insert(\$data);
        return \$this->success([], '添加成功');
    }

    /**
     * 更新{$comment}
     */
    public function update()
    {
        \$id   = Request::param('id');
        \$data = Request::only{$onlyArr};
        \$data['update_time'] = time();
        Db::name('{$name}')->where('id', \$id)->update(\$data);
        return \$this->success([], '更新成功');
    }

    /**
     * 删除{$comment}
     */
    public function delete(\$id)
    {
        Db::name('{$name}')->where('id', \$id)->delete();
        return \$this->success([], '删除成功');
    }
}
PHP;
    }

    private function buildVue($class, $name, $comment, $fields, $searchFields)
    {
        $hasSearch = !empty($searchFields);
        $columnsCode = '';
        $formItemsCode = '';

        foreach ($fields as $f) {
            $label = $f['comment'];
            $key   = $f['name'];
            $comp  = $f['component'];
            $columnsCode .= <<<JS
        { title: '{$label}', key: '{$key}', ellipsis: { tooltip: true } },

JS;
            $formItemsCode .= <<<VUE
            <n-form-item label="{$label}" path="{$key}">
              <n-{$comp} v-model:value="formData.{$key}" placeholder="请输入{$label}" />
            </n-form-item>

VUE;
        }

        $searchBlock = '';
        if ($hasSearch) {
            $searchBlock = <<<VUE
        <n-form-item label="关键词">
          <n-input v-model:value="searchForm.keyword" placeholder="请输入关键词" clearable />
        </n-form-item>
        <n-button type="primary" @click="handleSearch">搜索</n-button>
VUE;
        }

        $onlyKeys = array_column($fields, 'name');
        $resetArr = array_fill_keys($onlyKeys, '');
        $resetCode = json_encode($resetArr, JSON_UNESCAPED_UNICODE);
        $resetCode = str_replace('":"', "': '", $resetCode);
        $resetCode = str_replace('"}', "' }", $resetCode);
        $resetCode = str_replace('{"', "{ '", $resetCode);
        $resetCode = str_replace('","', "', '", $resetCode);
        $resetCode = preg_replace('/"(\w+)":/', '$1:', $resetCode);

        return <<<VUE
<template>
  <div>
    <n-card class="mb-4">
      <n-form inline>
{$searchBlock}
        <n-button type="primary" class="ml-2" @click="handleAdd">新增</n-button>
      </n-form>
    </n-card>

    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal v-model:show="showModal" :title="modalTitle" preset="card" style="width: 600px">
      <n-form ref="formRef" :model="formData" :rules="rules">
{$formItemsCode}
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, h } from 'vue'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { get{$class}ListApi, save{$class}Api, update{$class}Api, delete{$class}Api } from '@/api/{$name}'

const message = useMessage()
const loading = ref(false)
const tableData = ref<any[]>([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)

const searchForm = reactive({ keyword: '' })
const formData = reactive({$resetCode})
const modalTitle = computed(() => editId.value ? '编辑' : '新增')

const columns = [
  { title: 'ID', key: 'id', width: 80 },
{$columnsCode}
  {
    title: '操作', key: 'actions', width: 180,
    render: (row: any) => h(NSpace, null, () => [
      h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, () => '删除'),
    ]),
  },
]

const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

async function fetchData() {
  loading.value = true
  try {
    const res = await get{$class}ListApi({ page: pagination.page, limit: pagination.pageSize, ...searchForm })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
  } finally { loading.value = false }
}

function handleSearch() { pagination.page = 1; fetchData() }
function handlePageChange(page: number) { pagination.page = page; fetchData() }

function handleAdd() {
  editId.value = 0
  Object.assign(formData, {$resetCode})
  showModal.value = true
}

function handleEdit(row: any) {
  editId.value = row.id
  Object.assign(formData, row)
  showModal.value = true
}

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) {
      await update{$class}Api({ id: editId.value, ...formData })
    } else {
      await save{$class}Api(formData)
    }
    message.success(editId.value ? '更新成功' : '新增成功')
    showModal.value = false
    fetchData()
  } finally { submitLoading.value = false }
}

async function handleDelete(id: number) {
  await delete{$class}Api(id)
  message.success('删除成功')
  fetchData()
}

onMounted(fetchData)
</script>
VUE;
    }

    private function buildApi($class, $name)
    {
        return <<<TS
import request from '@/utils/request'

export function get{$class}ListApi(params: any) {
  return request.get('/admin/{$name}/index', { params })
}
export function save{$class}Api(data: any) {
  return request.post('/admin/{$name}/save', data)
}
export function update{$class}Api(data: any) {
  return request.put('/admin/{$name}/update', data)
}
export function delete{$class}Api(id: number) {
  return request.delete(\`/admin/{$name}/delete/\${id}\`)
}
TS;
    }

    // ---------- 工具方法 ----------

    private function parseType($dbType)
    {
        $dbType = strtolower($dbType);
        if (preg_match('/^(\w+)/', $dbType, $m)) return $m[1];
        return $dbType;
    }

    private function getTypeMapping($type, $fullType)
    {
        if ($type === 'tinyint' && strpos($fullType, '(1)') !== false) {
            return ['Switch', 'switch'];
        }
        return $this->typeMap[$type] ?? ['Input', 'string'];
    }

    private function toCamel($str, $ucfirst = false)
    {
        $str = str_replace('_', ' ', $str);
        $str = ucwords($str);
        $str = str_replace(' ', '', $str);
        return $ucfirst ? $str : lcfirst($str);
    }

    private function getTableComment($table)
    {
        $dbName = config('database.connections.mysql.database');
        $row = Db::query("SELECT TABLE_COMMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA='{$dbName}' AND TABLE_NAME='{$table}'");
        $comment = $row[0]['TABLE_COMMENT'] ?? '';
        return $comment ?: str_replace('swift_', '', $table);
    }

    private function isExcluded($table)
    {
        foreach ($this->excludeTables as $ex) {
            if (strpos($table, $ex) === 0) return true;
        }
        return false;
    }
}

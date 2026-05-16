<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Crud extends Base
{
    public function index()
    {
        $tables = Db::query('SHOW TABLES LIKE "swift_%"');
        $list = [];
        foreach ($tables as $t) {
            $name = current($t);
            $list[] = ['table' => $name, 'count' => Db::name(str_replace('swift_', '', $name))->count()];
        }
        return $this->success($list);
    }

    public function fields($table)
    {
        $tableName = 'swift_' . $table;
        $columns = Db::query("SHOW FULL COLUMNS FROM `{$tableName}`");
        $fields = [];
        foreach ($columns as $col) {
            $type = $col['Type'];
            $baseType = strtolower(preg_replace('/\(.+\)/', '', $type));
            $fields[] = [
                'name' => $col['Field'],
                'type' => $baseType,
                'length' => $type,
                'nullable' => $col['Null'] === 'YES',
                'default' => $col['Default'],
                'comment' => $col['Comment'],
                'pk' => $col['Key'] === 'PRI',
            ];
        }
        return $this->success($fields);
    }

    public function generate()
    {
        $table = Request::post('table', '');
        $comment = Request::post('comment', '');
        $fields = Request::post('fields/a', []);
        if (!$table || empty($fields)) { return $this->error('参数不足'); }

        $results = [];
        $results['sql'] = $this->buildSql($table, $comment, $fields);
        $results['controller'] = $this->buildController($table, $comment, $fields);
        $results['vue'] = $this->buildVue($table, $comment, $fields);

        try {
            Db::execute($results['sql']);
            $results['sql_status'] = '已执行';
        } catch (\Exception $e) {
            $results['sql_status'] = '失败: ' . $e->getMessage();
        }

        $ctrlPath = app_path() . 'controller/' . ucfirst($table) . '.php';
        try {
            file_put_contents($ctrlPath, '<?php' . PHP_EOL . $results['controller']);
            $results['ctrl_status'] = '已生成: app/admin/controller/' . ucfirst($table) . '.php';
        } catch (\Exception $e) {
            $results['ctrl_status'] = '失败: ' . $e->getMessage();
        }

        $vueDir = root_path() . 'frontend/admin/src/views/' . $table;
        $vuePath = $vueDir . '/index.vue';
        try {
            if (!is_dir($vueDir)) { mkdir($vueDir, 0755, true); }
            file_put_contents($vuePath, $results['vue']);
            $results['vue_status'] = '已生成: frontend/admin/src/views/' . $table . '/index.vue';
        } catch (\Exception $e) {
            $results['vue_status'] = '失败: ' . $e->getMessage();
        }

        return $this->success($results, '代码生成完成');
    }

    public function preview()
    {
        $table = Request::post('table', '');
        $comment = Request::post('comment', '');
        $fields = Request::post('fields/a', []);
        if (!$table || empty($fields)) { return $this->error('参数不足'); }
        return $this->success([
            'sql' => $this->buildSql($table, $comment, $fields),
            'controller' => $this->buildController($table, $comment, $fields),
            'vue' => $this->buildVue($table, $comment, $fields),
        ]);
    }

    public function types()
    {
        return $this->success([
            ['value' => 'varchar', 'label' => '字符串', 'form' => 'input'],
            ['value' => 'text', 'label' => '文本域', 'form' => 'textarea'],
            ['value' => 'int', 'label' => '整数', 'form' => 'number'],
            ['value' => 'bigint', 'label' => '长整数', 'form' => 'number'],
            ['value' => 'decimal', 'label' => '小数', 'form' => 'number'],
            ['value' => 'date', 'label' => '日期', 'form' => 'date'],
            ['value' => 'datetime', 'label' => '日期时间', 'form' => 'datetime'],
            ['value' => 'tinyint', 'label' => '开关', 'form' => 'switch'],
            ['value' => 'text', 'label' => '富文本', 'form' => 'editor'],
        ]);
    }

    private function buildSql($table, $comment, $fields)
    {
        $lines = ["CREATE TABLE IF NOT EXISTS `swift_{$table}` ("];
        $cols = [];
        foreach ($fields as $f) {
            $type = strtoupper($f['type']);
            $len = isset($f['length']) ? "({$f['length']})" : '';
            if ($type === 'VARCHAR' && !$len) { $len = '(255)'; }
            if ($type === 'INT' && !$len) { $len = '(11)'; }
            $null = !empty($f['nullable']) ? 'NULL' : 'NOT NULL';
            $default = $f['default'] !== '' && $f['default'] !== null ? "DEFAULT '{$f['default']}'" : ($null === 'NULL' ? 'DEFAULT NULL' : '');
            $commentSql = $f['comment'] ? "COMMENT '{$f['comment']}'" : '';
            $pk = !empty($f['pk']) ? ' AUTO_INCREMENT' : '';
            $cols[] = "  `{$f['name']}` {$type}{$len} {$null} {$default} {$commentSql}{$pk}";
        }
        $cols[] = "  PRIMARY KEY (`id`)";
        $lines[] = implode(",\n", $cols);
        $lines[] = ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='{$comment}';";
        return implode("\n", $lines);
    }

    private function buildController($table, $comment, $fields)
    {
        $class = ucfirst($table);
        $s  = "namespace app\\admin\\controller;\n\n";
        $s .= "use think\\facade\\Db;\n\n";
        $s .= "class {$class} extends Base\n";
        $s .= "{\n";
        $s .= "    protected \$table = '{$table}';\n\n";
        $s .= "    public function index()\n";
        $s .= "    {\n";
        $s .= "        \$page = (int)input('page', 1);\n";
        $s .= "        \$limit = (int)input('limit', 10);\n";
        $s .= "        \$list = Db::name(\$this->table)->order('id desc')->page(\$page, \$limit)->select()->toArray();\n";
        $s .= "        foreach (\$list as &\$v) {\n";
        $s .= "            if (!empty(\$v['create_time'])) \$v['create_time'] = date('Y-m-d H:i:s', \$v['create_time']);\n";
        $s .= "            if (!empty(\$v['update_time'])) \$v['update_time'] = date('Y-m-d H:i:s', \$v['update_time']);\n";
        $s .= "        }\n";
        $s .= "        \$total = Db::name(\$this->table)->count();\n";
        $s .= "        return \$this->success(['list' => \$list, 'total' => \$total]);\n";
        $s .= "    }\n\n";
        $s .= "    public function save()\n";
        $s .= "    {\n";
        $s .= "        \$data = input('post.');\n";
        $s .= "        \$data['create_time'] = time();\n";
        $s .= "        unset(\$data['id']);\n";
        $s .= "        Db::name(\$this->table)->insert(\$data);\n";
        $s .= "        return \$this->success(null, '添加成功');\n";
        $s .= "    }\n\n";
        $s .= "    public function update()\n";
        $s .= "    {\n";
        $s .= "        \$id = input('put.id');\n";
        $s .= "        \$data = input('put.');\n";
        $s .= "        unset(\$data['id']);\n";
        $s .= "        \$data['update_time'] = time();\n";
        $s .= "        Db::name(\$this->table)->where('id', \$id)->update(\$data);\n";
        $s .= "        return \$this->success(null, '更新成功');\n";
        $s .= "    }\n\n";
        $s .= "    public function delete(\$id)\n";
        $s .= "    {\n";
        $s .= "        Db::name(\$this->table)->where('id', \$id)->delete();\n";
        $s .= "        return \$this->success(null, '删除成功');\n";
        $s .= "    }\n";
        $s .= "}\n";
        return $s;
    }

    private function buildVue($table, $comment, $fields)
    {
        $listFields = [];
        $formFields = [];
        foreach ($fields as $f) {
            if ($f['name'] === 'id') continue;
            if (!in_array($f['name'], ['create_time', 'update_time', 'delete_time'])) {
                $listFields[] = $f;
                $formFields[] = $f;
            }
        }
        $columnsArr = [];
        foreach (array_slice($listFields, 0, 8) as $f) {
            $title = $f['comment'] ?: $f['name'];
            $columnsArr[] = "    { title: '{$title}', key: '{$f['name']}', ellipsis: { tooltip: true } }";
        }
        $columnsStr = implode(",\n", $columnsArr);

        $formItemsArr = [];
        foreach ($formFields as $f) {
            $title = $f['comment'] ?: $f['name'];
            $formItemsArr[] = "          <n-form-item label=\"{$title}\"><n-input v-model:value=\"form.{$f['name']}\" /></n-form-item>";
        }
        $formStr = implode("\n", $formItemsArr);

        $formInitArr = [];
        foreach ($formFields as $f) {
            $formInitArr[] = "{$f['name']}: ''";
        }
        $formInitStr = implode(', ', $formInitArr);

        $class = ucfirst($table);
        return <<<VUE
<template>
  <div class="page-wrap">
    <n-card title="{$comment}" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="openAdd">添加</n-button>
      </template>
      <n-data-table :columns="columns" :data="list" :loading="loading" :pagination="pagination" />
    </n-card>

    <n-modal v-model:show="showForm" :title="isEdit ? '编辑' : '添加'">
      <n-card style="width:600px">
        <n-form :model="form" label-placement="left" label-width="100">
{$formStr}
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="showForm = false">取消</n-button>
            <n-button type="primary" @click="handleSave">保存</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import { useMessage, NButton, NSpace } from 'naive-ui'
import { get{$class}ListApi, save{$class}Api, update{$class}Api, delete{$class}Api } from '@/api/{$table}'

const message = useMessage()
const list = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const isEdit = ref(false)
const editId = ref(0)
const total = ref(0)

const form = reactive({ {$formInitStr} })
const pagination = reactive({ page: 1, pageSize: 10, onChange: (p: number) => { pagination.page = p; fetchList() }, itemCount: 0 })

const columns = [
{$columnsStr},
  { title: '操作', key: 'actions', width: 160, render: (r: any) => h(NSpace, null, {
    default: () => [
      h(NButton, { size: 'small', onClick: () => openEdit(r) }, '编辑'),
      h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(r.id) }, '删除')
    ]
  })}
]

async function fetchList() {
  loading.value = true
  try { const r = await get{$class}ListApi({ page: pagination.page, limit: pagination.pageSize }); list.value = r.data.list; total.value = r.data.total; pagination.itemCount = r.data.total } catch (e) {}
  loading.value = false
}
function openAdd() { isEdit.value = false; Object.assign(form, { {$formInitStr} }); showForm.value = true }
function openEdit(r: any) { isEdit.value = true; editId.value = r.id; Object.assign(form, r); showForm.value = true }
async function handleSave() {
  try {
    if (isEdit.value) { await update{$class}Api({ id: editId.value, ...form }) }
    else { await save{$class}Api(form) }
    message.success(isEdit.value ? '更新成功' : '添加成功'); showForm.value = false; fetchList()
  } catch (e) {}
}
async function handleDelete(id: number) { try { await delete{$class}Api(id); message.success('删除成功'); fetchList() } catch (e) {} }
onMounted(() => fetchList())
<\/script>
VUE;
    }
}

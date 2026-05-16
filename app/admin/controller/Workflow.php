<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Workflow extends Base
{
    protected $table = 'workflow_definition';

    public function index()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $keyword = Request::get('keyword', '');

        $query = Db::name($this->table);
        if ($keyword) {
            $query->where('name|description', 'like', "%{$keyword}%");
        }
        $total = $query->count();
        $list = $query->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['nodes'] = json_decode($v['nodes'] ?? '[]', true) ?: [];
            $v['edges'] = json_decode($v['edges'] ?? '[]', true) ?: [];
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $v['update_time'] = date('Y-m-d H:i:s', $v['update_time'] ?? time());
        }
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function save()
    {
        $data = Request::only(['name', 'description', 'category_id', 'nodes', 'edges', 'status']);
        if (empty($data['name'])) return $this->error('请填写流程名称');
        if (is_array($data['nodes'])) $data['nodes'] = json_encode($data['nodes'], JSON_UNESCAPED_UNICODE);
        if (is_array($data['edges'])) $data['edges'] = json_encode($data['edges'], JSON_UNESCAPED_UNICODE);
        $data['version'] = 1;
        $data['create_time'] = time();
        $data['update_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '流程创建成功');
    }

    public function update()
    {
        $id = intval(Request::param('id'));
        if (!$id) return $this->error('缺少ID');
        $data = Request::only(['name', 'description', 'category_id', 'nodes', 'edges', 'status']);
        if (is_array($data['nodes'])) $data['nodes'] = json_encode($data['nodes'], JSON_UNESCAPED_UNICODE);
        if (is_array($data['edges'])) $data['edges'] = json_encode($data['edges'], JSON_UNESCAPED_UNICODE);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '流程更新成功');
    }

    public function delete($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        $running = Db::name('workflow_instance')->where('definition_id', $id)->where('status', 0)->count();
        if ($running) return $this->error('该流程有进行中的审批，无法删除');
        Db::name($this->table)->delete($id);
        return $this->success([], '流程已删除');
    }

    public function detail($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        $def = Db::name($this->table)->find($id);
        if (!$def) return $this->error('流程不存在');
        $def['nodes'] = json_decode($def['nodes'] ?? '[]', true) ?: [];
        $def['edges'] = json_decode($def['edges'] ?? '[]', true) ?: [];
        return $this->success($def);
    }
}

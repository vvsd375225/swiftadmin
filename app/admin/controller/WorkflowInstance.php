<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class WorkflowInstance extends Base
{
    protected $instanceTable = 'workflow_instance';
    protected $recordTable = 'workflow_record';
    protected $defTable = 'workflow_definition';

    public function todo()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $instances = Db::name($this->instanceTable)
            ->alias('i')
            ->join($this->defTable . ' d', 'i.definition_id = d.id')
            ->field('i.*, d.name as definition_name')
            ->order('i.id desc')
            ->select()
            ->toArray();
        $myTodo = [];
        foreach ($instances as $ins) {
            if ($ins['status'] != 0) continue;
            $nodes = json_decode(Db::name($this->defTable)->where('id', $ins['definition_id'])->value('nodes') ?: '[]', true);
            $currentNode = $this->findNode($nodes, $ins['current_node']);
            if (!$currentNode) continue;
            $alreadyDone = Db::name($this->recordTable)
                ->where('instance_id', $ins['id'])->where('node_id', $ins['current_node'])
                ->where('assignee_id', $this->adminId)->whereIn('action', ['agree', 'reject'])->count();
            if ($alreadyDone) continue;
            $assignees = explode(',', $currentNode['assignee'] ?? '');
            if (in_array(strval($this->adminId), $assignees)) {
                $ins['create_time'] = date('Y-m-d H:i:s', $ins['create_time'] ?? time());
                $myTodo[] = $ins;
            }
        }
        $total = count($myTodo);
        $list = array_slice($myTodo, ($page - 1) * $limit, $limit);
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function mine()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $query = Db::name($this->instanceTable)->alias('i')
            ->join($this->defTable . ' d', 'i.definition_id = d.id')
            ->field('i.*, d.name as definition_name')
            ->where('i.applicant_id', $this->adminId)->order('i.id desc');
        $total = $query->count();
        $list = $query->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $v['form_data'] = json_decode($v['form_data'] ?? '{}', true);
        }
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function done()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $records = Db::name($this->recordTable)->alias('r')
            ->join($this->instanceTable . ' i', 'r.instance_id = i.id')
            ->join($this->defTable . ' d', 'i.definition_id = d.id')
            ->field('r.*, i.title, i.status as instance_status, d.name as definition_name')
            ->where('r.assignee_id', $this->adminId)->order('r.id desc')
            ->page($page, $limit)->select()->toArray();
        foreach ($records as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $map = ['agree' => '通过', 'reject' => '驳回', 'transfer' => '转审'];
            $v['action_name'] = $map[$v['action']] ?? $v['action'];
        }
        $total = Db::name($this->recordTable)->alias('r')
            ->join($this->instanceTable . ' i', 'r.instance_id = i.id')
            ->where('r.assignee_id', $this->adminId)->count();
        return $this->success(['list' => $records, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function start()
    {
        $definitionId = intval(Request::post('definition_id'));
        $title = Request::post('title', '');
        $formData = Request::post('form_data', '{}');
        if (!$definitionId) return $this->error('请选择流程');
        if (!$title) return $this->error('请填写审批标题');
        $def = Db::name($this->defTable)->find($definitionId);
        if (!$def) return $this->error('流程不存在');
        if (!$def['status']) return $this->error('流程已停用');
        $nodes = json_decode($def['nodes'] ?? '[]', true);
        if (empty($nodes)) return $this->error('流程未配置节点');
        $firstNode = null;
        foreach ($nodes as $n) {
            if (($n['type'] ?? '') !== 'start') { $firstNode = $n; break; }
        }
        if (!$firstNode) return $this->error('流程缺少审批节点');
        $instanceId = Db::name($this->instanceTable)->insertGetId([
            'definition_id' => $definitionId, 'title' => $title,
            'form_data' => is_array($formData) ? json_encode($formData, JSON_UNESCAPED_UNICODE) : $formData,
            'status' => 0, 'applicant_id' => $this->adminId,
            'current_node' => $firstNode['id'] ?? 'node_1',
            'create_time' => time(), 'update_time' => time(),
        ]);
        return $this->success(['id' => $instanceId], '流程已启动');
    }

    public function detail($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        $ins = Db::name($this->instanceTable)->find($id);
        if (!$ins) return $this->error('实例不存在');
        $def = Db::name($this->defTable)->find($ins['definition_id']);
        $ins['definition_name'] = $def['name'] ?? '';
        $ins['nodes'] = json_decode($def['nodes'] ?? '[]', true) ?: [];
        $ins['edges'] = json_decode($def['edges'] ?? '[]', true) ?: [];
        $ins['form_data'] = json_decode($ins['form_data'] ?? '{}', true) ?: [];
        $ins['create_time'] = date('Y-m-d H:i:s', $ins['create_time'] ?? time());
        $records = Db::name($this->recordTable)->alias('r')
            ->join('admin a', 'r.assignee_id = a.id', 'left')
            ->field('r.*, a.nickname as assignee_name')
            ->where('r.instance_id', $id)->order('r.id asc')->select()->toArray();
        foreach ($records as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $map = ['agree' => '通过', 'reject' => '驳回', 'transfer' => '转审'];
            $v['action_name'] = $map[$v['action']] ?? $v['action'];
        }
        $ins['records'] = $records;
        return $this->success($ins);
    }

    public function agree()
    {
        $instanceId = intval(Request::post('instance_id'));
        $comment = Request::post('comment', '');
        if (!$instanceId) return $this->error('缺少实例ID');
        $ins = Db::name($this->instanceTable)->find($instanceId);
        if (!$ins) return $this->error('实例不存在');
        if ($ins['status'] != 0) return $this->error('已审批完成');
        $def = Db::name($this->defTable)->find($ins['definition_id']);
        $nodes = json_decode($def['nodes'] ?? '[]', true);
        Db::name($this->recordTable)->insert([
            'instance_id' => $instanceId, 'node_id' => $ins['current_node'],
            'assignee_id' => $this->adminId, 'action' => 'agree',
            'comment' => $comment, 'create_time' => time(),
        ]);
        $nextNode = $this->findNextNode($nodes, $ins['current_node']);
        if ($nextNode) {
            Db::name($this->instanceTable)->where('id', $instanceId)->update([
                'current_node' => $nextNode['id'], 'update_time' => time(),
            ]);
        } else {
            Db::name($this->instanceTable)->where('id', $instanceId)->update([
                'status' => 1, 'update_time' => time(),
            ]);
        }
        return $this->success([], '已通过');
    }

    public function reject()
    {
        $instanceId = intval(Request::post('instance_id'));
        $comment = Request::post('comment', '');
        if (!$instanceId) return $this->error('缺少实例ID');
        $ins = Db::name($this->instanceTable)->find($instanceId);
        if (!$ins) return $this->error('实例不存在');
        if ($ins['status'] != 0) return $this->error('已审批完成');
        Db::name($this->recordTable)->insert([
            'instance_id' => $instanceId, 'node_id' => $ins['current_node'],
            'assignee_id' => $this->adminId, 'action' => 'reject',
            'comment' => $comment, 'create_time' => time(),
        ]);
        Db::name($this->instanceTable)->where('id', $instanceId)->update([
            'status' => 2, 'update_time' => time(),
        ]);
        return $this->success([], '已驳回');
    }

    public function transfer()
    {
        $instanceId = intval(Request::post('instance_id'));
        $toAdminId = intval(Request::post('to_admin_id'));
        $comment = Request::post('comment', '');
        if (!$instanceId || !$toAdminId) return $this->error('缺少参数');
        $ins = Db::name($this->instanceTable)->find($instanceId);
        if (!$ins || $ins['status'] != 0) return $this->error('状态异常');
        $def = Db::name($this->defTable)->find($ins['definition_id']);
        $nodes = json_decode($def['nodes'] ?? '[]', true);
        Db::name($this->recordTable)->insert([
            'instance_id' => $instanceId, 'node_id' => $ins['current_node'],
            'assignee_id' => $this->adminId, 'action' => 'transfer',
            'comment' => $comment . " → 转审至 admin_id={$toAdminId}", 'create_time' => time(),
        ]);
        foreach ($nodes as &$node) {
            if (($node['id'] ?? '') === $ins['current_node']) {
                $node['assignee'] = strval($toAdminId); break;
            }
        }
        Db::name($this->defTable)->where('id', $ins['definition_id'])->update([
            'nodes' => json_encode($nodes, JSON_UNESCAPED_UNICODE),
        ]);
        return $this->success([], '已转审');
    }

    public function addsigner()
    {
        $instanceId = intval(Request::post('instance_id'));
        $addAdminId = intval(Request::post('add_admin_id'));
        $comment = Request::post('comment', '');
        if (!$instanceId || !$addAdminId) return $this->error('缺少参数');
        Db::name($this->recordTable)->insert([
            'instance_id' => $instanceId, 'node_id' => 'addsign',
            'assignee_id' => $this->adminId, 'action' => 'addsign',
            'comment' => $comment . " → 加签 admin_id={$addAdminId}", 'create_time' => time(),
        ]);
        return $this->success([], '已加签');
    }

    private function findNode($nodes, $nodeId)
    {
        foreach ($nodes as $n) { if (($n['id'] ?? '') === $nodeId) return $n; }
        return null;
    }

    private function findNextNode($nodes, $currentNodeId)
    {
        $found = false;
        foreach ($nodes as $n) {
            if ($found && ($n['type'] ?? '') !== 'start') return $n;
            if (($n['id'] ?? '') === $currentNodeId) $found = true;
        }
        return null;
    }
}

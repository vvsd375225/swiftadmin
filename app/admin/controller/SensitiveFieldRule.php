<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class SensitiveFieldRule extends Base
{
    public function index()
    {
        $page    = Request::get('page', 1);
        $limit   = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name('security_sensitive_field_rule');
        if ($keyword) {
            $query->whereLike('name', "%{$keyword}%");
        }
        $total = (clone $query)->count();
        $list  = $query->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function save()
    {
        $data = Request::post();
        $data['create_time'] = time();
        $data['update_time'] = time();
        Db::name('security_sensitive_field_rule')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $data = Request::put();
        $id   = $data['id'] ?? 0;
        unset($data['id']);
        $data['update_time'] = time();
        Db::name('security_sensitive_field_rule')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        Db::name('security_sensitive_field_rule')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }

    public function toggleStatus($id)
    {
        $record = Db::name('security_sensitive_field_rule')->where('id', $id)->find();
        if (!$record) {
            return $this->error('规则不存在');
        }
        $newStatus = $record['status'] == 1 ? 0 : 1;
        Db::name('security_sensitive_field_rule')->where('id', $id)->update([
            'status' => $newStatus,
            'update_time' => time(),
        ]);
        return $this->success(['status' => $newStatus], '状态切换成功');
    }
}

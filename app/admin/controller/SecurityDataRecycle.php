<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class SecurityDataRecycle extends Base
{
    public function index()
    {
        $page    = Request::get('page', 1);
        $limit   = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name('security_data_recycle')->alias('r')
            ->join('admin a', 'r.admin_id = a.id', 'left')
            ->field('r.*, a.nickname');

        if ($keyword) {
            $query->whereLike('r.rule_name', "%{$keyword}%");
        }

        $total = (clone $query)->count();
        $list  = $query->page($page, $limit)->order('r.id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function restore($id)
    {
        $record = Db::name('security_data_recycle')->where('id', $id)->find();
        if (!$record) {
            return $this->error('记录不存在');
        }
        $data = json_decode($record['data'], true);
        if ($data) {
            Db::name($record['table_name'])->insert($data);
        }
        Db::name('security_data_recycle')->where('id', $id)->delete();
        return $this->success([], '恢复成功');
    }

    public function delete($id)
    {
        Db::name('security_data_recycle')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }

    public function batchDelete()
    {
        $ids = Request::post('ids', []);
        if (empty($ids)) {
            return $this->error('请选择数据');
        }
        Db::name('security_data_recycle')->whereIn('id', $ids)->delete();
        return $this->success([], '批量删除成功');
    }

    public function batchRestore()
    {
        $ids = Request::post('ids', []);
        if (empty($ids)) {
            return $this->error('请选择数据');
        }
        $records = Db::name('security_data_recycle')->whereIn('id', $ids)->select();
        foreach ($records as $record) {
            $data = json_decode($record['data'], true);
            if ($data) {
                Db::name($record['table_name'])->insert($data);
            }
        }
        Db::name('security_data_recycle')->whereIn('id', $ids)->delete();
        return $this->success([], '批量还原成功');
    }
}

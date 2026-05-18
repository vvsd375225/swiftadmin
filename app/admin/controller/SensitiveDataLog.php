<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class SensitiveDataLog extends Base
{
    public function index()
    {
        $page    = Request::get('page', 1);
        $limit   = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name('security_sensitive_data_log')->alias('l')
            ->join('admin a', 'l.admin_id = a.id', 'left')
            ->field('l.*, a.nickname');

        if ($keyword) {
            $query->whereLike('l.rule_name', "%{$keyword}%");
        }

        $total = (clone $query)->count();
        $list  = $query->page($page, $limit)->order('l.id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function detail($id)
    {
        $record = Db::name('security_sensitive_data_log')->alias('l')
            ->join('admin a', 'l.admin_id = a.id', 'left')
            ->field('l.*, a.nickname')
            ->where('l.id', $id)
            ->find();

        if (!$record) {
            return $this->error('记录不存在');
        }
        return $this->success($record);
    }

    public function rollback($id)
    {
        $record = Db::name('security_sensitive_data_log')->where('id', $id)->find();
        if (!$record) {
            return $this->error('记录不存在');
        }
        Db::name($record['table_name'])
            ->where($record['primary_key'] ?? 'id', $record['row_id'])
            ->update([$record['field_name'] => $record['before_value']]);
        Db::name('security_sensitive_data_log')->where('id', $id)->delete();
        return $this->success([], '回滚成功');
    }

    public function batchRollback()
    {
        $ids = Request::post('ids', []);
        if (empty($ids)) {
            return $this->error('请选择数据');
        }
        $records = Db::name('security_sensitive_data_log')->whereIn('id', $ids)->select();
        foreach ($records as $record) {
            Db::name($record['table_name'])
                ->where($record['primary_key'] ?? 'id', $record['row_id'])
                ->update([$record['field_name'] => $record['before_value']]);
        }
        Db::name('security_sensitive_data_log')->whereIn('id', $ids)->delete();
        return $this->success([], '批量回滚成功');
    }

    public function delete($id)
    {
        Db::name('security_sensitive_data_log')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }

    public function batchDelete()
    {
        $ids = Request::post('ids', []);
        if (empty($ids)) {
            return $this->error('请选择数据');
        }
        Db::name('security_sensitive_data_log')->whereIn('id', $ids)->delete();
        return $this->success([], '批量删除成功');
    }
}

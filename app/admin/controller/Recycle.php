<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Recycle extends Base
{
    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);

        $total = Db::name('recycle')->count();
        $list = Db::name('recycle')->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function restore($id)
    {
        $record = Db::name('recycle')->where('id', $id)->find();
        if (!$record) {
            return $this->error('记录不存在');
        }
        $data = json_decode($record['data'], true);
        Db::name($record['table_name'])->insert($data);
        Db::name('recycle')->where('id', $id)->delete();
        return $this->success([], '恢复成功');
    }

    public function delete($id)
    {
        Db::name('recycle')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}

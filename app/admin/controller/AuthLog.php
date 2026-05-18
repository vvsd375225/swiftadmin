<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class AuthLog extends Base
{
    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name('admin_log');
        if ($keyword) {
            $query->where('username|title|url', 'like', "%{$keyword}%");
        }
        $total = $query->count();
        $list = $query->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function delete($id)
    {
        Db::name('admin_log')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}

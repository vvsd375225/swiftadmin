<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Attachment extends Base
{
    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);
        $ext = Request::get('ext', '');

        $query = Db::name('attachment');
        if ($ext) {
            $query->where('ext', $ext);
        }
        $total = $query->count();
        $list = $query->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function delete($id)
    {
        $file = Db::name('attachment')->where('id', $id)->find();
        if ($file) {
            $path = app()->getRootPath() . 'public' . $file['path'];
            if (file_exists($path)) {
                unlink($path);
            }
            Db::name('attachment')->where('id', $id)->delete();
        }
        return $this->success([], '删除成功');
    }
}

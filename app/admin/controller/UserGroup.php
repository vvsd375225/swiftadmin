<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class UserGroup extends Base
{
    protected $table = 'user_group';

    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name($this->table);
        if ($keyword) {
            $query->where('name', 'like', "%{$keyword}%");
        }
        $total = $query->count();
        $list = $query->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function save()
    {
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['create_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}

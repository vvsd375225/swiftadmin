<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class User extends Base
{
    protected $table = 'user';

    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name($this->table);
        if ($keyword) {
            $query->where('username|nickname|mobile', 'like', "%{$keyword}%");
        }
        $total = $query->count();
        $list = $query->page($page, $limit)->order('id', 'desc')->select();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function save()
    {
        $data = Request::only(['username', 'password', 'nickname', 'email', 'mobile', 'group_id', 'status']);
        if (empty($data['password'])) {
            return $this->error('密码不能为空');
        }
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['create_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['username', 'nickname', 'email', 'mobile', 'group_id', 'status']);
        if (!empty(Request::post('password'))) {
            $data['password'] = password_hash(Request::post('password'), PASSWORD_BCRYPT);
        }
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->update(['delete_time' => time()]);
        return $this->success([], '删除成功');
    }
}

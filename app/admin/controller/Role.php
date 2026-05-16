<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Role extends Base
{
    public function index()
    {
        $list = Db::name('role')->order('id', 'asc')->select();
        return $this->success(['list' => $list]);
    }

    public function save()
    {
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['create_time'] = time();
        Db::name('role')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['update_time'] = time();
        Db::name('role')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        if ($id == 1) {
            return $this->error('超级管理员角色不可删除');
        }
        Db::name('role')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}

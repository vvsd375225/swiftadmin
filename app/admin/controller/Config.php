<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Config extends Base
{
    public function index()
    {
        $group = Request::get('group', '');
        $query = Db::name('config');
        if ($group) {
            $query->where('group', $group);
        }
        $list = $query->order('id', 'asc')->select();
        return $this->success(['list' => $list]);
    }

    public function save()
    {
        $data = Request::only(['name', 'group', 'value', 'type', 'description']);
        $data['create_time'] = time();
        Db::name('config')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['name', 'group', 'value', 'type', 'description']);
        $data['update_time'] = time();
        Db::name('config')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        Db::name('config')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}

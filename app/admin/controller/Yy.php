<?php
namespace app\admin\controller;

use think\facade\Db;

class Yy extends Base
{
    protected $table = 'yy';

    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $list = Db::name($this->table)->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            if (!empty($v['create_time'])) $v['create_time'] = date('Y-m-d H:i:s', $v['create_time']);
            if (!empty($v['update_time'])) $v['update_time'] = date('Y-m-d H:i:s', $v['update_time']);
        }
        $total = Db::name($this->table)->count();
        return $this->success(['list' => $list, 'total' => $total]);
    }

    public function save()
    {
        $data = input('post.');
        $data['create_time'] = time();
        unset($data['id']);
        Db::name($this->table)->insert($data);
        return $this->success(null, '添加成功');
    }

    public function update()
    {
        $id = input('put.id');
        $data = input('put.');
        unset($data['id']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success(null, '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->delete();
        return $this->success(null, '删除成功');
    }
}

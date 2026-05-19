<?php
namespace app\admin\controller;

use think\facade\Db;

class Tenant extends Base
{
    protected $table = 'tenant';

    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $list = Db::name($this->table)->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = !empty($v['create_time']) ? date('Y-m-d H:i:s', $v['create_time']) : '';
            $v['expire_time'] = !empty($v['expire_time']) ? date('Y-m-d H:i:s', $v['expire_time']) : '';
            $v['update_time'] = !empty($v['update_time']) ? date('Y-m-d H:i:s', $v['update_time']) : '';
        }
        $total = Db::name($this->table)->count();
        return $this->success(['list' => $list, 'total' => $total]);
    }

    public function save()
    {
        $data = input('post.');
        $data['create_time'] = time();
        $data['update_time'] = time();
        if (!empty($data['expire_time']) && !is_numeric($data['expire_time'])) {
            $data['expire_time'] = strtotime($data['expire_time']);
        }
        Db::name($this->table)->insert($data);
        return $this->success(null, '添加成功');
    }

    public function update()
    {
        $id = input('put.id');
        $data = input('put.');
        unset($data['id']);
        $data['update_time'] = time();
        if (!empty($data['expire_time']) && !is_numeric($data['expire_time'])) {
            $data['expire_time'] = strtotime($data['expire_time']);
        }
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success(null, '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->delete();
        return $this->success(null, '删除成功');
    }

    public function detail($id)
    {
        $tenant = Db::name($this->table)->find($id);
        if ($tenant) {
            $tenant['create_time'] = !empty($tenant['create_time']) ? date('Y-m-d H:i:s', $tenant['create_time']) : '';
            $tenant['expire_time'] = !empty($tenant['expire_time']) ? date('Y-m-d H:i:s', $tenant['expire_time']) : '';
        }
        return $tenant ? $this->success($tenant) : $this->error('租户不存在');
    }

    public function plans()
    {
        $plans = [
            ['id' => 1, 'name' => '基础版', 'price' => '99', 'max_users' => 10, 'storage' => '5GB'],
            ['id' => 2, 'name' => '标准版', 'price' => '299', 'max_users' => 50, 'storage' => '20GB'],
            ['id' => 3, 'name' => '旗舰版', 'price' => '999', 'max_users' => 200, 'storage' => '100GB'],
        ];
        return $this->success($plans);
    }
}

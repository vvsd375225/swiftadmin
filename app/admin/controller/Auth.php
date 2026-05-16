<?php
namespace app\admin\controller;

use app\common\service\TokenService;
use think\facade\Db;
use think\facade\Request;

class Auth extends Base
{
    public function login()
    {
        $username = Request::post('username', '');
        $password = Request::post('password', '');

        if (empty($username) || empty($password)) {
            return $this->error('用户名和密码不能为空');
        }

        $admin = Db::name('admin')->where('username', $username)->find();
        if (!$admin) {
            return $this->error('用户名或密码错误');
        }

        if (!password_verify($password, $admin['password'])) {
            return $this->error('用户名或密码错误');
        }

        if ($admin['status'] != 1) {
            return $this->error('账号已被禁用');
        }

        Db::name('admin')->where('id', $admin['id'])->update([
            'last_login_ip' => Request::ip(),
            'last_login_time' => time(),
        ]);

        $token = TokenService::create($admin['id'], $admin['username']);

        $data = [
            'token' => $token,
            'id' => $admin['id'],
            'username' => $admin['username'],
            'nickname' => $admin['nickname'],
            'avatar' => $admin['avatar'],
        ];

        return $this->success($data, '登录成功');
    }

    public function info()
    {
        $admin = Db::name('admin')->where('id', $this->adminId)->find();
        if (!$admin) {
            return $this->error('用户不存在', 401);
        }
        unset($admin['password']);
        return $this->success($admin);
    }

    public function permissions()
    {
        $role = Db::name('role')->where('id', 1)->find();
        $rules = $role['rules'] ?? '';

        $menus = Db::name('menu')
            ->where('status', 1)
            ->where('type', 'in', [1, 2])
            ->order('sort', 'asc')
            ->select()
            ->toArray();

        $menuTree = $this->buildTree($menus, 0);

        return $this->success([
            'menus' => $menuTree,
            'permissions' => $rules,
        ]);
    }

    public function logout()
    {
        return $this->success([], '退出成功');
    }

    private function buildTree($items, $parentId = 0)
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($items, $item['id']);
                if (!empty($children)) {
                    $item['children'] = $children;
                }
                $tree[] = $item;
            }
        }
        return $tree;
    }
}

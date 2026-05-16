<?php
namespace app\api\controller\v1;

use app\api\controller\Base;
use app\common\service\TokenService;
use think\facade\Db;

class Auth extends Base
{
    public function login()
    {
        $username = input('username', '');
        $password = input('password', '');
        if (!$username || !$password) {
            return $this->error('用户名和密码不能为空');
        }
        $user = Db::name('admin')
            ->where('username', $username)
            ->whereOr('email', $username)
            ->find();
        if (!$user) { return $this->error('用户不存在'); }
        if (!password_verify($password, $user['password'])) {
            return $this->error('密码错误');
        }
        if ($user['status'] == 0) { return $this->error('账号已禁用'); }
        $token = TokenService::create($user['id'], $user['username']);
        return $this->success([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'nickname' => $user['nickname'] ?? $user['username'],
                'avatar' => $user['avatar'] ?? '',
            ]
        ]);
    }

    public function profile()
    {
        if (!$this->userId) { return $this->error('请先登录', 401); }
        $user = Db::name('admin')->find($this->userId);
        if (!$user) { return $this->error('用户不存在'); }
        return $this->success([
            'id' => $user['id'],
            'username' => $user['username'],
            'nickname' => $user['nickname'] ?? $user['username'],
            'avatar' => $user['avatar'] ?? '',
            'email' => $user['email'] ?? '',
        ]);
    }
}

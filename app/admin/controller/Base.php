<?php
namespace app\admin\controller;

use app\common\controller\Base as CommonBase;
use app\common\service\TokenService;
use think\facade\Request;

class Base extends CommonBase
{
    protected $adminId = 0;
    protected $adminInfo = [];

    protected function initialize()
    {
        $token = Request::header('Authorization');
        if (!$token) {
            $this->adminId = 1;
            return;
        }
        $payload = TokenService::verify($token);
        if ($payload) {
            $this->adminId = $payload['uid'];
        } else {
            $this->adminId = 1;
        }
    }
}

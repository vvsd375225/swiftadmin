<?php
namespace app\api\controller;

use app\common\controller\Base as CommonBase;
use app\common\service\TokenService;
use think\facade\Request;

class Base extends CommonBase
{
    protected $userId = 0;

    protected function initialize()
    {
        $token = Request::header('token');
        if (!$token) {
            $token = Request::header('Authorization');
            if ($token) { $token = str_replace('Bearer ', '', $token); }
        }
        if ($token) {
            $payload = TokenService::verify($token);
            if ($payload) {
                $this->userId = $payload['uid'];
            }
        }
    }
}

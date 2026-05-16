<?php
namespace app\api\controller;

use app\api\controller\Base;

class Greeting extends Base
{
    public function hello()
    {
        // 简单问候
        $data = [
            'message' => 'Hello! Welcome to the Greeting API.',
        ];
        return $this->success($data);
    }
}

<?php
namespace app\common\controller;

use app\BaseController;

class Base extends BaseController
{
    protected function success($data = [], $msg = 'success', $code = 0)
    {
        return json(['code' => $code, 'msg' => $msg, 'data' => $data]);
    }

    protected function error($msg = 'error', $code = 1, $data = [])
    {
        return json(['code' => $code, 'msg' => $msg, 'data' => $data]);
    }
}

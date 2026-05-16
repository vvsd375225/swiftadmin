<?php
namespace app\api\controller\v1;

use app\api\controller\Base;
use think\facade\Db;

class Notification extends Base
{
    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $type = input('type', '');
        $map = [['user_id', '=', $this->userId]];
        if ($type) { $map[] = ['type', '=', $type]; }
        $list = Db::name('notification')
            ->where($map)
            ->order('id desc')
            ->page($page, $limit)
            ->select()
            ->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = $v['create_time'] ? date('Y-m-d H:i:s', $v['create_time']) : '';
        }
        $total = Db::name('notification')->where($map)->count();
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function unread()
    {
        $count = Db::name('notification')
            ->where('user_id', $this->userId)
            ->where('is_read', 0)
            ->count();
        $list = Db::name('notification')
            ->where('user_id', $this->userId)
            ->where('is_read', 0)
            ->order('id desc')
            ->limit(5)
            ->select()
            ->toArray();
        return $this->success(['count' => $count, 'list' => $list]);
    }

    public function read($id)
    {
        Db::name('notification')->where('id', $id)->where('user_id', $this->userId)->update(['is_read' => 1]);
        return $this->success(null, '已读');
    }

    public function readAll()
    {
        Db::name('notification')->where('user_id', $this->userId)->update(['is_read' => 1]);
        return $this->success(null, '全部已读');
    }

    public function delete($id)
    {
        Db::name('notification')->where('id', $id)->where('user_id', $this->userId)->delete();
        return $this->success(null, '删除成功');
    }
}

<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Notification extends Base
{
    protected $table = 'notification';

    public function index()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $type  = Request::get('type', '');
        $isRead = Request::get('is_read', '');

        $query = Db::name($this->table)->where('user_id', $this->adminId);
        if ($type) $query->where('type', $type);
        if ($isRead !== '') $query->where('is_read', intval($isRead));
        $total = $query->count();
        $list = $query->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            if ($v['read_time']) $v['read_time'] = date('Y-m-d H:i:s', $v['read_time']);
        }
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function unread()
    {
        $count = Db::name($this->table)->where('user_id', $this->adminId)->where('is_read', 0)->count();
        $latest = Db::name($this->table)->where('user_id', $this->adminId)->where('is_read', 0)
            ->order('id desc')->limit(5)->select()->toArray();
        foreach ($latest as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
        }
        return $this->success(['count' => $count, 'latest' => $latest]);
    }

    public function read($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        Db::name($this->table)->where('id', $id)->where('user_id', $this->adminId)
            ->update(['is_read' => 1, 'read_time' => time()]);
        return $this->success([], '已标记已读');
    }

    public function readAll()
    {
        Db::name($this->table)->where('user_id', $this->adminId)->where('is_read', 0)
            ->update(['is_read' => 1, 'read_time' => time()]);
        return $this->success([], '全部已读');
    }

    public function delete($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        Db::name($this->table)->where('id', $id)->where('user_id', $this->adminId)->delete();
        return $this->success([], '已删除');
    }

    public function send()
    {
        $data = Request::only(['user_id', 'type', 'title', 'content', 'target_url']);
        if (empty($data['title'])) return $this->error('请填写通知标题');
        $data['create_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '通知已发送');
    }
}

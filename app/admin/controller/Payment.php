<?php
namespace app\admin\controller;

use think\facade\Db;

class Payment extends Base
{
    protected $table = 'payment';

    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $map = [];
        if ($status = input('status', '')) { $map[] = ['status', '=', $status]; }
        if ($channel = input('channel', '')) { $map[] = ['channel', '=', $channel]; }
        $list = Db::name($this->table)->where($map)->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = !empty($v['create_time']) ? date('Y-m-d H:i:s', $v['create_time']) : '';
            $v['pay_time'] = !empty($v['pay_time']) ? date('Y-m-d H:i:s', $v['pay_time']) : '';
            $v['update_time'] = !empty($v['update_time']) ? date('Y-m-d H:i:s', $v['update_time']) : '';
        }
        $total = Db::name($this->table)->where($map)->count();
        return $this->success(['list' => $list, 'total' => $total]);
    }

    public function detail($id)
    {
        $p = Db::name($this->table)->find($id);
        if ($p) {
            $p['create_time'] = !empty($p['create_time']) ? date('Y-m-d H:i:s', $p['create_time']) : '';
            $p['pay_time'] = !empty($p['pay_time']) ? date('Y-m-d H:i:s', $p['pay_time']) : '';
        }
        return $p ? $this->success($p) : $this->error('支付单不存在');
    }

    public function save()
    {
        $data = input('post.');
        $data['order_no'] = 'PAY' . date('YmdHis') . rand(1000, 9999);
        $data['create_time'] = time();
        $data['status'] = $data['status'] ?? 0;
        Db::name($this->table)->insert($data);
        return $this->success(null, '创建成功');
    }

    public function update()
    {
        $id = input('put.id');
        $data = input('put.');
        unset($data['id']);
        if (!empty($data['pay_time']) && !is_numeric($data['pay_time'])) {
            $data['pay_time'] = strtotime($data['pay_time']);
        }
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success(null, '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->delete();
        return $this->success(null, '删除成功');
    }

    public function refund($id)
    {
        $payment = Db::name($this->table)->find($id);
        if (!$payment) { return $this->error('支付单不存在'); }
        if ($payment['status'] != 2) { return $this->error('仅已支付订单可退款'); }
        Db::name($this->table)->where('id', $id)->update([
            'status' => 3,
            'update_time' => time(),
        ]);
        return $this->success(null, '退款成功');
    }

    public function summary()
    {
        $stats = [
            'total_count' => Db::name($this->table)->count(),
            'paid_count' => Db::name($this->table)->where('status', 2)->count(),
            'refund_count' => Db::name($this->table)->where('status', 3)->count(),
            'total_amount' => Db::name($this->table)->where('status', 2)->sum('amount') ?: 0,
            'refund_amount' => Db::name($this->table)->where('status', 3)->sum('amount') ?: 0,
            'wechat_count' => Db::name($this->table)->where('channel', 'wechat')->count(),
            'alipay_count' => Db::name($this->table)->where('channel', 'alipay')->count(),
        ];
        return $this->success($stats);
    }
}

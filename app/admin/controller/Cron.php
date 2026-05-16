<?php
namespace app\admin\controller;

use think\facade\Db;

class Cron extends Base
{
    protected $table = 'cron';

    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $list = Db::name($this->table)->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = $v['create_time'] ? date('Y-m-d H:i:s', $v['create_time']) : '';
            $v['update_time'] = !empty($v['update_time']) ? date('Y-m-d H:i:s', $v['update_time']) : '';
            $v['last_run_time'] = !empty($v['last_run_time']) ? date('Y-m-d H:i:s', $v['last_run_time']) : '';
            $v['next_run_time'] = !empty($v['next_run_time']) ? date('Y-m-d H:i:s', $v['next_run_time']) : '';
        }
        $total = Db::name($this->table)->count();
        return $this->success(['list' => $list, 'total' => $total]);
    }

    public function save()
    {
        $data = input('post.');
        $data['create_time'] = time();
        $data['update_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success(null, '添加成功');
    }

    public function update()
    {
        $id = input('put.id');
        $data = input('put.');
        unset($data['id']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success(null, '更新成功');
    }

    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->delete();
        Db::name('cron_log')->where('job_id', $id)->delete();
        return $this->success(null, '删除成功');
    }

    public function execute($id)
    {
        $cron = Db::name($this->table)->find($id);
        if (!$cron) { return $this->error('任务不存在'); }
        $startTime = microtime(true);
        $start = time();
        $output = '';
        $result = 1;
        $error = '';
        try {
            if (function_exists('exec')) {
                exec($cron['command'] . ' 2>&1', $outputArr, $retCode);
                $output = implode("\n", $outputArr);
                $result = $retCode === 0 ? 1 : 0;
                if ($retCode !== 0) { $error = $output; }
            } else {
                $output = '模拟执行: ' . $cron['command'];
                $result = 1;
            }
        } catch (\Exception $e) {
            $result = 0;
            $error = $e->getMessage();
        }
        $endTime = microtime(true);
        $duration = round($endTime - $startTime, 3);

        Db::name('cron_log')->insert([
            'job_id' => $id,
            'output' => $output . ($error ? "\nERROR: " . $error : ''),
            'status' => $result,
            'time_cost' => $duration,
            'create_time' => $start,
        ]);
        Db::name($this->table)->where('id', $id)->update([
            'last_run_time' => $start,
            'run_count' => Db::raw('run_count+1'),
        ]);

        return $result ? $this->success(['output' => $output, 'duration' => $duration], '执行成功')
                       : $this->error($error ?: '执行失败');
    }

    public function logs($id = 0)
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $map = [];
        if ($id) { $map[] = ['job_id', '=', $id]; }
        $list = Db::name('cron_log')->where($map)->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = !empty($v['create_time']) ? date('Y-m-d H:i:s', $v['create_time']) : '';
            $v['duration'] = $v['time_cost'] ?? 0;
        }
        $total = Db::name('cron_log')->where($map)->count();
        return $this->success(['list' => $list, 'total' => $total]);
    }
}

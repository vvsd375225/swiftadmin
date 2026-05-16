<?php
namespace app\admin\controller;

use think\facade\Db;

class DataScreen extends Base
{
    public function index()
    {
        $data = [
            'server'      => $this->serverInfo(),
            'stats'       => $this->stats(),
            'user_trend'  => $this->userTrend(),
            'user_level'  => $this->userLevelDist(),
            'payment_trend' => $this->paymentTrend(),
            'article_trend' => $this->articleTrend(),
            'file_stats'  => $this->fileStats(),
            'recent_logs' => $this->recentLogs(),
            'cron_status' => $this->cronStatus(),
            'workflow_status' => $this->workflowStatus(),
        ];
        return $this->success($data);
    }

    private function serverInfo()
    {
        return [
            'php_version' => PHP_VERSION,
            'os'          => PHP_OS,
            'server'      => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP Built-in',
            'time'        => date('Y-m-d H:i:s'),
            'db_size'     => $this->getDbSize(),
        ];
    }

    private function stats()
    {
        $today = date('Y-m-d');
        return [
            'user_total'       => Db::name('user')->count(),
            'user_today'       => Db::name('user')->where('create_time', '>=', strtotime($today))->count(),
            'article_total'    => Db::name('cms_article')->count(),
            'article_today'    => Db::name('cms_article')->where('create_time', '>=', strtotime($today))->count(),
            'payment_total'    => Db::name('payment')->count(),
            'payment_amount'   => Db::name('payment')->where('status', 1)->sum('amount') ?: 0,
            'attachment_total' => Db::name('attachment')->count(),
            'attachment_size'  => Db::name('attachment')->sum('size') ?: 0,
            'admin_total'      => Db::name('admin')->count(),
        ];
    }

    private function userTrend()
    {
        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = date('Y-m-d', strtotime("-{$i} days"));
            $start = strtotime($day);
            $end = $start + 86400;
            $days[] = [
                'date'  => $day,
                'count' => Db::name('user')->where('create_time', '>=', $start)->where('create_time', '<', $end)->count(),
            ];
        }
        return $days;
    }

    private function userLevelDist()
    {
        $levels = Db::name('user')->field('level, count(*) as count')->group('level')->select()->toArray();
        $map = [0 => '普通用户', 1 => 'VIP1', 2 => 'VIP2', 3 => 'VIP3'];
        foreach ($levels as &$v) {
            $v['name'] = $map[$v['level']] ?? ('LV' . $v['level']);
        }
        return $levels ?: [['name' => '普通用户', 'count' => 0]];
    }

    private function paymentTrend()
    {
        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = date('Y-m-d', strtotime("-{$i} days"));
            $start = strtotime($day);
            $end = $start + 86400;
            $days[] = [
                'date'   => $day,
                'count'  => Db::name('payment')->where('create_time', '>=', $start)->where('create_time', '<', $end)->count(),
                'amount' => Db::name('payment')->where('create_time', '>=', $start)->where('create_time', '<', $end)->where('status', 1)->sum('amount') ?: 0,
            ];
        }
        return $days;
    }

    private function articleTrend()
    {
        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = date('Y-m-d', strtotime("-{$i} days"));
            $start = strtotime($day);
            $end = $start + 86400;
            $days[] = [
                'date'  => $day,
                'count' => Db::name('cms_article')->where('create_time', '>=', $start)->where('create_time', '<', $end)->count(),
                'views' => Db::name('cms_article')->where('create_time', '>=', $start)->where('create_time', '<', $end)->sum('views') ?: 0,
            ];
        }
        return $days;
    }

    private function fileStats()
    {
        $exts = Db::name('attachment')->field('ext, count(*) as count')->group('ext')->order('count', 'desc')->select()->toArray();
        return $exts ?: [['ext' => '无数据', 'count' => 0]];
    }

    private function recentLogs()
    {
        $logs = Db::name('admin_log')->order('create_time', 'desc')->limit(10)->select()->toArray();
        foreach ($logs as &$log) {
            $log['create_time'] = date('Y-m-d H:i:s', $log['create_time'] ?? time());
        }
        return $logs;
    }

    private function cronStatus()
    {
        $jobs = Db::name('cron_job')->select()->toArray();
        $total = count($jobs);
        $running = 0;
        foreach ($jobs as $job) {
            if (!empty($job['last_run_time'])) $running++;
        }
        return ['total' => $total, 'running' => $running, 'jobs' => $jobs];
    }

    private function workflowStatus()
    {
        return [
            'total'    => Db::name('workflow_instance')->count(),
            'pending'  => Db::name('workflow_instance')->where('status', 0)->count(),
            'approved' => Db::name('workflow_instance')->where('status', 1)->count(),
            'rejected' => Db::name('workflow_instance')->where('status', 2)->count(),
        ];
    }

    private function getDbSize()
    {
        try {
            $db = config('database.connections.mysql.database');
            $result = Db::query("SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size FROM information_schema.tables WHERE table_schema = ?", [$db]);
            return ($result[0]['size'] ?? 0) . ' MB';
        } catch (\Exception $e) {
            return 'N/A';
        }
    }
}

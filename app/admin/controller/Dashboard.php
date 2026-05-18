<?php
namespace app\admin\controller;

use think\facade\Db;

class Dashboard extends Base
{
    public function index()
    {
        $userCount = Db::name('user')->count();
        $articleCount = Db::name('cms_article')->count();
        $attachmentCount = Db::name('attachment')->count();
        $adminCount = Db::name('admin')->count();
        $paymentCount = Db::name('payment')->count();
        $paymentAmount = Db::name('payment')->where('status', 1)->sum('amount') ?: 0;

        $todayStart = strtotime(date('Y-m-d'));
        $todayUserCount = Db::name('user')->where('create_time', '>', $todayStart)->count();
        $todayArticleCount = Db::name('cms_article')->where('create_time', '>', $todayStart)->count();

        $sevenDays = [];
        $articleTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $dayStart = strtotime(date('Y-m-d', strtotime("-{$i} days")));
            $dayEnd = $dayStart + 86400;
            $sevenDays[] = [
                'date'  => date('m-d', $dayStart),
                'count' => Db::name('user')->whereBetween('create_time', [$dayStart, $dayEnd])->count(),
            ];
            $articleTrend[] = [
                'date'  => date('m-d', $dayStart),
                'count' => Db::name('cms_article')->whereBetween('create_time', [$dayStart, $dayEnd])->count(),
            ];
        }

        $recentLogs = Db::name('admin_log')->alias('l')
            ->join('admin a', 'l.admin_id = a.id', 'left')
            ->field('l.title, l.create_time, a.nickname')
            ->order('l.create_time', 'desc')
            ->limit(8)
            ->select()
            ->toArray();
        foreach ($recentLogs as &$log) {
            $log['create_time'] = date('Y-m-d H:i:s', $log['create_time'] ?? time());
        }

        $categoryStats = Db::name('cms_article')->alias('a')
            ->join('cms_category c', 'a.category_id = c.id', 'left')
            ->field('c.name, count(*) as count')
            ->group('a.category_id')
            ->select()
            ->toArray();
        if (empty($categoryStats)) {
            $categoryStats = [['name' => '未分类', 'count' => $articleCount]];
        }

        return $this->success([
            'admin_count'      => $adminCount,
            'user_count'       => $userCount,
            'article_count'    => $articleCount,
            'attachment_count' => $attachmentCount,
            'payment_count'    => $paymentCount,
            'payment_amount'   => $paymentAmount,
            'today_user'       => $todayUserCount,
            'today_article'    => $todayArticleCount,
            'seven_days'       => $sevenDays,
            'article_trend'    => $articleTrend,
            'recent_logs'      => $recentLogs,
            'category_stats'   => $categoryStats,
        ]);
    }
}

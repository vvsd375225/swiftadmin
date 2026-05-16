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

        $todayStart = strtotime(date('Y-m-d'));
        $todayUserCount = Db::name('user')->where('create_time', '>', $todayStart)->count();

        $sevenDays = [];
        for ($i = 6; $i >= 0; $i--) {
            $dayStart = strtotime(date('Y-m-d', strtotime("-{$i} days")));
            $dayEnd = $dayStart + 86400;
            $sevenDays[] = [
                'date'  => date('m-d', $dayStart),
                'count' => Db::name('user')->whereBetween('create_time', [$dayStart, $dayEnd])->count(),
            ];
        }

        return $this->success([
            'admin_count'      => $adminCount,
            'user_count'       => $userCount,
            'article_count'    => $articleCount,
            'attachment_count' => $attachmentCount,
            'today_user'       => $todayUserCount,
            'seven_days'       => $sevenDays,
        ]);
    }
}

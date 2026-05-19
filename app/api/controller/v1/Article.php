<?php
namespace app\api\controller\v1;

use app\api\controller\Base;
use think\facade\Db;

class Article extends Base
{
    public function index()
    {
        $page = (int)input('page', 1);
        $limit = (int)input('limit', 10);
        $list = Db::name('cms_article')
            ->alias('a')
            ->leftJoin('cms_category c', 'a.category_id = c.id')
            ->field('a.id,a.title,a.cover,a.summary,a.tags,a.author,a.views,a.status,a.create_time,c.name as category_name')
            ->where('a.status', 1)
            ->order('a.id desc')
            ->page($page, $limit)
            ->select()
            ->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = $v['create_time'] ? date('Y-m-d H:i:s', $v['create_time']) : '';
        }
        $total = Db::name('cms_article')->where('status', 1)->count();
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function detail($id)
    {
        $a = Db::name('cms_article')->alias('a')
            ->leftJoin('cms_category c', 'a.category_id = c.id')
            ->field('a.*,c.name as category_name')
            ->where('a.id', $id)
            ->find();
        if (!$a) { return $this->error('文章不存在'); }
        $a['create_time'] = $a['create_time'] ? date('Y-m-d H:i:s', $a['create_time']) : '';
        $a['update_time'] = $a['update_time'] ? date('Y-m-d H:i:s', $a['update_time']) : '';
        Db::name('cms_article')->where('id', $id)->inc('views')->update();
        return $this->success($a);
    }
}

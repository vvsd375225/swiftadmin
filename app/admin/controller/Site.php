<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;
use think\facade\View;

class Site
{
    private function navCategories()
    {
        return Db::name('cms_category')
            ->where('status', 1)
            ->order('sort asc, id asc')
            ->select()
            ->toArray();
    }

    public function index()
    {
        $articles = Db::name('cms_article')
            ->where('status', 1)
            ->order('id desc')
            ->limit(10)
            ->select()
            ->toArray();
        foreach ($articles as &$a) {
            $a['publish_time'] = date('Y-m-d', $a['publish_time'] ?? time());
            $a['summary'] = $a['summary'] ?: mb_substr(strip_tags($a['content']), 0, 120);
        }
        View::assign('nav', $this->navCategories());
        View::assign('articles', $articles);
        View::assign('pageTitle', 'SwiftAdmin - 企业级全栈后台管理系统');
        return View::fetch('site/index');
    }

    public function category($id = 0)
    {
        $cate = Db::name('cms_category')->where('id', intval($id))->find();
        if (!$cate) return '<h2 style="text-align:center;margin-top:100px">栏目不存在</h2>';

        $page  = intval(Request::get('page', 1));
        $limit = 6;
        $query = Db::name('cms_article')->where('category_id', intval($id))->where('status', 1);
        $total = $query->count();
        $articles = $query->order('id desc')->page($page, $limit)->select()->toArray();
        foreach ($articles as &$a) {
            $a['publish_time'] = date('Y-m-d', $a['publish_time'] ?? time());
            $a['summary'] = $a['summary'] ?: mb_substr(strip_tags($a['content']), 0, 120);
        }
        View::assign('nav', $this->navCategories());
        View::assign('cate', $cate);
        View::assign('articles', $articles);
        View::assign('pageTitle', $cate['seo_title'] ?: $cate['name']);
        View::assign('total', $total);
        View::assign('page', $page);
        View::assign('hasMore', ($page * $limit) < $total);
        return View::fetch('site/category');
    }

    public function article($id = 0)
    {
        $article = Db::name('cms_article')->where('id', intval($id))->find();
        if (!$article) return '<h2 style="text-align:center;margin-top:100px">文章不存在</h2>';

        $cate = Db::name('cms_category')->where('id', $article['category_id'])->find();
        $article['publish_time'] = date('Y-m-d H:i', $article['publish_time'] ?? time());
        $article['category_name'] = $cate['name'] ?? '';

        View::assign('nav', $this->navCategories());
        View::assign('article', $article);
        View::assign('pageTitle', $article['seo_title'] ?: $article['title']);
        return View::fetch('site/article');
    }
}

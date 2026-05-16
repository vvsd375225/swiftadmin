<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class CmsArticle extends Base
{
    protected $table = 'cms_article';

    public function index()
    {
        $page  = intval(Request::get('page', 1));
        $limit = intval(Request::get('limit', 15));
        $keyword = Request::get('keyword', '');
        $categoryId = intval(Request::get('category_id', 0));

        $query = Db::name($this->table);
        if ($keyword) {
            $query->where('title|tags', 'like', "%{$keyword}%");
        }
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }
        $total = $query->count();
        $list = $query->order('id desc')->page($page, $limit)->select()->toArray();
        $catIds = array_unique(array_column($list, 'category_id'));
        $cats = [];
        if ($catIds) {
            $cats = Db::name('cms_category')->whereIn('id', $catIds)->column('name', 'id');
        }
        foreach ($list as &$v) {
            $v['category_name'] = $cats[$v['category_id']] ?? '未分类';
            $v['publish_time'] = date('Y-m-d H:i:s', $v['publish_time'] ?? time());
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $v['update_time'] = date('Y-m-d H:i:s', $v['update_time'] ?? time());
        }
        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    public function save()
    {
        $data = Request::only(['category_id', 'title', 'content', 'cover', 'summary', 'tags', 'author', 'seo_title', 'seo_keywords', 'seo_description', 'views', 'status']);
        if (empty($data['title'])) return $this->error('请填写文章标题');
        $data['publish_time'] = time();
        $data['create_time'] = time();
        $data['update_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '文章创建成功');
    }

    public function update()
    {
        $id = intval(Request::param('id'));
        if (!$id) return $this->error('缺少ID');
        $data = Request::only(['category_id', 'title', 'content', 'cover', 'summary', 'tags', 'author', 'seo_title', 'seo_keywords', 'seo_description', 'views', 'status']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '文章更新成功');
    }

    public function delete($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        Db::name($this->table)->delete($id);
        return $this->success([], '文章已删除');
    }

    public function detail($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        $article = Db::name($this->table)->find($id);
        if (!$article) return $this->error('文章不存在');
        return $this->success($article);
    }
}

<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class CmsCategory extends Base
{
    protected $table = 'cms_category';

    public function index()
    {
        $list = Db::name($this->table)->order('parent_id asc, sort asc, id asc')->select()->toArray();
        foreach ($list as &$v) {
            $v['create_time'] = date('Y-m-d H:i:s', $v['create_time'] ?? time());
            $v['update_time'] = date('Y-m-d H:i:s', $v['update_time'] ?? time());
        }
        return $this->success(['list' => $list]);
    }

    public function tree()
    {
        $list = Db::name($this->table)->where('status', 1)->order('parent_id asc, sort asc, id asc')->select()->toArray();
        return $this->success($this->buildTree($list));
    }

    private function buildTree(array $list, int $parentId = 0): array
    {
        $tree = [];
        foreach ($list as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($list, $item['id']);
                if ($children) $item['children'] = $children;
                $tree[] = $item;
            }
        }
        return $tree;
    }

    public function save()
    {
        $data = Request::only(['parent_id', 'name', 'sort', 'description', 'status']);
        if (empty($data['name'])) return $this->error('请填写栏目名称');
        $data['create_time'] = time();
        $data['update_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '栏目创建成功');
    }

    public function update()
    {
        $id = intval(Request::param('id'));
        if (!$id) return $this->error('缺少ID');
        $data = Request::only(['parent_id', 'name', 'sort', 'description', 'status']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '栏目更新成功');
    }

    public function delete($id)
    {
        $id = intval($id);
        if (!$id) return $this->error('缺少ID');
        $children = Db::name($this->table)->where('parent_id', $id)->count();
        if ($children) return $this->error('请先删除子栏目');
        $articles = Db::name('cms_article')->where('category_id', $id)->count();
        if ($articles) return $this->error('该栏目下有文章，无法删除');
        Db::name($this->table)->delete($id);
        return $this->success([], '栏目已删除');
    }
}

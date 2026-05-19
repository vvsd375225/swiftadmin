<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Menu extends Base
{
    public function index()
    {
        $list = Db::name('menu')
            ->order('sort', 'asc')
            ->select()
            ->toArray();
        $tree = $this->buildTree($list);
        return $this->success(['list' => $tree]);
    }

    public function save()
    {
        $data = Request::only(['parent_id', 'name', 'title', 'icon', 'path', 'component', 'type', 'permission', 'sort']);
        $data['create_time'] = time();
        Db::name('menu')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['parent_id', 'name', 'title', 'icon', 'path', 'component', 'type', 'permission', 'sort']);
        $data['update_time'] = time();
        Db::name('menu')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        $children = Db::name('menu')->where('parent_id', $id)->find();
        if ($children) {
            return $this->error('请先删除子菜单');
        }
        Db::name('menu')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }

    private function buildTree($items, $parentId = 0)
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($items, $item['id']);
                if (!empty($children)) {
                    $item['children'] = $children;
                }
                $tree[] = $item;
            }
        }
        return $tree;
    }
}

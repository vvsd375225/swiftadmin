<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Module extends Base
{
    private $modulesPath;
    private $registryFile;

    public function __construct(\think\App $app)
    {
        parent::__construct($app);
        $this->modulesPath = app()->getRootPath() . 'modules' . DIRECTORY_SEPARATOR;
        $this->registryFile = app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'modules.json';
    }

    /**
     * 列出所有模块
     */
    public function index()
    {
        $installed = $this->getRegistry();
        $modules = [];

        if (is_dir($this->modulesPath)) {
            $dirs = scandir($this->modulesPath);
            foreach ($dirs as $dir) {
                if ($dir === '.' || $dir === '..') continue;
                $manifestPath = $this->modulesPath . $dir . DIRECTORY_SEPARATOR . 'manifest.json';
                if (!file_exists($manifestPath)) continue;

                $manifest = json_decode(file_get_contents($manifestPath), true);
                if (!$manifest) continue;

                $status = isset($installed[$dir]) ? $installed[$dir]['status'] : 0;
                $modules[] = [
                    'name'        => $dir,
                    'title'       => $manifest['title'] ?? $dir,
                    'version'     => $manifest['version'] ?? '1.0.0',
                    'description' => $manifest['description'] ?? '',
                    'author'      => $manifest['author'] ?? '',
                    'depends'     => $manifest['depends'] ?? [],
                    'status'      => $status,
                    'installed'   => isset($installed[$dir]),
                ];
            }
        }

        return $this->success(['list' => $modules]);
    }

    /**
     * 安装模块
     */
    public function install()
    {
        $name = Request::post('name', '');
        if (!$name) return $this->error('请指定模块名');

        $manifestPath = $this->modulesPath . $name . DIRECTORY_SEPARATOR . 'manifest.json';
        if (!file_exists($manifestPath)) {
            return $this->error('模块不存在: ' . $name);
        }

        $registry = $this->getRegistry();
        if (isset($registry[$name])) {
            return $this->error('模块已安装');
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        if (!empty($manifest['depends'])) {
            foreach ($manifest['depends'] as $dep) {
                if (!isset($registry[$dep])) {
                    return $this->error("缺少依赖模块: {$dep}");
                }
            }
        }

        $sqlPath = $this->modulesPath . $name . DIRECTORY_SEPARATOR . 'install.sql';
        if (file_exists($sqlPath)) {
            try {
                $sql = file_get_contents($sqlPath);
                Db::execute($sql);
            } catch (\Exception $e) {
                return $this->error('安装SQL执行失败: ' . $e->getMessage());
            }
        }

        $registry[$name] = [
            'version'      => $manifest['version'] ?? '1.0.0',
            'status'       => 1,
            'install_time' => time(),
        ];
        $this->saveRegistry($registry);

        return $this->success([], '模块安装成功');
    }

    /**
     * 卸载模块
     */
    public function uninstall()
    {
        $name = Request::post('name', '');
        if (!$name) return $this->error('请指定模块名');

        $registry = $this->getRegistry();
        if (!isset($registry[$name])) {
            return $this->error('模块未安装');
        }

        $sqlPath = $this->modulesPath . $name . DIRECTORY_SEPARATOR . 'uninstall.sql';
        if (file_exists($sqlPath)) {
            try {
                Db::execute(file_get_contents($sqlPath));
            } catch (\Exception $e) {}
        }

        unset($registry[$name]);
        $this->saveRegistry($registry);

        return $this->success([], '模块已卸载');
    }

    /**
     * 启用模块
     */
    public function enable()
    {
        $name = Request::post('name', '');
        if (!$name) return $this->error('请指定模块名');

        $registry = $this->getRegistry();
        if (!isset($registry[$name])) {
            return $this->error('模块未安装');
        }
        $registry[$name]['status'] = 1;
        $this->saveRegistry($registry);

        return $this->success([], '模块已启用');
    }

    /**
     * 禁用模块
     */
    public function disable()
    {
        $name = Request::post('name', '');
        if (!$name) return $this->error('请指定模块名');

        $registry = $this->getRegistry();
        if (!isset($registry[$name])) {
            return $this->error('模块未安装');
        }
        $registry[$name]['status'] = 0;
        $this->saveRegistry($registry);

        return $this->success([], '模块已禁用');
    }

    /**
     * 扫描 aisc 目录中待安装的模块
     */
    public function scanAisc()
    {
        $aiscPath = app()->getRootPath() . 'aisc' . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR;
        if (!is_dir($aiscPath)) {
            return $this->success(['list' => []]);
        }

        $registry = $this->getRegistry();
        $modules = [];
        $dirs = scandir($aiscPath);
        foreach ($dirs as $dir) {
            if ($dir === '.' || $dir === '..') continue;
            $manifestPath = $aiscPath . $dir . DIRECTORY_SEPARATOR . 'manifest.json';
            if (!file_exists($manifestPath)) continue;

            $manifest = json_decode(file_get_contents($manifestPath), true);
            if (!$manifest) continue;

            $alreadyInstalled = isset($registry[$dir]);
            $modules[] = [
                'name'        => $dir,
                'title'       => $manifest['title'] ?? $dir,
                'version'     => $manifest['version'] ?? '1.0.0',
                'description' => $manifest['description'] ?? '',
                'author'      => $manifest['author'] ?? '',
                'installed'   => $alreadyInstalled,
            ];
        }

        return $this->success(['list' => $modules]);
    }

    /**
     * 一键安装：从 aisc 复制模块到 modules 目录并安装
     */
    public function installFromAisc()
    {
        $name = Request::post('name', '');
        if (!$name) return $this->error('请指定模块名');

        if (strpos($name, '..') !== false || strpos($name, '/') !== false || strpos($name, '\\') !== false) {
            return $this->error('非法模块名');
        }

        $aiscModulePath = app()->getRootPath() . 'aisc' . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR . $name;
        if (!is_dir($aiscModulePath)) {
            return $this->error('aisc 中未找到该模块: ' . $name);
        }

        $manifestPath = $aiscModulePath . DIRECTORY_SEPARATOR . 'manifest.json';
        if (!file_exists($manifestPath)) {
            return $this->error('模块缺少 manifest.json');
        }

        $registry = $this->getRegistry();
        if (isset($registry[$name])) {
            return $this->error('模块已安装，请先卸载');
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        if (!empty($manifest['depends'])) {
            foreach ($manifest['depends'] as $dep) {
                if (!isset($registry[$dep])) {
                    return $this->error("缺少依赖模块: {$dep}");
                }
            }
        }

        $targetPath = $this->modulesPath . $name;
        $this->copyDir($aiscModulePath, $targetPath);

        $sqlPath = $targetPath . DIRECTORY_SEPARATOR . 'install.sql';
        if (file_exists($sqlPath)) {
            try {
                Db::execute(file_get_contents($sqlPath));
            } catch (\Exception $e) {
                $this->removeDir($targetPath);
                return $this->error('安装SQL执行失败: ' . $e->getMessage());
            }
        }

        $registry[$name] = [
            'version'      => $manifest['version'] ?? '1.0.0',
            'status'       => 1,
            'install_time' => time(),
        ];
        $this->saveRegistry($registry);

        return $this->success(['name' => $name, 'title' => $manifest['title'] ?? $name], '一键安装成功');
    }

    private function copyDir($src, $dst)
    {
        if (!is_dir($dst)) mkdir($dst, 0755, true);
        $dir = opendir($src);
        while (($file = readdir($dir)) !== false) {
            if ($file === '.' || $file === '..') continue;
            $srcFile = $src . DIRECTORY_SEPARATOR . $file;
            $dstFile = $dst . DIRECTORY_SEPARATOR . $file;
            if (is_dir($srcFile)) {
                $this->copyDir($srcFile, $dstFile);
            } else {
                copy($srcFile, $dstFile);
            }
        }
        closedir($dir);
    }

    private function removeDir($dir)
    {
        if (!is_dir($dir)) return;
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            $path = $dir . DIRECTORY_SEPARATOR . $file;
            if (is_dir($path)) {
                $this->removeDir($path);
            } else {
                unlink($path);
            }
        }
        rmdir($dir);
    }

    private function getRegistry()
    {
        if (!file_exists($this->registryFile)) return [];
        return json_decode(file_get_contents($this->registryFile), true) ?: [];
    }

    private function saveRegistry($data)
    {
        $dir = dirname($this->registryFile);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents($this->registryFile, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }
}

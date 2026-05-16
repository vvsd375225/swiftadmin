<?php
namespace app\admin\controller;

use think\facade\Request;

class Terminal extends Base
{
    private $allowedCommands = [
        'ls', 'dir', 'cd', 'pwd', 'cat', 'type', 'head', 'tail',
        'grep', 'find', 'wc', 'du', 'df', 'free', 'ps', 'top',
        'uptime', 'whoami', 'date', 'time', 'echo', 'php',
        'composer', 'git', 'node', 'npm', 'yarn', 'which',
        'where', 'uname', 'hostname', 'ping', 'ifconfig',
        'ipconfig', 'netstat', 'clear',
    ];

    public function execute()
    {
        $command = Request::post('command', '');
        if (!$command) {
            return $this->error('请输入命令');
        }

        $cmd = trim($command);
        $baseCmd = strtolower(explode(' ', $cmd)[0]);
        $baseCmd = basename(str_replace(['\\', '/'], DIRECTORY_SEPARATOR, $baseCmd));

        if (!in_array($baseCmd, $this->allowedCommands)) {
            return $this->error("命令不被允许: {$baseCmd}");
        }

        if (stripos($cmd, 'rm ') !== false || stripos($cmd, 'del ') !== false ||
            stripos($cmd, 'mv ') !== false || stripos($cmd, 'move ') !== false ||
            stripos($cmd, 'cp ') !== false || stripos($cmd, 'copy ') !== false ||
            stripos($cmd, 'dd ') !== false || stripos($cmd, 'mkfs') !== false ||
            stripos($cmd, 'shutdown') !== false || stripos($cmd, 'reboot') !== false ||
            stripos($cmd, 'chmod') !== false || stripos($cmd, 'chown') !== false ||
            stripos($cmd, '>') !== false) {
            return $this->error('检测到危险操作，已阻止');
        }

        $descriptors = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];

        $cwd = app()->getRootPath();
        $proc = proc_open($cmd, $descriptors, $pipes, $cwd);
        if (!is_resource($proc)) {
            return $this->error('命令执行失败');
        }

        fclose($pipes[0]);
        $stdout = stream_get_contents($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        $exitCode = proc_close($proc);

        $output = $stdout;
        if ($stderr) {
            $output .= $stderr;
        }
        $output = mb_convert_encoding($output, 'UTF-8', 'UTF-8,GBK');

        return $this->success([
            'output'  => $output,
            'exit'    => $exitCode,
            'command' => $cmd,
        ]);
    }
}

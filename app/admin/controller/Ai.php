<?php
namespace app\admin\controller;

use app\common\service\AiService;
use think\facade\Request;

class Ai extends Base
{
    /**
     * 获取 AI 状态（不暴露供应商细节）
     */
    public function config()
    {
        $activated = AiService::isActivated();
        $info = AiService::getActivationInfo();
        $isTrial = !$activated;
        $trialQuota = $isTrial ? AiService::getTrialQuotaInfo() : null;

        $quota = $activated ? AiService::getQuotaInfo() : $trialQuota;

        return $this->success([
            'activated'    => $activated,
            'is_trial'     => $isTrial,
            'tier'         => $info['tier'] ?? 'trial',
            'tier_name'    => $isTrial ? '免费体验' : ($quota['tier_name'] ?? '免费版'),
            'expiry'       => $info['expiry'] ?? null,
            'expiry_at'    => $info ? date('Y-m-d', $info['expiry']) : null,
            'domain'       => $info['domain'] ?? null,
            'brand'        => '码创软件开发工作室',
            'has_provider' => AiService::hasProvider(),
            'quota'        => $quota,
            'tiers'        => AiService::getTiers(),
            'has_master'   => AiService::getMasterKey() !== null,
        ]);
    }

    /**
     * 激活 License（自动注入供应商配置）
     */
    public function activate()
    {
        $licenseKey = Request::post('license', '');
        if (!$licenseKey) {
            return $this->error('请输入License密钥');
        }

        $result = AiService::validateLicense($licenseKey);
        if (!$result['valid']) {
            return $this->error($result['msg']);
        }

        AiService::saveActivation([
            'license'      => $licenseKey,
            'domain'       => $result['domain'],
            'expiry'       => $result['expiry'],
            'tier'         => $result['tier'],
            'tier_name'    => $result['name'],
            'activated_at' => time(),
        ]);

        // 自动注入供应商配置（用户无感）
        $autoConfigured = AiService::autoConfigProvider($result['tier']);

        return $this->success([
            'expiry'        => $result['expiry'],
            'expiry_at'     => date('Y-m-d', $result['expiry']),
            'tier'          => $result['tier'],
            'tier_name'     => $result['name'],
            'auto_configured' => $autoConfigured,
        ], $result['msg']);
    }

    /**
     * AI 对话
     */
    public function chat()
    {
        if (!AiService::canUseAi()) {
            return $this->error("[!] 体验额度已用完 — 今日免费额度已耗尽，明天0点自动重置\n   购买 License 解除限制 → 联系码创软件开发工作室");
        }

        $isTrial = !AiService::isActivated();

        if (!$isTrial && !AiService::hasProvider()) {
            return $this->error('[!] 系统未就绪 — 请联系管理员配置AI服务');
        }

        if ($isTrial && !AiService::getMasterKey()) {
            return $this->error('[!] 系统未就绪 — 请联系管理员配置AI服务');
        }

        $messages = Request::post('messages', []);
        $mode = Request::post('mode', 'chat');

        if (empty($messages)) {
            return $this->error('请输入消息');
        }

        $result = AiService::chat($messages, $mode);

        if (isset($result['error'])) {
            return $this->error($result['error']);
        }

        return $this->success([
            'reply' => $result['reply'],
            'quota' => $result['quota'] ?? null,
        ]);
    }

    /**
     * 配置主密钥（仅管理员，加密存储，对用户不可见）
     */
    public function setupProvider()
    {
        $apiUrl = Request::post('api_url', '');
        $apiKey = Request::post('api_key', '');

        if (!$apiUrl || !$apiKey) {
            return $this->error('接口地址和API密钥不能为空');
        }

        AiService::saveMasterKey($apiUrl, $apiKey);

        // 如果已激活，自动更新供应商配置
        if (AiService::isActivated()) {
            $info = AiService::getActivationInfo();
            AiService::autoConfigProvider($info['tier'] ?? 'basic');
        }

        return $this->success([], '主密钥已加密保存，用户将自动调用');
    }

    /**
     * 保存AI生成的代码到 aisc 目录
     */
    public function savefile()
    {
        $path = Request::post('path', '');
        $content = Request::post('content', '');

        if (!$path || !$content) {
            return $this->error('path和content不能为空');
        }

        // 安全检查：禁止路径穿越
        if (strpos($path, '..') !== false || strpos($path, '~') !== false) {
            return $this->error('非法路径');
        }

        $fullPath = AiService::saveGeneratedFile($path, $content);
        return $this->success(['path' => $path, 'full_path' => $fullPath], '文件已保存');
    }

    /**
     * 获取 aisc 目录文件列表
     */
    public function listfiles()
    {
        $files = AiService::listGeneratedFiles();
        return $this->success(['files' => $files, 'count' => count($files)]);
    }

    /**
     * 生成 License（开发者工具）
     */
    public function genLicense()
    {
        $domain = Request::post('domain', $_SERVER['HTTP_HOST'] ?? 'localhost');
        $days = Request::post('days', '365');
        $tier = Request::post('tier', 'basic');
        $key = AiService::generateLicense($domain, intval($days), $tier);
        return $this->success(['license' => $key, 'domain' => $domain, 'expiry_days' => intval($days), 'tier' => $tier]);
    }
}

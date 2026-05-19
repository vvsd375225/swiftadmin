<?php
namespace app\common\service;

class AiService
{
    private static $cipher = 'AES-256-CBC';
    private static $secret = ''; // 从 config('app.ai_secret') 读取，请在 .env 中配置 AI_SECRET

    // 会员等级定义 ['tier' => ['name', tokens/月]]
    private static $tiers = [
        'free'       => ['name' => '免费版', 'limit' => 100000],
        'basic'      => ['name' => '基础版', 'limit' => 1000000],
        'pro'        => ['name' => '专业版', 'limit' => 5000000],
        'enterprise' => ['name' => '企业版', 'limit' => 50000000],
    ];

    // 等级对应的供应商配置（购买即自动注入，用户不可见）
    private static $tierProviders = [
        'free'       => ['api_url' => '', 'api_key' => '', 'model' => 'mcsw-lite', 'max_tokens' => 2000],
        'basic'      => ['api_url' => '', 'api_key' => '', 'model' => 'mcsw-plus', 'max_tokens' => 4096],
        'pro'        => ['api_url' => '', 'api_key' => '', 'model' => 'mcsw-pro', 'max_tokens' => 8192],
        'enterprise' => ['api_url' => '', 'api_key' => '', 'model' => 'mcsw-max', 'max_tokens' => 16384],
    ];

    // ─── 加解密 ─────────────────────────────────

    public static function encrypt($plaintext)
    {
        $key = hash('sha256', self::$secret, true);
        $iv = openssl_random_pseudo_bytes(16);
        $encrypted = openssl_encrypt($plaintext, self::$cipher, $key, OPENSSL_RAW_DATA, $iv);
        return base64_encode($iv . $encrypted);
    }

    public static function decrypt($ciphertext)
    {
        $key = hash('sha256', self::$secret, true);
        $data = base64_decode($ciphertext);
        $iv = substr($data, 0, 16);
        $encrypted = substr($data, 16);
        return openssl_decrypt($encrypted, self::$cipher, $key, OPENSSL_RAW_DATA, $iv);
    }

    // ─── 供应商配置（加密文件存储）─────────────────

    public static function getProviderConfig()
    {
        $configFile = app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_provider.dat';
        if (!file_exists($configFile)) return null;
        $encrypted = file_get_contents($configFile);
        $json = self::decrypt($encrypted);
        return json_decode($json, true);
    }

    public static function saveProviderConfig($config)
    {
        $dir = app()->getRootPath() . 'runtime';
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $json = json_encode($config, JSON_UNESCAPED_UNICODE);
        file_put_contents($dir . DIRECTORY_SEPARATOR . 'ai_provider.dat', self::encrypt($json));
    }

    public static function hasProvider()
    {
        return self::getProviderConfig() !== null;
    }

    // ─── 主密钥（管理员配置一次，用户不可见）──────

    public static function getMasterKey()
    {
        $file = app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_master.dat';
        if (!file_exists($file)) return null;
        return self::decrypt(file_get_contents($file));
    }

    public static function saveMasterKey($apiUrl, $apiKey)
    {
        $dir = app()->getRootPath() . 'runtime';
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $data = json_encode(['api_url' => $apiUrl, 'api_key' => $apiKey], JSON_UNESCAPED_UNICODE);
        file_put_contents($dir . DIRECTORY_SEPARATOR . 'ai_master.dat', self::encrypt($data));
    }

    /**
     * 根据用户等级自动注入供应商配置
     */
    public static function autoConfigProvider($tier)
    {
        $master = self::getMasterKey();
        if (!$master) return false;
        $masterData = json_decode($master, true);
        if (!$masterData || empty($masterData['api_key'])) return false;

        $tierProvider = self::$tierProviders[$tier] ?? self::$tierProviders['basic'];
        self::saveProviderConfig([
            'api_url'    => $masterData['api_url'] ?: $tierProvider['api_url'],
            'api_key'    => $masterData['api_key'],
            'model'      => $tierProvider['model'],
            'max_tokens' => $tierProvider['max_tokens'],
        ]);
        return true;
    }

    // ─── License 生成与校验 ─────────────────────

    /**
     * 生成 License Key（token + hash，数据存文件）
     * @param string $domain      授权域名，* 泛匹配
     * @param int    $expiryDays  有效天数
     * @param string $tier        会员等级 free|basic|pro|enterprise
     */
    public static function generateLicense($domain, $expiryDays = 365, $tier = 'basic')
    {
        if (!isset(self::$tiers[$tier])) $tier = 'basic';
        $token = strtoupper(bin2hex(random_bytes(8)));
        $hash = substr(hash('sha256', $token . 'MCSW_SALT_KEY'), 0, 8);
        $key = 'MCSW-' . implode('-', str_split($token, 4)) . '-' . strtoupper($hash);

        self::saveLicenseStore($key, [
            'domain' => $domain,
            'expiry' => time() + ($expiryDays * 86400),
            'tier'   => $tier,
        ]);

        return $key;
    }

    private static function licenseStoreFile()
    {
        return app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_licenses.json';
    }

    private static function saveLicenseStore($key, $data)
    {
        $file = self::licenseStoreFile();
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        $store = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($store)) $store = [];
        $store[$key] = $data;
        file_put_contents($file, json_encode($store, JSON_UNESCAPED_UNICODE));
    }

    private static function getLicenseStore($key)
    {
        $file = self::licenseStoreFile();
        if (!file_exists($file)) return null;
        $store = json_decode(file_get_contents($file), true);
        if (!is_array($store)) return null;
        return $store[$key] ?? null;
    }

    /**
     * 校验 License，返回 [valid, tier, domain, expiry, limit, name]
     */
    public static function validateLicense($licenseKey)
    {
        $key = strtoupper(trim($licenseKey));
        if (!preg_match('/^MCSW-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-([A-F0-9]{8})$/', $key, $m)) {
            return ['valid' => false, 'msg' => 'License格式无效'];
        }

        $token = str_replace('-', '', substr($key, 5, 19));
        $providedHash = $m[1];
        $expectedHash = strtoupper(substr(hash('sha256', $token . 'MCSW_SALT_KEY'), 0, 8));
        if ($expectedHash !== $providedHash) {
            return ['valid' => false, 'msg' => '非官方授权，校验未通过'];
        }

        $data = self::getLicenseStore($key);
        if (!$data) {
            return ['valid' => false, 'msg' => 'License未注册'];
        }

        $domain = $data['domain'];
        $expiry = intval($data['expiry']);
        $tier   = $data['tier'] ?? 'basic';
        $currentDomain = $_SERVER['HTTP_HOST'] ?? 'localhost';

        if ($domain !== '*' && $domain !== 'localhost' && !self::domainMatch($domain, $currentDomain)) {
            return ['valid' => false, 'msg' => 'License域名不匹配: ' . $currentDomain];
        }

        if (time() > $expiry) {
            return ['valid' => false, 'msg' => 'License已过期 (' . date('Y-m-d', $expiry) . ')，请续费'];
        }

        if (!isset(self::$tiers[$tier])) $tier = 'basic';
        $tierInfo = self::$tiers[$tier];

        return [
            'valid'  => true,
            'tier'   => $tier,
            'name'   => $tierInfo['name'],
            'limit'  => $tierInfo['limit'],
            'domain' => $domain,
            'expiry' => $expiry,
            'msg'    => "激活成功 [{$tierInfo['name']}]，有效期至 " . date('Y-m-d', $expiry),
        ];
    }

    private static function domainMatch($licensed, $current)
    {
        $current = str_replace(['http://', 'https://'], '', $current);
        $current = rtrim($current, '/');
        if ($licensed === $current) return true;
        if (strpos($licensed, '*') !== false) {
            $pattern = '/^' . str_replace('\*', '[^.]+', preg_quote($licensed, '/')) . '$/i';
            return preg_match($pattern, $current) === 1;
        }
        return strpos($current, $licensed) !== false;
    }

    // ─── 激活状态 ───────────────────────────────

    public static function isActivated()
    {
        $info = self::getActivationInfo();
        if (!$info || !isset($info['expiry'])) return false;
        if (time() > intval($info['expiry'])) return false;
        return true;
    }

    public static function getActivationInfo()
    {
        $file = app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_license.dat';
        if (!file_exists($file)) return null;
        return json_decode(file_get_contents($file), true);
    }

    public static function saveActivation($info)
    {
        $file = app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_license.dat';
        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents($file, json_encode($info, JSON_UNESCAPED_UNICODE));
    }

    // ─── 用量追踪 ───────────────────────────────

    private static function usageFile()
    {
        return app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_usage.json';
    }

    /**
     * 获取当月用量
     */
    public static function getUsageData()
    {
        $month = date('Y-m');
        $file = self::usageFile();
        $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($data)) $data = [];
        return $data[$month] ?? ['input_tokens' => 0, 'output_tokens' => 0, 'total_tokens' => 0];
    }

    /**
     * 累加用量
     */
    public static function trackUsage($inputTokens, $outputTokens)
    {
        $month = date('Y-m');
        $file = self::usageFile();
        $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($data)) $data = [];
        if (!isset($data[$month])) {
            $data[$month] = ['input_tokens' => 0, 'output_tokens' => 0, 'total_tokens' => 0];
        }
        $data[$month]['input_tokens']  += $inputTokens;
        $data[$month]['output_tokens'] += $outputTokens;
        $data[$month]['total_tokens']  += ($inputTokens + $outputTokens);

        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    /**
     * 获取配额信息 [limit, used, remaining, pct]
     */
    public static function getQuotaInfo()
    {
        $info = self::getActivationInfo();
        $tier = $info['tier'] ?? 'free';
        $limit = self::$tiers[$tier]['limit'] ?? 100000;
        $usage = self::getUsageData();
        $used = $usage['total_tokens'] ?? 0;
        $remaining = max(0, $limit - $used);
        $pct = $limit > 0 ? round($used / $limit * 100, 1) : 0;
        return [
            'tier'      => $tier,
            'tier_name' => self::$tiers[$tier]['name'] ?? '免费版',
            'limit'     => $limit,
            'used'      => $used,
            'remaining' => $remaining,
            'pct'       => $pct,
        ];
    }

    /**
     * 检查是否有剩余配额
     */
    public static function checkQuota()
    {
        $quota = self::getQuotaInfo();
        return $quota['remaining'] > 0;
    }

    // ─── 免费体验（每日10 token，无需License）─────

    const TRIAL_LIMIT = 10; // 每天10 token

    private static function trialFile()
    {
        return app()->getRootPath() . 'runtime' . DIRECTORY_SEPARATOR . 'ai_trial.json';
    }

    /**
     * 获取今日体验用量
     */
    public static function getTrialUsage()
    {
        $today = date('Y-m-d');
        $file = self::trialFile();
        $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($data)) $data = [];
        return $data[$today] ?? ['total_tokens' => 0];
    }

    /**
     * 累加体验用量
     */
    public static function trackTrialUsage($totalTokens)
    {
        $today = date('Y-m-d');
        $file = self::trialFile();
        $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($data)) $data = [];
        if (!isset($data[$today])) {
            $data[$today] = ['total_tokens' => 0];
        }
        $data[$today]['total_tokens'] += $totalTokens;

        $dir = dirname($file);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    /**
     * 获取体验配额信息
     */
    public static function getTrialQuotaInfo()
    {
        $usage = self::getTrialUsage();
        $used = $usage['total_tokens'] ?? 0;
        $remaining = max(0, self::TRIAL_LIMIT - $used);
        $pct = self::TRIAL_LIMIT > 0 ? round($used / self::TRIAL_LIMIT * 100, 1) : 0;
        return [
            'trial'     => true,
            'limit'     => self::TRIAL_LIMIT,
            'used'      => $used,
            'remaining' => $remaining,
            'pct'       => $pct,
        ];
    }

    /**
     * 体验额度是否还有剩余
     */
    public static function checkTrialQuota()
    {
        $usage = self::getTrialUsage();
        return ($usage['total_tokens'] ?? 0) < self::TRIAL_LIMIT;
    }

    /**
     * 能否使用AI（正式激活 或 体验额度未用完）
     */
    public static function canUseAi()
    {
        if (self::isActivated()) return true;
        return self::checkTrialQuota();
    }

    // ─── AI 对话 ───────────────────────────────

    public static function chat($messages, $mode)
    {
        $isTrial = !self::isActivated();

        // 试用模式：使用主密钥 + 每日10 token限制
        if ($isTrial) {
            if (!self::checkTrialQuota()) {
                return ['error' => "▌体验额度已用完 ▌ 今日免费额度 " . self::TRIAL_LIMIT . " token 已耗尽，明天0点自动重置。\n\n购买 License 即可解除限制 → 联系码创软件开发工作室。"];
            }
            $master = self::getMasterKey();
            if (!$master) {
                return ['error' => '系统未就绪，请联系管理员配置AI服务'];
            }
            $masterData = json_decode($master, true);
            $provider = [
                'api_url'    => $masterData['api_url'],
                'api_key'    => $masterData['api_key'],
                'model'      => 'mcsw-lite',
                'max_tokens' => 1000,
            ];
        } else {
            $provider = self::getProviderConfig();
            if (!$provider) {
                return ['error' => 'AI供应商未配置'];
            }
            if (!self::checkQuota()) {
                $quota = self::getQuotaInfo();
                $used = number_format($quota['used']);
                $limit = number_format($quota['limit']);
                return ['error' => "▌QUOTA EXHAUSTED ▌ 本月 Token 已耗尽 [{$quota['tier_name']}]：{$used} / {$limit}\n\n请联系码创软件开发工作室续费或升级会员等级。"];
            }
        }

        $model = $provider['model'] ?? 'mcsw-plus';
        $maxTokens = intval($provider['max_tokens'] ?? 2000);
        $systemPrompt = self::buildSystemPrompt($mode);

        $anthropicMessages = [];
        foreach ($messages as $msg) {
            $anthropicMessages[] = [
                'role'    => $msg['role'] === 'assistant' ? 'assistant' : 'user',
                'content' => $msg['content'],
            ];
        }

        $body = json_encode([
            'model'       => $model,
            'max_tokens'  => $maxTokens,
            'system'      => $systemPrompt,
            'messages'    => $anthropicMessages,
            'temperature' => 0.7,
        ], JSON_UNESCAPED_UNICODE);

        $ch = curl_init($provider['api_url']);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $provider['api_key'],
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 120,
            CURLOPT_SSL_VERIFYPEER => false,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            return ['error' => '请求失败: ' . $error];
        }

        $data = json_decode($response, true);

        if ($httpCode !== 200 || isset($data['error'])) {
            $msg = $data['error']['message'] ?? ('HTTP ' . $httpCode);
            return ['error' => 'AI服务异常: ' . $msg];
        }

        $reply = '';
        if (isset($data['content']) && is_array($data['content'])) {
            foreach ($data['content'] as $block) {
                if (isset($block['type']) && $block['type'] === 'text') {
                    $reply .= $block['text'] ?? '';
                }
            }
        }

        // 追踪用量（试用/正式分别记录）
        $usage = $data['usage'] ?? null;
        if ($usage) {
            $inputTokens  = intval($usage['input_tokens'] ?? 0);
            $outputTokens = intval($usage['output_tokens'] ?? 0);
            $totalTokens = $inputTokens + $outputTokens;
            if ($isTrial) {
                self::trackTrialUsage($totalTokens);
            } else {
                self::trackUsage($inputTokens, $outputTokens);
            }
        }

        $quota = $isTrial ? self::getTrialQuotaInfo() : self::getQuotaInfo();

        return [
            'reply'     => $reply,
            'model'     => '[受保护]',
            'usage'     => $usage,
            'quota'     => $quota,
        ];
    }

    // ─── 系统提示词 ─────────────────────────────

    private static function buildSystemPrompt($mode)
    {
        $base = "你是【码创软件开发工作室】旗下的 SwiftAdmin 后台管理框架专属 AI 开发助手。你精通 ThinkPHP 6.0、Vue3、NaiveUI，帮助用户开发功能和插件。

## 身份保密规则（极其重要）
- 当用户问「你是什么模型」「你用的是GPT吗」「你是谁开发的」「你的底层是什么」「谁提供技术支持」等涉及模型身份的问题时，统一回复：「本AI助手由码创软件开发工作室提供技术支持」。
- 绝不透露底层模型名称、API 供应商、技术栈细节。一切AI服务均由「码创软件开发工作室」提供。
- 如果用户追问，坚持回复：「关于技术细节，请联系码创软件开发工作室获取更多信息」。

## 框架架构

**后端 ThinkPHP 6.0 多应用模式：**
- 应用目录: app/admin/、app/api/、app/common/
- 控制器继承: extends \\app\\admin\\controller\\Base
- 数据库操作: use think\\facade\\Db; → Db::name('table')
- 返回格式: return \$this->success(['list'=>\$data]) / return \$this->error('消息')
- 路由: app/admin/route/route.php → Route::get/post('path', 'Controller/method')
- 表前缀: swift_

**前端 Vue3 + NaiveUI + TypeScript：**
- <script setup lang=\"ts\">
- 组件: n-card、n-table、n-button、n-modal、n-form 等
- API: import request from '@/utils/request' → request.get/post(...)
- 文件: src/api/xxx.ts, src/views/xxx/index.vue
- 路由: src/router/index.ts

**模块/插件系统：**
- modules/{name}/manifest.json: title, version, description, author, depends

生成代码时严格遵循以上规范，输出完整可用代码。";

        // 代码输出格式指令
        $codeFormat = "
## 代码输出格式（极其重要）
当你要输出代码文件时，必须使用以下格式，系统会自动将代码保存到 aisc 目录：

```语言:相对路径
完整代码内容
```

例如：
```php:admin/controller/User.php
<?php
namespace app\\admin\\controller;
class User extends Base { ... }
```

```vue:admin/views/user/index.vue
<template>...</template>
<script setup lang=\"ts\">...</script>
```

- 冒号后面是文件在 aisc/ 下的相对路径
- 路径就是: admin/controller/XXX.php、admin/view/XXX/index.vue、api/controller/XXX.php、modules/模块名/...
- 不要用 app/ 前缀，因为自动保存到 aisc/ 根目录
- 每个代码块只放一个完整文件
- 务必用此格式输出所有代码，系统会一键保存全部文件";

        switch ($mode) {
            case 'develop':
                return $base . "\n\n用户想要开发新功能，请按代码输出格式生成所有需要的文件，一次性完整交付。" . $codeFormat;
            case 'plugin':
                return $base . "\n\n用户想要开发模块/插件，请按代码输出格式生成插件全部文件（manifest.json、控制器、视图、路由、SQL等），一次性完整交付。" . $codeFormat;
            default:
                return $base;
        }
    }

    /**
     * 获取会员等级列表
     */
    public static function getTiers()
    {
        return self::$tiers;
    }

    // ─── AI生成代码落盘 ──────────────────────────

    /**
     * 获取 aisc 根目录
     */
    public static function getAiscRoot()
    {
        $dir = app()->getRootPath() . 'aisc';
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        return $dir;
    }

    /**
     * 保存AI生成的代码文件到 aisc 目录
     * @param string $relativePath  相对路径，如 "controller/User.php"
     * @param string $content       文件内容
     * @return string 完整磁盘路径
     */
    public static function saveGeneratedFile($relativePath, $content)
    {
        $root = self::getAiscRoot();
        $fullPath = $root . DIRECTORY_SEPARATOR . ltrim($relativePath, '\\/');
        $dir = dirname($fullPath);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents($fullPath, $content);
        return $fullPath;
    }

    /**
     * 列出 aisc 目录下所有已生成文件
     */
    public static function listGeneratedFiles()
    {
        $root = self::getAiscRoot();
        $files = [];
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($root, \RecursiveDirectoryIterator::SKIP_DOTS)
        );
        foreach ($iterator as $file) {
            $relative = str_replace($root . DIRECTORY_SEPARATOR, '', $file->getPathname());
            $files[] = [
                'path' => $relative,
                'size' => $file->getSize(),
                'time' => date('Y-m-d H:i:s', $file->getMTime()),
            ];
        }
        return $files;
    }
}

<?php
namespace app\common\service;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenService
{
    private static $key = 'swiftadmin_secret_key_2026';
    private static $expire = 86400;

    public static function create($uid, $username)
    {
        $payload = [
            'iss' => 'swiftadmin',
            'iat' => time(),
            'exp' => time() + self::$expire,
            'uid' => $uid,
            'username' => $username,
        ];
        return JWT::encode($payload, self::$key, 'HS256');
    }

    public static function verify($token)
    {
        try {
            $decoded = JWT::decode(str_replace('Bearer ', '', $token), new Key(self::$key, 'HS256'));
            return (array)$decoded;
        } catch (\Exception $e) {
            return false;
        }
    }
}

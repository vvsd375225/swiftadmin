<?php
namespace app\common\middleware;

class Cors
{
    public function handle($request, \Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers'     => 'Content-Type,Authorization,Token',
            'Access-Control-Allow-Credentials' => 'true',
        ];

        if ($request->isOptions()) {
            return response('', 204)
                ->header($headers)
                ->header(['Access-Control-Max-Age' => '86400']);
        }

        return $next($request)->header($headers);
    }
}

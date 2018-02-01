<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');
Route::get('/', function () {
    return view('welcome');
});

$api->version('v1',function($api) {
    $api->get('showlist', 'App\Http\Controllers\ApiController@showlist');
    $api->post('addlist', 'App\Http\Controllers\ApiController@addlist');
    $api->put('updatelist', 'App\Http\Controllers\ApiController@updatelist');
    $api->delete('deletelist', 'App\Http\Controllers\ApiController@deletelist');
});
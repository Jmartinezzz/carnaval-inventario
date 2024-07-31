<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.')->middleware(['web', 'auth'])->group(function () {
    Route::resource('/productos', ProductController::class)->except(['create', 'edit']);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\TicketController; // Panggil controller yang baru dibuat

// URL untuk mengambil daftar tiket (GET http://localhost:8000/api/tickets)
Route::get('/tickets', [TicketController::class, 'index']);

// URL untuk mengirim/membuat tiket baru (POST http://localhost:8000/api/tickets)
Route::post('/tickets', [TicketController::class, 'store']);
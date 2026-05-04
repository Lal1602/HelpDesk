# Integrasi Laravel + MySQL (db_helpdesk)

Dokumen ini dipakai untuk mengganti login dummy frontend menjadi login real ke Laravel dengan database MySQL/phpMyAdmin.

## 1) Konfigurasi Laravel (.env)

```env
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_helpdesk
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=127.0.0.1
```

## 2) Pastikan tabel users punya role

Buat migration (jika belum):

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('role')->default('user');
});
```

Lalu jalankan:

```bash
php artisan migrate
```

## 3) Seed akun real (admin/user)

Import file SQL ini di phpMyAdmin pada database `db_helpdesk`:

- `docs/db_helpdesk_seed.sql`

Akun awal:

- admin@gmail.com / admin123 (role: admin)
- user@gmail.com / user123 (role: user)

## 4) Endpoint Login Laravel

`routes/api.php`

```php
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
```

`app/Http/Controllers/Api/AuthController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email atau password salah.'
            ], 422);
        }

        $request->session()->regenerate();

        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil.'
        ]);
    }
}
```

`app/Models/User.php` (pastikan role di-fillable/visible)

```php
protected $fillable = [
    'name',
    'email',
    'password',
    'role',
];

protected $hidden = [
    'password',
    'remember_token',
];
```

## 5) CORS Laravel (frontend Vite)

`config/cors.php`

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## 6) Konfigurasi Frontend (Vite)

Di project frontend ini, buat `.env` dari `.env.example`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Login page sekarang memanggil `POST {VITE_API_BASE_URL}/api/login` dengan body JSON:

```json
{
  "email": "user@gmail.com",
  "password": "user123"
}
```

Respons minimal yang diharapkan frontend:

```json
{
  "user": {
    "id": 1,
    "name": "User Helpdesk",
    "email": "user@gmail.com",
    "role": "user"
  }
}
```

## 7) Catatan minim konflik Git frontend

- Perubahan frontend dibuat hanya di satu file login + file docs/env.
- Komponen lain tidak disentuh, jadi risiko conflict branch UI lain rendah.

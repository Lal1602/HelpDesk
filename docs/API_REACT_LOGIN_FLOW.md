# Alur Login Laravel API + React Helpdesk

Dokumen ini menjelaskan step by step alur pembuatan API login di Laravel dan cara menyambungkannya ke React pada project Helpdesk ini.

## Tujuan

- Login tidak lagi memakai akun dummy.
- React mengambil session login dari Laravel API.
- Role user dari database menentukan navigasi ke admin atau dashboard.
- Semua autentikasi memakai Sanctum cookie flow agar aman dan sesuai pola session Laravel.

## Gambaran Alur

1. User mengisi email dan password di halaman login React.
2. React meminta CSRF cookie ke Laravel lewat endpoint Sanctum.
3. React mengirim request login ke API Laravel.
4. Laravel memverifikasi kredensial ke tabel users pada database helpdesk.
5. Laravel mengembalikan data user, termasuk field role.
6. React menyimpan data user di state aplikasi.
7. Jika role = admin, user diarahkan ke halaman admin.
8. Jika bukan admin, user diarahkan ke dashboard user.

## 1. Buat Project Laravel Dari Nol

Kalau Laravel belum ada, mulai dari project baru dulu.

### Opsi A: Composer

```bash
composer create-project laravel/laravel helpdesk-api
```

### Opsi B: Laravel Installer

```bash
laravel new helpdesk-api
```

Setelah project terbentuk:

1. Masuk ke folder project Laravel.
2. Jalankan server bawaan Laravel.

```bash
cd helpdesk-api
php artisan serve
```

3. Buka project di browser untuk memastikan Laravel berjalan.
4. Jika memakai Laragon, kamu juga bisa taruh project di folder web root supaya mudah diakses.

## 2. Hubungkan Laravel ke Database Helpdesk

Karena database dan tabel sudah dibuat lewat `db_helpdesk_seed.sql`, pastikan hal berikut sudah benar di Laravel:

- Nama database sudah mengarah ke `db_helpdesk`.
- Tabel `users` sudah ada dan memiliki kolom minimal:
  - `id`
  - `name`
  - `email`
  - `password`
  - `role`
- Password di database sudah di-hash dengan `bcrypt` atau mekanisme Laravel yang setara.

Setelah project Laravel jadi, atur `.env` lalu jalankan migrasi jika masih ada tabel bawaan yang belum dibuat.

```bash
php artisan migrate
```

## 3. Setup Laravel Environment

Di project Laravel, isi `.env` harus mengarah ke database yang benar.

Contoh:

```env
APP_NAME=HelpDesk
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_helpdesk
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=cookie
SESSION_DOMAIN=127.0.0.1
SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5173,localhost:5173
```

Catatan:

- Kalau React berjalan di Vite, biasanya port-nya `5173`.
- Kalau Laravel dan React beda domain/port, konfigurasi Sanctum dan CORS harus benar.

## 4. Aktifkan Sanctum

Untuk login berbasis session dan cookie, gunakan Laravel Sanctum.

Langkah umum:

1. Install Sanctum jika belum ada.
2. Jalankan migrasi Sanctum.
3. Pastikan middleware Sanctum aktif untuk API yang butuh login.
4. Pastikan frontend mengirim `credentials: include`.

Endpoint yang dipakai React saat ini:

- `GET /sanctum/csrf-cookie`
- `POST /api/login`
- `GET /api/me`
- `POST /api/logout`

## 5. Buat API Login di Laravel

Buat controller autentikasi, misalnya `AuthController`.

Endpoint yang disarankan:

- `POST /api/login`
- `GET /api/me`
- `POST /api/logout`

Contoh perilaku yang diharapkan:

### Login

- Terima `email` dan `password`.
- Validasi input.
- Cari user berdasarkan email.
- Verifikasi password.
- Jika valid, buat session login.
- Kembalikan data user.

Respons minimal yang dibutuhkan React:

```json
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "Admin Helpdesk",
    "email": "admin@helpdesk.test",
    "role": "admin"
  }
}
```

Penting:

- React pada project ini mengecek `user.role`.
- Kalau `role` tidak ada, login dianggap gagal dari sisi frontend.

### Me

Endpoint `GET /api/me` dipakai untuk cek status user yang sedang login.

Contoh respons:

```json
{
  "user": {
    "id": 1,
    "name": "Admin Helpdesk",
    "email": "admin@helpdesk.test",
    "role": "admin"
  }
}
```

### Logout

Endpoint `POST /api/logout` dipakai untuk menghapus session aktif.

## 6. Konfigurasi CORS

Kalau React dan Laravel berjalan di origin yang berbeda, CORS harus mengizinkan request dari frontend.

Periksa hal ini di Laravel:

- Origin frontend diizinkan.
- Credential diizinkan.
- Header JSON diizinkan.

Yang penting untuk flow login ini:

- request memakai `credentials: include`
- response CORS mendukung cookie session

## 7. Hubungkan React ke Laravel API

Di React, login sudah diarahkan lewat file [LoginPage.jsx](src/screens/LoginPage.jsx).

Alurnya saat ini:

1. React ambil CSRF cookie dari Laravel.
2. React kirim `POST /api/login`.
3. React baca respons JSON.
4. React cek `user.role`.
5. React panggil `onLogin(authenticatedUser)`.

Pastikan environment variable ini ada di React:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Kalau variabel ini kosong, frontend akan default ke `http://127.0.0.1:8000`.

## 8. Pastikan Struktur Login React Cocok dengan API

Pada [LoginPage.jsx](src/screens/LoginPage.jsx), frontend sudah melakukan hal berikut:

- memanggil `/sanctum/csrf-cookie`
- mengirim `X-XSRF-TOKEN`
- memakai `credentials: include`
- mengirim `email` dan `password`
- memeriksa `data.user` atau `data`
- memastikan `role` ada di user

Artinya, backend Laravel harus konsisten dengan ekspektasi ini.

Jika respons API hanya mengembalikan token tanpa user, React perlu diubah.
Jika respons API tidak menyertakan `role`, navigasi setelah login akan gagal.

## 9. Hubungkan Navigasi Setelah Login

Di [App.jsx](src/App.jsx), aplikasi sudah mengarahkan user berdasarkan role:

- `admin` -> `/admin`
- selain `admin` -> `/dashboard`

Jadi backend wajib memastikan nilai `role` benar-benar sesuai data user di database.

Contoh role yang umum:

- `admin`
- `user`
- `staff`

Kalau kamu punya role lain, sesuaikan logika routing di React.

## 10. Contoh Payload Login

Request dari React:

```json
{
  "email": "admin@helpdesk.test",
  "password": "password123"
}
```

Respons sukses yang ideal:

```json
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "Admin Helpdesk",
    "email": "admin@helpdesk.test",
    "role": "admin"
  }
}
```

Respons gagal yang ideal:

```json
{
  "message": "Email atau password salah."
}
```

## 11. Checklist Testing

Setelah API dibuat, tes dengan urutan ini:

1. Jalankan Laravel server.
2. Jalankan React Vite.
3. Buka halaman login React.
4. Isi email dan password yang ada di database.
5. Pastikan tidak ada error CSRF.
6. Pastikan login sukses dan user diarahkan sesuai role.
7. Coba logout dan pastikan session terhapus.
8. Coba buka endpoint `/api/me` saat sudah login untuk memastikan session aktif.

## 12. Urutan Implementasi yang Disarankan

Kalau kamu ingin mengerjakannya dari nol, ikuti urutan ini:

1. Buat project Laravel baru.
2. Siapkan database `db_helpdesk` dan isi seed data.
3. Hubungkan `.env` Laravel ke database dan Sanctum.
4. Aktifkan Sanctum dan sesuaikan CORS.
5. Buat endpoint `/api/login`, `/api/me`, dan `/api/logout`.
6. Pastikan response login mengembalikan `user.role`.
7. Set `VITE_API_BASE_URL` di React.
8. Uji login dari [LoginPage.jsx](src/screens/LoginPage.jsx).
9. Validasi redirect di [App.jsx](src/App.jsx).

## 13. Catatan Penting

- Frontend ini sekarang masih mengandalkan session cookie, bukan login dummy.
- Kalau backend Laravel belum mengirim `role`, routing setelah login tidak akan berjalan.
- Kalau cookie gagal tersimpan, biasanya masalahnya ada di Sanctum, CORS, atau domain session.

## 14. Ringkasan Singkat

Backend Laravel bertugas memverifikasi user dan mengembalikan data login yang valid. Frontend React bertugas mengirim kredensial, menerima respons user, lalu mengarahkan halaman berdasarkan role.

Kalau kamu ingin, langkah berikutnya adalah membuat controller Laravel dan menyesuaikan endpoint-nya agar cocok dengan [LoginPage.jsx](src/screens/LoginPage.jsx).

## Detail Implementasi Lengkap (Step-by-step)

Berikut panduan rinci untuk tiap langkah: file mana yang dibuat/diubah, perintah terminal, dan contoh kode.

### 1) Atur `.env` dan database
- File: `.env` (root project `helpdesk-api`).
- Ubah nilai berikut sesuai lingkungan lokal kamu:

```env
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_helpdesk
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=cookie
SESSION_DOMAIN=127.0.0.1
SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5173,localhost:5173
```

Jika kamu perlu mengimpor seed SQL:

```bash
mysql -u root db_helpdesk < docs/db_helpdesk_seed.sql
```

### 2) Install Laravel Sanctum
- Jalankan di folder `helpdesk-api`:

```bash
cd C:\laragon\www\helpdesk-api
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 3) Konfigurasi CORS dan session
- File: `config/cors.php` — pastikan `paths` dan origin:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://127.0.0.1:5173', 'http://localhost:5173'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

- File: `config/session.php` — pastikan:

```php
  'domain' => env('SESSION_DOMAIN', null),
  'same_site' => 'lax',
```

Setelah mengubah config/env, jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```

### 4) Pastikan middleware Sanctum aktif
- File: `app/Http/Kernel.php` — pada `$middlewareGroups['api']` tambahkan di paling atas:

```php
\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
```

Ini membuat cookie-based authentication bekerja untuk request API stateful.

### 5) Buat `AuthController`
- Lokasi file: `app/Http/Controllers/AuthController.php`.
- Isi file (copy-paste):

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
      return response()->json(['message' => 'Email atau password salah.'], 401);
    }

    auth()->login($user);

    return response()->json([
      'message' => 'Login berhasil',
      'user' => $user,
    ], 200);
  }

  public function me(Request $request)
  {
    return response()->json(['user' => $request->user()]);
  }

  public function logout(Request $request)
  {
    auth()->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Logout berhasil']);
  }
}
```

### 6) Daftarkan route API
- File: `routes/api.php` — tambahkan:

```php
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
```

### 7) Tambah user admin (jika perlu)
- Pakai Tinker:

```bash
php artisan tinker
>>> \App\Models\User::create(['name'=>'Admin','email'=>'admin@helpdesk.test','password'=>bcrypt('password123'),'role'=>'admin']);
```

atau import lewat SQL seed jika sudah tersedia.

### 8) Contoh panggilan dari React
- Pastikan variabel `.env` React berisi:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

- Contoh alur login di `src/screens/LoginPage.jsx` (fetch):

```js
// 1. minta CSRF cookie
await fetch(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });

// 2. kirim login
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password }),
});
const data = await res.json();

// 3. cek user yang login
const me = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/me`, { credentials: 'include' });
```

Semua request ke API backend harus mengirim `credentials: 'include'` supaya cookie session dikirim/diterima.

### 9) Menjalankan dan mengetes
- Start Laravel:

```bash
cd C:\laragon\www\helpdesk-api
php artisan serve
```

- Start React:

```bash
cd C:\laragon\www\HelpDesk
npm run dev
```

- Buka: `http://127.0.0.1:5173` → coba login.

### 10) Troubleshooting cepat
- Jika tidak mendapat cookie / muncul error CORS: periksa `config/cors.php`, `.env` `SANCTUM_STATEFUL_DOMAINS`, dan `SESSION_DOMAIN`.
- Jika role kosong: pastikan kolom `role` ada di tabel `users` dan controller mengembalikannya.
- Jika perlu restart config: `php artisan config:clear`.

--

Jika kamu mau, saya bisa langsung menerapkan perubahan ini di project (`helpdesk-api`) sekarang: membuat `AuthController`, menambah routes, menyesuaikan `config/cors.php`, dan menambahkan contoh `.env` di README. Mau saya kerjakan sekarang?

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Membuat Akun Super Admin
        $admin = User::create([
            'name' => 'Admin IT Support',
            'email' => 'adminsupport@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'position' => 'IT Support Manager',
        ]);

        // 2. Membuat Akun User (Karyawan)
        $user = User::create([
            'name' => 'Rohman',
            'email' => 'rohman@gmail.com',
            'password' => Hash::make('rohman123'),
            'role' => 'user',
            'position' => 'Lead Animator',
        ]);

        // 3. Membuat Beberapa Tiket Tiruan untuk Dashboard
        Ticket::create([
            'user_id' => $user->id,
            'title' => 'Node Render Farm 04 & 07 Offline',
            'category' => 'Render Farm',
            'priority' => 'Kritis',
            'project_affected' => 'Film Animasi "Ocean Blue"',
            'description' => 'Dua node render tiba-tiba mati dan tidak merespon saat di-ping dari server pusat.',
            'status' => 'In Progress' // Warna Biru/Oranye di React
        ]);

        Ticket::create([
            'user_id' => $user->id,
            'title' => 'Update Plugin Redshift 3.5 di Workstation',
            'category' => 'Software',
            'priority' => 'Sedang',
            'project_affected' => 'Internal R&D',
            'description' => 'Mohon bantuan untuk update plugin Redshift ke versi terbaru karena ada fitur baru yang ingin ditest.',
            'status' => 'Pending' // Warna Oranye di React
        ]);

        Ticket::create([
            'user_id' => $admin->id,
            'title' => 'Kalibrasi Warna Monitor Cintiq 24 Pro',
            'category' => 'Hardware',
            'priority' => 'Rendah',
            'project_affected' => 'Commercial Project A',
            'description' => 'Warna monitor sedikit melenceng dari standar sRGB studio. Mohon dijadwalkan kalibrasi ulang.',
            'status' => 'Resolved' // Warna Hijau di React
        ]);
    }
}
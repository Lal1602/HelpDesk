<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel users (siapa yang membuat tiket ini)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Kolom-kolom berdasarkan form frontend Anda
            $table->string('title'); // Judul Masalah
            $table->string('category'); // Kategori (Software, Hardware, dll)
            $table->string('priority'); // Prioritas (Low, Medium, High)
            $table->string('project_affected')->nullable(); // Proyek yang terdampak (bisa kosong)
            $table->text('description'); // Deskripsi detail
            $table->string('attachment')->nullable(); // Nama file lampiran gambar/dokumen (bisa kosong)

            // Status tiket saat pertama kali dibuat otomatis 'Pending'
            $table->enum('status', ['Pending', 'In Progress', 'Resolved'])->default('Pending');

            // Otomatis membuat kolom 'created_at' dan 'updated_at'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};

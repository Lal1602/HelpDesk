<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket; // Wajib ditambahkan agar Controller mengenali tabel Ticket

class TicketController extends Controller
{
    // 1. Fungsi untuk MENGAMBIL semua tiket (Method: GET)
    public function index()
    {
        // Mengambil semua tiket dari database, diurutkan dari yang paling baru
        $tickets = Ticket::latest()->get();

        // Mengembalikan data dalam bentuk JSON agar bisa dibaca oleh React
        return response()->json([
            'status' => 'success',
            'data' => $tickets
        ]);
    }

    // 2. Fungsi untuk MENYIMPAN tiket baru (Method: POST)
    public function store(Request $request)
    {
        // Validasi data: memastikan kolom yang wajib diisi tidak kosong
        $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'priority' => 'required|string',
            'description' => 'required|string',
        ]);

        // Menyimpan data ke dalam database
        $ticket = Ticket::create($request->all());

        // Memberikan respon sukses ke React
        return response()->json([
            'status' => 'success',
            'message' => 'Tiket berhasil dibuat!',
            'data' => $ticket
        ], 201); // 201 adalah status code HTTP untuk 'Created'
    }
}

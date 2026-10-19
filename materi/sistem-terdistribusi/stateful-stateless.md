---
title: "Stateful vs Stateless"
description: "Memahami perbedaan sistem stateful dan stateless, pengelolaan sesi, contoh API, skalabilitas, serta kaitannya dengan sistem terdistribusi."
order: 2
date: 2026-10-19
---

# Stateful vs Stateless

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kamu diharapkan mampu:

- Menjelaskan arti *state* dalam aplikasi.
- Membedakan pendekatan stateful dan stateless.
- Mengikuti alur request pada aplikasi web dan API.
- Menjelaskan kelebihan, kekurangan, serta implikasi keduanya terhadap skalabilitas dan keandalan.
- Memilih pendekatan yang sesuai berdasarkan kebutuhan sistem.

## 1. Apa Itu State?

**State** adalah informasi tentang kondisi suatu sistem pada waktu tertentu. State dapat berupa data pengguna yang sedang login, isi keranjang belanja, langkah proses checkout, atau status pekerjaan yang sedang berjalan.

Contoh sederhana: aplikasi belanja menyimpan informasi bahwa pengguna telah login dan memiliki tiga barang di keranjang. Informasi tersebut merupakan bagian dari state aplikasi.

Perlu dibedakan dua hal:

- **State aplikasi:** data atau kondisi yang perlu dipertahankan agar aplikasi dapat bekerja.
- **State sesi (session state):** informasi yang berkaitan dengan interaksi seorang pengguna selama suatu sesi.

Sistem tetap dapat menyimpan data permanen seperti akun dan pesanan tanpa harus menyimpan konteks sesi pengguna di dalam setiap instance server.

## 2. Stateful

**Stateful** adalah pendekatan ketika suatu komponen menyimpan atau bergantung pada state dari interaksi sebelumnya untuk memproses interaksi berikutnya.

### Contoh alur

Misalnya, sebuah aplikasi menyimpan sesi login di memori server:

1. Pengguna mengirim kredensial untuk login.
2. Server memverifikasi kredensial dan menyimpan sesi pengguna di memorinya.
3. Server memberikan session ID kepada browser melalui cookie.
4. Browser mengirim cookie tersebut pada request berikutnya.
5. Server mencari sesi berdasarkan session ID untuk mengetahui identitas pengguna.

Pada contoh ini, server bergantung pada informasi sesi yang tersimpan. Jika request berikutnya masuk ke instance server lain yang tidak memiliki sesi tersebut, pengguna bisa dianggap belum login—kecuali sesi dibagikan atau request diarahkan dengan mekanisme yang sesuai.

### Contoh lain

- Koneksi database yang mempertahankan konteks transaksi.
- Proses wizard yang menyimpan langkah aktif di server.
- Koneksi WebSocket yang mempertahankan konteks koneksi.
- Game multiplayer yang menyimpan posisi dan status pemain selama permainan berjalan.

### Kelebihan

- Konteks interaksi bisa dipertahankan di server.
- Cocok untuk proses yang memiliki urutan atau konteks berkelanjutan.
- Server dapat mengelola data sesi tanpa mengirim seluruh konteks pada setiap request.

### Kekurangan

- Server harus mengelola siklus hidup state, termasuk kedaluwarsa dan pembersihannya.
- Pemulihan setelah server gagal dapat lebih rumit jika state hanya tersimpan di memori lokal.
- Load balancing membutuhkan perhatian khusus karena request mungkin harus mencapai server yang memiliki sesi tersebut, atau state harus dibagikan.

## 3. Stateless

**Stateless** adalah pendekatan ketika server memproses setiap request berdasarkan informasi yang tersedia pada request itu dan konteks bersama yang diperlukan, tanpa bergantung pada konteks sesi client yang disimpan oleh server dari request sebelumnya.

Stateless **bukan** berarti sistem sama sekali tidak menyimpan data. Server masih dapat membaca dan menulis database, menyimpan log, serta mengelola data bisnis. Yang dihindari adalah ketergantungan pada konteks sesi client yang tersimpan secara lokal di instance server.

### Contoh alur API

Bayangkan API untuk mengambil profil pengguna:

1. Client mengirim `GET /api/profile` dengan kredensial akses, misalnya access token.
2. Server memvalidasi token dan menentukan identitas serta hak akses pengguna.
3. Server mengambil profil dari database.
4. Server mengirim response.
5. Request berikutnya kembali membawa informasi autentikasi yang diperlukan sehingga dapat diproses oleh instance server lain.

Server tidak harus mengingat request sebelumnya hanya untuk mengetahui siapa pemanggilnya. Namun, token tetap harus divalidasi, dan data pengguna tetap dapat disimpan di database.

### Contoh lain

- API REST yang setiap request-nya membawa kredensial dan parameter yang diperlukan.
- Fungsi komputasi yang menerima input lalu mengembalikan hasil tanpa bergantung pada pemanggilan sebelumnya.
- Instance backend di belakang load balancer yang dapat menangani request dari pengguna mana pun.

### Kelebihan

- Request lebih mudah didistribusikan ke banyak instance server.
- Instance relatif mudah diganti atau ditambah karena konteks sesi tidak terikat pada satu instance.
- Mengurangi masalah sesi yang hilang ketika instance lokal restart.

### Kekurangan

- Request perlu membawa informasi yang diperlukan untuk diproses.
- Validasi token dan akses ke penyimpanan bersama tetap membutuhkan biaya.
- Revokasi token, logout, dan alur bisnis multi-langkah tetap perlu dirancang dengan benar.
- Stateless tidak otomatis menjamin keamanan, kinerja tinggi, atau ketersediaan.

## 4. Perbandingan Stateful dan Stateless

| Aspek | Stateful | Stateless |
|---|---|---|
| Ketergantungan pada interaksi sebelumnya | Dapat bergantung pada state yang disimpan | Tidak bergantung pada konteks sesi client yang disimpan antar-request |
| Penyimpanan sesi | Bisa berada di memori server atau penyimpanan sesi bersama | Umumnya konteks yang diperlukan dikirim bersama request atau diperoleh dari sumber bersama |
| Load balancing | Bisa perlu sticky session atau shared session store | Biasanya lebih mudah mendistribusikan request antar-instance |
| Penambahan instance | Perlu mempertimbangkan pemindahan atau pembagian state | Umumnya lebih sederhana jika dependency bersama mampu menangani beban |
| Pemulihan instance | State lokal berisiko hilang saat instance gagal | Request dapat diproses ulang oleh instance lain jika dependency tersedia |
| Penggunaan umum | Koneksi persisten, sesi lokal, proses interaktif | REST API, worker yang dapat diganti, layanan horizontal-scaled |

Tidak ada pendekatan yang selalu lebih baik. Pilih berdasarkan kebutuhan state, pola interaksi, toleransi kegagalan, dan biaya operasional.

## 5. Dampak terhadap Arsitektur dan Skalabilitas

### Stateful di belakang load balancer

Jika sesi disimpan di memori lokal instance A, request pengguna yang sama mungkin harus selalu diarahkan ke instance A. Mekanisme ini dikenal sebagai **sticky session** atau **session affinity**.

Sticky session dapat membantu mempertahankan sesi lokal, tetapi membuat distribusi beban dan failover lebih rumit. Jika instance A gagal, sesi dapat hilang kecuali tersedia mekanisme pemulihan.

Alternatifnya, aplikasi dapat menyimpan sesi di penyimpanan bersama, misalnya Redis atau database. Ini mengurangi ketergantungan pada satu instance, tetapi penyimpanan bersama tersebut menjadi dependency yang juga perlu diskalakan dan diamankan.

### Stateless dengan banyak instance

Dalam desain stateless, beberapa instance backend dapat memproses request secara bergantian. Load balancer tidak perlu memilih instance tertentu hanya karena instance itu memiliki sesi pengguna.

Namun, instance tetap dapat bergantung pada database, cache, layanan autentikasi, atau message broker. Jika dependency bersama menjadi bottleneck atau gagal, layanan stateless tetap dapat terdampak.

**Intinya:** stateless memudahkan horizontal scaling, tetapi tidak menghilangkan kebutuhan untuk merancang state pada keseluruhan sistem.

## 6. Autentikasi: Cookie, Session, dan Token

Istilah stateful/stateless sering muncul saat membahas autentikasi web.

### Session berbasis server

- Server menyimpan session record.
- Browser menyimpan session ID, biasanya dalam cookie.
- Request membawa cookie dan server mencari sesi terkait.
- Server-side session merupakan contoh pendekatan stateful.

Cookie sendiri hanyalah mekanisme penyimpanan/pengiriman data pada browser. Menggunakan cookie tidak otomatis berarti stateful; yang menentukan adalah bagaimana server mengelola dan bergantung pada state tersebut.

### Token akses

- Client mengirim token pada request, biasanya melalui header `Authorization: Bearer ...`.
- Server memvalidasi token dan klaim yang relevan.
- Jika token memuat klaim yang diperlukan dan validasi tidak bergantung pada sesi lokal, request dapat diproses secara stateless.

**JWT bukan otomatis stateless.** Jika setiap request tetap memeriksa session record, denylist, atau status token di server, sebagian state tetap digunakan. Sebaliknya, token yang dapat diverifikasi secara mandiri pun tetap membutuhkan kebijakan kedaluwarsa, rotasi, dan revokasi yang sesuai.

Untuk browser, cookie autentikasi perlu dikonfigurasi dengan aman—misalnya `HttpOnly`, `Secure`, dan `SameSite` sesuai kebutuhan—serta perlindungan CSRF jika relevan. Token di browser juga harus disimpan dan dikirim dengan mempertimbangkan risiko XSS dan pencurian kredensial.

## 7. Contoh Studi Kasus: Aplikasi Bimbel

Sebuah aplikasi bimbingan belajar memiliki fitur login, melihat jadwal, mengerjakan kuis, dan melihat hasil.

### Desain A — Sesi stateful

1. Pengguna login.
2. Backend membuat sesi dan menyimpan session ID beserta identitas pengguna di session store.
3. Browser mengirim session ID pada request berikutnya.
4. Backend membaca sesi untuk memeriksa pengguna.

**Konsekuensi:** pengelolaan sesi perlu diperhatikan ketika backend memiliki beberapa instance. Session store bersama dapat membantu agar sesi tidak hanya terikat pada satu server.

### Desain B — API stateless

1. Pengguna login dan menerima access token.
2. Client menyertakan token pada request untuk melihat jadwal atau mengirim jawaban kuis.
3. Backend memvalidasi token, memeriksa izin akses, lalu mengambil data yang dibutuhkan dari database.
4. Request dapat ditangani instance backend yang berbeda.

**Konsekuensi:** backend lebih mudah ditambah secara horizontal, tetapi masa berlaku token, refresh token, logout, dan pencabutan akses harus dirancang secara eksplisit.

### Data apa yang tetap disimpan?

Pada kedua desain, data berikut tetap perlu disimpan secara persisten:

- Akun dan profil siswa.
- Jadwal kelas dan materi.
- Jawaban kuis serta hasil ujian.
- Pembayaran dan riwayat transaksi.

Perbedaan stateful/stateless bukan tentang apakah database digunakan, melainkan tentang apakah pemrosesan request bergantung pada konteks sesi yang disimpan dari interaksi sebelumnya.

## 8. Jangan Tertukar dengan Stateful dan Stateless DHCPv6

Dalam jaringan komputer, istilah serupa digunakan pada konfigurasi alamat IPv6, tetapi konteksnya berbeda dari state aplikasi web.

| Metode | Cara kerja ringkas |
|---|---|
| **SLAAC** | Host membentuk alamat IPv6 dari informasi prefix Router Advertisement dan membuat interface ID sendiri |
| **SLAAC + Stateless DHCPv6** | SLAAC menyediakan alamat; DHCPv6 dapat menyediakan informasi tambahan, seperti DNS |
| **Stateful DHCPv6** | Server DHCPv6 mengalokasikan alamat dan menyimpan informasi lease; default gateway biasanya tetap dipelajari melalui Router Advertisement |

Jadi, **stateless API** dan **stateless DHCPv6** memakai istilah yang sama, tetapi menjelaskan mekanisme yang berbeda. Jangan menyamakan definisinya begitu saja.

## 9. Kesalahan Pemahaman yang Umum

- **“Stateless berarti tidak punya database.”** Salah. Stateless service tetap dapat menggunakan database.
- **“JWT berarti sistem pasti stateless.”** Salah. Implementasi masih bisa bergantung pada sesi atau status token di server.
- **“Stateful selalu buruk untuk scaling.”** Tidak selalu. State dapat disimpan di sistem bersama atau direplikasi dengan desain yang tepat.
- **“Setiap request stateless tidak punya hubungan dengan request lain.”** Tidak selalu. Request dapat mengubah data bisnis yang sama; idempotensi, transaksi, dan konsistensi tetap penting.
- **“Stateless pasti lebih aman.”** Tidak otomatis. Keamanan bergantung pada autentikasi, otorisasi, penyimpanan kredensial, validasi input, dan desain sistem secara keseluruhan.

## 10. Ringkasan

- **State** adalah kondisi atau informasi yang relevan bagi sistem.
- **Stateful** bergantung pada state yang dipertahankan dari interaksi sebelumnya.
- **Stateless** memproses request tanpa bergantung pada konteks sesi client yang disimpan antar-request.
- Stateful cocok untuk interaksi yang membutuhkan konteks berkelanjutan, tetapi perlu strategi penyimpanan dan pemulihan state.
- Stateless memudahkan distribusi request ke banyak instance, tetapi tetap bergantung pada database dan layanan lain.
- Stateful/stateless adalah pilihan desain, bukan ukuran mutlak kualitas sistem.

## 11. Latihan Pemahaman

Coba jawab tanpa melihat bagian sebelumnya.

1. Apa perbedaan state aplikasi dan state sesi?
2. Mengapa session yang disimpan di memori lokal bisa menjadi masalah ketika backend memiliki beberapa instance?
3. Apakah API stateless boleh menyimpan data pengguna di database? Jelaskan.
4. Apakah penggunaan JWT selalu membuat API stateless? Berikan contoh.
5. Dalam aplikasi bimbel, data mana yang harus tetap disimpan walaupun API didesain stateless?
6. Apa perbedaan makna stateless pada REST API dan Stateless DHCPv6?

### Kunci jawaban singkat

1. State aplikasi mencakup kondisi/data yang diperlukan aplikasi; state sesi adalah konteks interaksi pengguna selama sesi tertentu.
2. Request yang masuk ke instance lain mungkin tidak menemukan sesi lokal, dan kegagalan instance dapat menghilangkan state tersebut.
3. Boleh. Stateless tidak berarti tanpa database; yang dihindari adalah ketergantungan pada konteks sesi client yang disimpan antar-request.
4. Tidak. Server mungkin tetap memeriksa session record atau status token di penyimpanan pada setiap request.
5. Akun, jadwal, jawaban kuis, hasil, pembayaran, dan data bisnis lain yang perlu dipertahankan.
6. REST membahas ketergantungan request pada konteks sesi client; DHCPv6 membahas apakah server mengalokasikan dan melacak alamat IPv6 atau hanya menyediakan informasi tambahan.

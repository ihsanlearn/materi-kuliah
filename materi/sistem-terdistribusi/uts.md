---
title: "Persiapan UTS Sistem Terdistribusi"
description: "Catatan terstruktur berdasarkan kisi-kisi UTS: Introduction, Architectures, Processes, dan Communication, lengkap dengan perbandingan konsep dan latihan."
order: 1
date: 2026-10-18
---

# Persiapan UTS — Sistem Terdistribusi

Catatan ini disusun berdasarkan kisi-kisi UTS. Fokus belajar: pahami definisi, jelaskan alur, berikan contoh, lalu bandingkan konsep yang mirip.

## Daftar Materi

1. [Introduction](#1-introduction)
2. [Architectures](#2-architectures)
3. [Processes](#3-processes)
4. [Communication](#4-communication)
5. [Ringkasan Perbandingan](#5-ringkasan-perbandingan)
6. [Latihan UTS](#6-latihan-uts)

---

# 1. Introduction

## 1.1 Konsep Sistem Terdistribusi

**Sistem terdistribusi (distributed system)** adalah sekumpulan komputer atau proses independen yang berkomunikasi melalui jaringan dan bekerja sama sehingga bagi pengguna tampak sebagai satu kesatuan.

### Karakteristik utama

- **Banyak node:** komponen berjalan di komputer atau proses berbeda.
- **Komunikasi jaringan:** komponen bertukar data melalui pesan.
- **Concurrency:** beberapa proses dapat berjalan atau mengalami progres pada waktu yang sama.
- **Kegagalan parsial:** satu node atau koneksi dapat gagal sementara komponen lain masih berjalan.
- **Tidak ada jam global sempurna:** urutan kejadian dan waktu antar-node perlu ditangani dengan hati-hati.
- **Berbagi sumber daya:** data, layanan, penyimpanan, atau komputasi digunakan bersama.

### Contoh

Pada e-commerce, layanan katalog produk, akun pengguna, pembayaran, dan pengiriman dapat berjalan sebagai komponen terpisah. Komponen itu berkomunikasi melalui jaringan untuk menyediakan satu pengalaman belanja.

### Sistem terpusat vs. terdistribusi

| Aspek | Terpusat | Terdistribusi |
|---|---|---|
| Pemrosesan | Berpusat pada satu sistem utama | Dibagi ke beberapa node |
| Komunikasi | Banyak proses lokal | Banyak komunikasi melalui jaringan |
| Skalabilitas | Sering dengan memperbesar mesin | Dapat dengan menambah node |
| Kegagalan | Gangguan pusat bisa berdampak luas | Kegagalan parsial mungkin terjadi |
| Kompleksitas | Relatif sederhana | Lebih kompleks dalam koordinasi dan konsistensi |

### Tantangan

1. **Latency:** pesan memerlukan waktu untuk sampai.
2. **Network failure:** koneksi putus atau pesan terlambat/hilang.
3. **Concurrency:** beberapa request mengubah data yang sama.
4. **Consistency:** replika data dapat berbeda sementara atau permanen.
5. **Security:** komunikasi, identitas layanan, dan data perlu dilindungi.

## 1.2 Distribution Transparency

**Distribution transparency** adalah kemampuan menyembunyikan detail distribusi sumber daya sehingga sistem terasa lebih sederhana untuk digunakan.

| Jenis | Makna | Contoh |
|---|---|---|
| **Access transparency** | Cara mengakses resource dibuat seragam | API serupa untuk mengambil data tanpa perlu mengurus detail akses lokal/remote |
| **Location transparency** | Lokasi resource disembunyikan | Pengguna memakai nama domain, bukan alamat mesin tertentu |
| **Migration transparency** | Perpindahan resource tidak terlihat oleh pengguna | Layanan dipindah ke server lain tanpa mengubah cara akses |
| **Relocation transparency** | Resource dapat berpindah saat sedang digunakan dengan gangguan minimal | Sesi dialihkan ketika instance berpindah |
| **Replication transparency** | Banyak replika tampak sebagai satu resource | Request diarahkan ke salah satu replika |
| **Concurrency transparency** | Akses bersamaan tetap dikelola agar hasil benar | Dua pembeli membeli stok terakhir tanpa membuat stok negatif |
| **Failure transparency** | Kegagalan disembunyikan atau dipulihkan sejauh mungkin | Request dialihkan ke replika sehat |
| **Persistence transparency** | Detail apakah data berada di memori atau penyimpanan disembunyikan | Data tetap bisa diakses setelah proses pembuatnya selesai |

Transparansi tidak selalu sempurna. Retry bisa menyamarkan gangguan, tetapi operasi yang sebenarnya sudah berhasil mungkin terulang jika responsnya hilang.

## 1.3 Scalability

**Scalability (skalabilitas)** adalah kemampuan sistem mempertahankan kinerja saat jumlah pengguna, node, data, atau cakupan sistem bertambah.

### Tiga dimensi scalability

- **Size scalability:** menangani pertambahan pengguna, node, atau volume data.
- **Geographical scalability:** tetap efektif saat komponen berjauhan secara geografis.
- **Administrative scalability:** dikelola ketika melibatkan banyak organisasi atau domain administrasi.

### Scale up vs. scale out

| Pendekatan | Penjelasan | Kelebihan | Kekurangan |
|---|---|---|---|
| **Vertical scaling / scale up** | Menambah CPU, RAM, atau kapasitas satu mesin | Relatif sederhana | Ada batas kapasitas; mesin dapat menjadi titik kegagalan |
| **Horizontal scaling / scale out** | Menambah mesin atau instance | Kapasitas bisa ditambah bertahap | Perlu load balancing, koordinasi, dan pengelolaan data |

Teknik pendukung: **caching**, **replication**, **load balancing**, **partitioning/sharding**, pemrosesan asynchronous, dan layanan stateless.

**Bottleneck** adalah komponen yang membatasi kinerja seluruh sistem. Menambah instance web tidak akan banyak membantu jika semua request tetap tertahan pada satu database yang kewalahan.

---

# 2. Architectures

## 2.1 Struktur Aplikasi

Arsitektur aplikasi menjelaskan pembagian komponen, tanggung jawab, dan interaksinya.

- **Presentation layer:** antarmuka pengguna.
- **Application/business logic:** aturan bisnis dan alur proses.
- **Data layer:** penyimpanan dan pengambilan data.
- **Communication/integration layer:** komunikasi antar-komponen atau layanan.

**Layered architecture** membagi aplikasi menjadi lapisan berdasarkan tanggung jawab. **Service-oriented architecture (SOA)** menyediakan kemampuan sebagai layanan dengan kontrak yang disepakati. **Microservices** membagi sistem menjadi layanan yang dapat dikembangkan dan di-deploy relatif independen.

Microservices bukan sinonim bagi semua sistem terdistribusi.

## 2.2 Client–Server

- **Client:** meminta layanan atau resource.
- **Server:** menerima request, memprosesnya, dan mengirim response.

Alur umum:

1. Client membuat request.
2. Request dikirim melalui jaringan.
3. Server memproses request.
4. Server mengirim response.
5. Client menggunakan hasilnya.

Contoh: browser meminta halaman dari web server atau aplikasi mobile meminta data akun dari backend.

### Bentuk arsitektur

- **Two-tier:** client berkomunikasi dengan server/data tier.
- **Three-tier:** presentation, application logic, dan data dipisahkan menjadi tiga tier.
- **N-tier:** aplikasi dibagi menjadi lebih banyak tier.

Kelebihan client-server: pengelolaan data dan aturan bisnis bisa terpusat serta banyak client dapat memakai layanan yang sama. Kekurangannya: server bisa menjadi bottleneck, dan jika tidak ada redundansi dapat menjadi single point of failure.

## 2.3 Middleware

**Middleware** adalah perangkat lunak perantara yang membantu komponen terdistribusi berkomunikasi tanpa harus membangun seluruh mekanisme jaringan sendiri.

Fungsi umum:

- Komunikasi dan pertukaran data.
- Serialisasi/deserialisasi.
- Penamaan atau penemuan layanan.
- Integrasi autentikasi, logging, dan observability sesuai implementasi.
- Abstraksi dari detail jaringan atau sistem operasi.

Contoh: RPC framework, message broker, HTTP framework, dan API gateway.

Middleware tidak otomatis mengatasi semua kegagalan jaringan. Timeout, retry, autentikasi, dan idempotensi tetap harus dirancang.

## 2.4 REST

**REST (Representational State Transfer)** adalah gaya arsitektur yang berorientasi pada resource dan representasinya. REST bukan protokol dan tidak identik dengan JSON. REST sering diterapkan menggunakan HTTP; JSON hanyalah salah satu format representasi.

Konsep penting:

- **Resource:** objek yang dapat diidentifikasi, misalnya produk atau pengguna.
- **URI:** pengenal resource, misalnya `/products/42`.
- **Representation:** data resource yang dikirim, misalnya JSON.
- **Stateless interaction:** setiap request memuat informasi yang diperlukan untuk diproses tanpa bergantung pada konteks sesi client yang disimpan antar-request.
- **Cacheability:** respons dapat menyatakan apakah boleh di-cache.
- **Uniform interface:** interaksi mengikuti antarmuka yang konsisten.

### HTTP methods

| Method | Kegunaan umum | Contoh |
|---|---|---|
| `GET` | Membaca resource | `GET /products/42` |
| `POST` | Membuat resource atau menjalankan pemrosesan | `POST /orders` |
| `PUT` | Mengganti representasi resource secara menyeluruh | `PUT /users/7` |
| `PATCH` | Memperbarui sebagian resource | `PATCH /users/7` |
| `DELETE` | Menghapus resource | `DELETE /products/42` |

**Idempotent** berarti request yang sama dilakukan berulang kali menghasilkan efek akhir setara dengan melakukannya sekali. GET, PUT, dan DELETE dirancang idempotent dalam semantik HTTP; POST pada umumnya tidak dijamin idempotent.

### Status code penting

- `200 OK`: berhasil.
- `201 Created`: resource berhasil dibuat.
- `204 No Content`: berhasil tanpa response body.
- `400 Bad Request`: request tidak valid.
- `401 Unauthorized`: autentikasi belum ada atau tidak valid.
- `403 Forbidden`: akses ditolak.
- `404 Not Found`: resource tidak ditemukan atau tidak diungkap.
- `500 Internal Server Error`: kesalahan internal server.
- `503 Service Unavailable`: layanan sementara tidak tersedia.

REST cenderung berorientasi pada resource; **RPC** cenderung berorientasi pada pemanggilan operasi/prosedur.

---

# 3. Processes

## 3.1 Process dan Thread

**Process** adalah program yang sedang berjalan dengan ruang alamat dan sumber daya eksekusinya sendiri. **Thread** adalah unit eksekusi di dalam sebuah proses.

| Aspek | Process | Thread |
|---|---|---|
| Ruang alamat | Umumnya terpisah dari proses lain | Thread dalam proses yang sama berbagi ruang alamat |
| Sumber daya | Memiliki sumber daya proses | Berbagi sumber daya proses |
| Komunikasi | Sering memakai IPC, socket, atau pipe | Bisa berbagi memori langsung |
| Biaya | Umumnya lebih tinggi | Umumnya lebih ringan |
| Kegagalan | Isolasi relatif lebih kuat | Kesalahan serius dapat memengaruhi seluruh proses |

Thread berbagi heap dan sumber daya proses tertentu, tetapi masing-masing memiliki stack dan keadaan eksekusi sendiri.

### Concurrency vs. parallelism

- **Concurrency:** beberapa tugas sedang dalam progres dalam rentang waktu yang sama; eksekusinya bisa saling berseling.
- **Parallelism:** beberapa tugas benar-benar dieksekusi pada waktu yang sama, misalnya di beberapa core CPU.

### Model concurrency pada server

- **Thread-per-request:** satu thread per request; mudah dipahami, tetapi terlalu banyak thread menghabiskan sumber daya.
- **Thread pool:** sekumpulan thread digunakan kembali untuk menangani tugas.
- **Asynchronous I/O/event loop:** mengelola banyak operasi I/O tanpa harus memblokir satu thread untuk setiap operasi.
- **Multiprocess:** beberapa proses worker untuk memanfaatkan core atau meningkatkan isolasi.

Masalah umum: **race condition**, **deadlock**, **starvation**, dan biaya sinkronisasi. Solusi dapat berupa lock/mutex, semaphore, antrean thread-safe, dan mengurangi shared mutable state.

## 3.2 Pengelolaan Server

Pengelolaan server meliputi penerimaan request, pembagian beban, pengaturan worker, pemantauan kesehatan, dan pemulihan dari kegagalan.

Komponen/konsep:

- **Listener:** menerima koneksi atau request.
- **Worker:** menjalankan pekerjaan.
- **Thread/process pool:** membatasi dan menggunakan ulang worker.
- **Load balancer:** membagi request ke beberapa instance.
- **Health check:** memeriksa kondisi layanan.
- **Timeout:** membatasi lama menunggu.
- **Retry:** mencoba ulang operasi yang gagal dengan batas dan kebijakan tertentu.
- **Graceful shutdown:** menghentikan penerimaan pekerjaan baru dan menutup pekerjaan yang berjalan secara terkontrol.
- **Monitoring/logging:** memantau latency, error rate, CPU, dan memori.

Retry tanpa batas dapat memperparah overload. Untuk operasi penting, pertimbangkan idempotency key atau deduplikasi agar request yang dikirim ulang tidak menggandakan efek.

## 3.3 Virtualisasi

**Virtualisasi** membuat representasi virtual sumber daya komputasi sehingga perangkat keras dapat dibagi atau dikelola secara fleksibel.

### Virtual machine (VM)

VM menjalankan sistem operasi tamu di atas virtualisasi perangkat keras yang dikelola **hypervisor**.

- **Type 1 hypervisor:** berjalan langsung di atas perangkat keras.
- **Type 2 hypervisor:** berjalan di atas sistem operasi host.

VM dapat menjalankan OS berbeda dan menyediakan isolasi tingkat mesin, tetapi umumnya memerlukan sumber daya lebih besar karena tiap VM membawa OS tamu.

### Container

Container mengisolasi aplikasi menggunakan fitur kernel OS, seperti namespaces dan cgroups pada Linux. Container umumnya berbagi kernel host sehingga lebih ringan dan cepat dijalankan dibanding VM.

| Aspek | VM | Container |
|---|---|---|
| Kernel | Umumnya memiliki kernel OS tamu sendiri | Berbagi kernel host |
| Overhead | Umumnya lebih besar | Umumnya lebih ringan |
| Startup | Cenderung lebih lambat | Cenderung lebih cepat |
| Isolasi | Batas isolasi tingkat mesin virtual | Isolasi tingkat OS, bergantung konfigurasi |

VM atau container sendiri tidak otomatis membuat aplikasi menjadi sistem terdistribusi; komponen aplikasi tetap harus berkomunikasi dan berkoordinasi.

---

# 4. Communication

## 4.1 Jenis Komunikasi

### Synchronous vs. asynchronous

- **Synchronous:** pemanggil menunggu hasil atau response sebelum melanjutkan alur tersebut. Contoh: client menunggu hasil HTTP request.
- **Asynchronous:** pengirim dapat melanjutkan pekerjaan tanpa menunggu penerima menyelesaikan pemrosesan. Contoh: pesan dikirim ke queue untuk diproses kemudian.

### Transient vs. persistent

- **Transient communication:** pengiriman bergantung pada penerima atau sistem komunikasi yang aktif pada waktu yang diperlukan; pesan bisa gagal jika penerima tidak tersedia.
- **Persistent communication:** sistem komunikasi menyimpan pesan sampai bisa disampaikan atau diproses sesuai kebijakan, misalnya durable message queue.

### Unicast, multicast, broadcast

- **Unicast:** satu pengirim ke satu penerima.
- **Multicast:** satu pengirim ke kelompok penerima.
- **Broadcast:** pengiriman ke semua host dalam cakupan jaringan broadcast yang relevan.

### Request-response vs. message/event-based

- **Request-response:** peminta mengirim request dan biasanya menunggu response terkait, misalnya membaca detail produk melalui HTTP.
- **Message/event-based:** pengirim menerbitkan pesan/event untuk diproses oleh penerima, sering kali secara asynchronous, misalnya event `OrderCreated`.

| Aspek | Request-response | Messaging |
|---|---|---|
| Waktu | Peminta biasanya menunggu | Pengirim dan penerima bisa bekerja di waktu berbeda |
| Ketergantungan | Perlu endpoint dan kontrak layanan | Dapat memakai broker dan kontrak pesan |
| Kegagalan | Timeout/error perlu ditangani | Queue, retry, acknowledgement, DLQ perlu dikelola |
| Cocok untuk | Hasil segera | Pekerjaan latar dan integrasi event-driven |

## 4.2 RPC (Remote Procedure Call)

**RPC** memungkinkan program memanggil operasi pada proses/komputer lain melalui jaringan dengan abstraksi yang menyerupai pemanggilan lokal.

### Alur RPC

1. Client memanggil fungsi pada **client stub**.
2. Stub melakukan serialisasi parameter menjadi pesan.
3. Pesan dikirim melalui jaringan.
4. **Server stub/skeleton** menerima dan mendeserialisasi pesan.
5. Prosedur server dijalankan.
6. Hasil atau error diserialisasi dan dikirim kembali.
7. Client stub mengembalikan hasil kepada pemanggil.

Istilah penting:

- **Stub:** perantara yang menerjemahkan pemanggilan fungsi menjadi pesan jaringan dan sebaliknya.
- **Serialization/marshalling:** mengubah data ke format yang dapat dikirim.
- **Deserialization/unmarshalling:** mengubah data yang diterima menjadi bentuk yang dapat digunakan.
- **Timeout:** batas waktu menunggu hasil.
- **Idempotency:** membantu mencegah efek ganda ketika operasi dicoba ulang.

Remote call tidak sama dengan pemanggilan lokal: jaringan dapat mengalami latency, timeout, server mati, atau response hilang meskipun operasi sebenarnya sudah dijalankan.

Contoh teknologi: gRPC, XML-RPC, dan JSON-RPC.

## 4.3 Messaging

**Messaging** adalah pola komunikasi saat komponen bertukar pesan melalui mekanisme pengiriman pesan, sering kali dengan message broker.

Komponen:

- **Producer/publisher:** menghasilkan pesan.
- **Consumer/subscriber:** menerima dan memproses pesan.
- **Queue:** menyimpan pesan untuk diproses consumer.
- **Topic:** kanal publikasi yang dapat diterima subscriber.
- **Message broker:** menerima, menyimpan, dan/atau meneruskan pesan.
- **Acknowledgement (ack):** tanda penerimaan atau pemrosesan pada tahap tertentu.
- **Dead-letter queue (DLQ):** menampung pesan yang gagal diproses sesuai kebijakan.

### Delivery semantics

- **At-most-once:** pesan diproses nol atau satu kali; pesan dapat hilang, tetapi tidak sengaja diulang.
- **At-least-once:** pesan bisa dikirim ulang sampai dianggap berhasil; duplikasi mungkin terjadi.
- **Exactly-once:** jaminan hanya berlaku dalam cakupan dan definisi sistem tertentu; tidak otomatis menjamin semua efek eksternal terjadi tepat satu kali.

Karena at-least-once dapat menghasilkan duplikasi, consumer sebaiknya **idempotent** atau memiliki mekanisme deduplikasi.

### Contoh

1. Pengguna membuat pesanan.
2. Layanan order menyimpan pesanan dan menerbitkan event `OrderCreated`.
3. Broker menerima event.
4. Consumer notifikasi memproses event untuk mengirim email.
5. Consumer analitik menggunakan event yang sama untuk memperbarui laporan.

Layanan order tidak harus menunggu email dan analitik selesai. Sistem tetap perlu menangani kegagalan, duplikasi, urutan pesan, dan backlog antrean.

---

# 5. Ringkasan Perbandingan

| Pasangan konsep | Pembeda utama |
|---|---|
| Terpusat vs. terdistribusi | Satu pusat pemrosesan utama vs. banyak node yang berkoordinasi |
| Scale up vs. scale out | Memperbesar satu mesin vs. menambah mesin/instance |
| Access vs. location transparency | Cara akses diseragamkan vs. lokasi resource disembunyikan |
| Client-server vs. middleware | Model peran peminta/penyedia vs. perangkat lunak perantara komunikasi |
| REST vs. RPC | Resource/representasi vs. pemanggilan operasi |
| Process vs. thread | Ruang alamat dan sumber daya proses vs. unit eksekusi di dalam proses |
| Concurrency vs. parallelism | Banyak tugas dalam progres vs. eksekusi benar-benar bersamaan |
| VM vs. container | OS tamu/kernel sendiri vs. berbagi kernel host |
| Synchronous vs. asynchronous | Alur menunggu hasil vs. dapat melanjutkan tanpa menunggu hasil akhir |
| RPC vs. messaging | Memanggil operasi dan biasanya menunggu hasil vs. mengirim pesan untuk diproses |
| At-most-once vs. at-least-once | Pesan dapat hilang tanpa pengulangan vs. retry dapat menyebabkan duplikasi |

---

# 6. Latihan UTS

Coba jawab tanpa melihat catatan dahulu.

1. Definisikan sistem terdistribusi dan sebutkan tiga karakteristiknya.
2. Jelaskan empat jenis distribution transparency beserta contohnya.
3. Sebutkan tiga dimensi scalability.
4. Mengapa menambah instance web tidak selalu mengatasi database yang kewalahan?
5. Jelaskan peran client, server, dan middleware.
6. Berikan contoh endpoint REST untuk membaca daftar produk, membaca satu produk, membuat pesanan, dan mengubah sebagian data pengguna.
7. Bedakan process, thread, concurrency, dan parallelism.
8. Bandingkan thread pool dengan asynchronous I/O.
9. Bandingkan VM dan container dari sisi kernel, overhead, dan isolasi.
10. Jelaskan alur RPC dari client stub hingga hasil kembali ke client.
11. Bandingkan request-response dengan messaging.
12. Mengapa retry dapat membuat operasi atau pesan diproses lebih dari sekali?
13. Apa itu partial failure dan mengapa penting dalam sistem terdistribusi?
14. Berikan contoh replication transparency dan jelaskan keterbatasannya.

## Arah jawaban singkat

1. Banyak node independen berkomunikasi melalui jaringan untuk bekerja sebagai satu sistem; contoh karakteristik: concurrency, berbagi resource, partial failure.
2. Sebutkan nama transparency, detail yang disembunyikan, dan contoh yang tepat.
3. Size, geographical, administrative scalability.
4. Database tetap menjadi bottleneck; evaluasi optimasi query, caching, read replica, partitioning, atau asynchronous processing sesuai pola beban.
5. Client meminta layanan, server menyediakannya, middleware membantu komunikasi dan integrasi.
6. Contoh: `GET /products`, `GET /products/42`, `POST /orders`, `PATCH /users/7`.
7. Process adalah program berjalan; thread unit eksekusi; concurrency adalah progres tugas yang saling berseling; parallelism adalah eksekusi pada waktu yang sama.
8. Thread pool menggunakan ulang worker terbatas; asynchronous I/O mengelola operasi I/O tanpa memblokir satu thread untuk setiap operasi.
9. VM umumnya membawa OS tamu; container berbagi kernel host dan umumnya lebih ringan.
10. Pemanggilan client → serialisasi stub → jaringan → server stub → prosedur server → serialisasi hasil → jaringan → client stub.
11. Request-response biasanya menunggu jawaban; messaging memungkinkan pemrosesan terpisah melalui pesan atau antrean.
12. Respons bisa hilang setelah operasi berhasil sehingga pengirim mencoba ulang; idempotensi/deduplikasi mengurangi efek ganda.
13. Node atau jaringan dapat gagal sendiri sementara komponen lain masih berjalan.
14. Beberapa replika tampak sebagai satu resource; kegagalan, data stale, dan konsistensi tetap harus ditangani.

## Checklist persiapan

- [ ] Bisa menjelaskan setiap istilah dengan kata-kata sendiri.
- [ ] Bisa memberi contoh nyata untuk setiap konsep.
- [ ] Bisa membandingkan pasangan konsep pada tabel ringkasan.
- [ ] Bisa menggambar alur client-server, RPC, dan messaging.
- [ ] Bisa menjelaskan trade-off skalabilitas, retry, transparansi, dan konsistensi.
- [ ] Bisa menjawab latihan tanpa melihat kunci.

**Strategi belajar:** pahami definisi → gambarkan alur → buat contoh → bandingkan konsep yang mirip → jawab soal latihan tanpa melihat catatan.

> Sesuaikan kembali istilah dan penekanan dengan slide atau definisi yang digunakan dosen di kelas.

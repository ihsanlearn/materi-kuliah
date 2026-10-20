---
title: "Kisi-Kisi UTS/UAS — Interaksi Manusia dan Komputer"
description: "Ringkasan belajar IMK tentang Model Interaksi Don Norman, mental model, persona, skenario, dan Design Thinking, dilengkapi contoh, tabel perbandingan, serta latihan."
order: 1
date: 2026-10-20
---

# Kisi-Kisi Interaksi Manusia dan Komputer (IMK)

Materi ini merangkum lima topik utama IMK: **Model Interaksi Don Norman, Mental Model, Persona, Skenario, dan Design Thinking**. Gunakan pola belajar: pahami definisi → pahami tahapan/komponen → pelajari contoh → bandingkan konsep yang mirip → latihan menjelaskan dengan kata-kata sendiri.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kamu diharapkan mampu:

- Menjelaskan tahapan model interaksi Don Norman beserta gulf of execution dan gulf of evaluation.
- Membedakan mental model, conceptual model, dan system image.
- Menyusun persona berdasarkan hasil riset pengguna.
- Menulis skenario penggunaan yang berpusat pada tujuan dan konteks pengguna.
- Menjelaskan lima tahap Design Thinking dan menerapkannya pada masalah sederhana.
- Menghubungkan kelima konsep dalam proses merancang antarmuka yang mudah digunakan.

---

# 1. Model Interaksi Don Norman

## 1.1 Pengertian

Model interaksi Don Norman menjelaskan bagaimana seseorang berinteraksi dengan suatu sistem untuk mencapai tujuan, lalu memahami apakah tindakannya berhasil. Model ini membantu desainer menemukan bagian interaksi yang membingungkan atau menyulitkan pengguna.

Contoh: mahasiswa ingin mengumpulkan tugas melalui aplikasi kampus. Ia menetapkan tujuan, mencari tombol pengumpulan, memilih file, mengirimkannya, lalu memeriksa apakah tugas benar-benar terkirim.

## 1.2 Tujuh Tahap Model Interaksi

Model ini sering dijelaskan melalui **tujuh tahap tindakan (seven stages of action)**.

| Tahap | Pertanyaan pengguna | Contoh pada aplikasi kampus |
|---|---|---|
| 1. Membentuk tujuan (Forming the goal) | Apa yang ingin saya capai? | Saya ingin mengumpulkan tugas sebelum tenggat. |
| 2. Membentuk niat (Forming the intention) | Tindakan apa yang akan saya lakukan? | Saya akan membuka halaman tugas dan mengunggah file. |
| 3. Menentukan tindakan (Specifying the action) | Langkah konkret apa yang harus dilakukan? | Saya memilih tugas, menekan tombol unggah, lalu memilih file. |
| 4. Melaksanakan tindakan (Executing the action) | Bagaimana saya menjalankannya? | Saya mengonfirmasi file dan menekan tombol kirim. |
| 5. Mempersepsikan keadaan sistem (Perceiving the system state) | Apa yang ditampilkan sistem? | Saya melihat indikator proses atau pesan setelah mengirim. |
| 6. Menafsirkan keadaan sistem (Interpreting the system state) | Apa arti informasi itu? | Saya memahami apakah file sedang diunggah atau sudah terkirim. |
| 7. Mengevaluasi hasil (Evaluating the outcome) | Apakah tujuan saya tercapai? | Saya memastikan status tugas berubah menjadi “Terkumpul”. |

Secara ringkas, tahap 1–4 berfokus pada **melakukan sesuatu**, sedangkan tahap 5–7 berfokus pada **memahami apa yang terjadi dan menilai hasilnya**.

## 1.3 Gulf of Execution

**Gulf of Execution** adalah kesenjangan antara tujuan pengguna dan tindakan yang disediakan atau dapat ditemukan pada antarmuka untuk mencapai tujuan tersebut.

Contoh: mahasiswa ingin mengunggah tugas, tetapi tombolnya hanya berupa ikon yang tidak jelas dan tidak memiliki label. Pengguna tahu tujuannya, tetapi kesulitan menemukan tindakan yang tepat.

Cara memperkecil gulf of execution:

- Gunakan label tombol yang jelas, misalnya “Unggah Tugas”.
- Kelompokkan tindakan berdasarkan alur kerja pengguna.
- Tampilkan pilihan yang relevan pada saat dibutuhkan.
- Gunakan istilah yang familier bagi pengguna, bukan istilah internal sistem.
- Berikan petunjuk visual tentang tindakan yang dapat dilakukan.

## 1.4 Gulf of Evaluation

**Gulf of Evaluation** adalah kesenjangan antara keadaan sistem yang sebenarnya dan kemampuan pengguna untuk memahami keadaan tersebut serta mengetahui apakah tujuannya tercapai.

Contoh: setelah mengunggah tugas, tombol kembali ke halaman sebelumnya tanpa pesan apa pun. Pengguna tidak tahu apakah file berhasil terkirim.

Cara memperkecil gulf of evaluation:

- Tampilkan feedback setelah tindakan.
- Gunakan status yang mudah dimengerti, misalnya “Tugas berhasil dikumpulkan”.
- Tampilkan indikator loading ketika proses berlangsung.
- Jelaskan kesalahan dan cara memperbaikinya.
- Tampilkan ringkasan hasil atau status terbaru.

## 1.5 Prinsip Desain yang Berkaitan

- **Discoverability:** pengguna dapat mengetahui tindakan apa yang tersedia dan bagaimana melakukannya.
- **Feedback:** sistem memberi informasi tentang akibat tindakan pengguna.
- **Mapping:** hubungan antara kontrol dan dampaknya terasa masuk akal.
- **Constraints (batasan):** pilihan atau tindakan yang tidak sesuai dibatasi untuk mencegah kesalahan.
- **Signifiers:** petunjuk yang menunjukkan cara atau tempat untuk bertindak.
- **Conceptual model:** penjelasan yang membantu pengguna memahami cara kerja sistem.

Contoh mapping: tombol volume “+” menaikkan volume, sedangkan tombol “−” menurunkannya. Contoh constraint: tombol “Kirim” dinonaktifkan sampai file wajib dipilih.

### Ringkasan Norman

- **Gulf of Execution:** “Bagaimana cara melakukan yang saya inginkan?”
- **Gulf of Evaluation:** “Apa yang terjadi, dan apakah saya berhasil?”

Desain yang baik membantu pengguna memilih tindakan yang tepat dan memahami hasilnya tanpa harus menebak-nebak.

---

# 2. Mental Model

## 2.1 Pengertian

**Mental model** adalah pemahaman atau gambaran yang dimiliki seseorang tentang bagaimana suatu benda, aplikasi, atau sistem bekerja. Mental model terbentuk dari pengalaman, kebiasaan, pengetahuan sebelumnya, dan petunjuk yang diberikan sistem.

Mental model tidak harus sepenuhnya benar. Pengguna bisa memiliki dugaan yang keliru, terutama ketika antarmuka tidak menjelaskan perilaku sistem dengan baik.

Contoh: seseorang menganggap ikon tempat sampah berarti file akan dihapus. Jika ternyata ikon tersebut hanya memindahkan file ke arsip, tindakannya tidak sesuai dengan mental model yang dimiliki.

## 2.2 Mengapa Mental Model Penting?

Mental model memengaruhi bagaimana pengguna:

- Menebak fungsi tombol atau ikon.
- Memprediksi akibat suatu tindakan.
- Memahami struktur navigasi.
- Menyelesaikan tugas tanpa membaca petunjuk panjang.
- Mengetahui cara pulih dari kesalahan.

Desainer perlu mempelajari cara berpikir pengguna, bukan sekadar menganggap pengguna akan memahami cara kerja sistem dari perspektif pembuatnya.

## 2.3 Mental Model, Conceptual Model, dan System Image

Ketiganya saling berhubungan, tetapi tidak sama.

| Konsep | Makna | Contoh |
|---|---|---|
| **Mental model** | Pemahaman pengguna tentang cara kerja sistem | Pengguna mengira ikon awan berarti file disimpan secara online dan bisa diakses dari perangkat lain. |
| **Conceptual model** | Penjelasan atau model kerja yang dirancang agar sistem mudah dipahami | Aplikasi menjelaskan bahwa file yang disinkronkan tersedia di semua perangkat yang login. |
| **System image** | Semua petunjuk yang dilihat/dialami pengguna untuk memahami sistem, seperti antarmuka, label, dokumentasi, dan feedback | Ikon sinkronisasi, status “Tersimpan”, pesan error, dan halaman bantuan. |

Desainer membentuk conceptual model dan mewujudkannya melalui sistem. Pengguna mengamati system image lalu membangun mental model mereka sendiri.

Jika petunjuk antarmuka tidak konsisten, mental model pengguna bisa salah meskipun implementasi sistem bekerja sesuai spesifikasi teknis.

## 2.4 Contoh: Keranjang Belanja

Bayangkan aplikasi belanja online.

- **Mental model pengguna:** barang yang ditambahkan ke keranjang akan tetap ada ketika aplikasi dibuka lagi.
- **Perilaku sistem:** keranjang disimpan pada akun pengguna, tetapi pengguna yang belum login mungkin hanya memiliki keranjang lokal sementara.
- **Potensi masalah:** pengguna mengira barangnya hilang ketika berpindah perangkat.
- **Perbaikan desain:** jelaskan status penyimpanan keranjang, minta login pada waktu yang tepat, dan beri pesan jika isi keranjang belum tersinkronisasi.

## 2.5 Cara Membantu Mental Model Pengguna

1. Gunakan istilah dan pola interaksi yang familier.
2. Buat navigasi dan label konsisten.
3. Berikan feedback setelah tindakan.
4. Tampilkan status sistem yang relevan.
5. Hindari ikon ambigu tanpa label ketika maknanya tidak umum.
6. Uji antarmuka dengan pengguna untuk mengetahui dugaan mereka tentang cara kerja sistem.

**Catatan penting:** jangan menyalahkan pengguna ketika mereka salah memahami antarmuka. Ketidaksesuaian mental model bisa menjadi sinyal bahwa desain perlu diperbaiki.

---

# 3. Persona

## 3.1 Pengertian

**Persona** adalah representasi fiktif tetapi berbasis data tentang kelompok pengguna yang memiliki kebutuhan, tujuan, perilaku, dan hambatan serupa. Persona digunakan agar tim desain tidak merancang produk hanya berdasarkan asumsi atau preferensi pribadi.

Persona bukan sekadar profil demografis. Informasi paling berguna adalah hal-hal yang memengaruhi cara seseorang menggunakan produk.

## 3.2 Komponen Persona

Persona dapat memuat:

- **Nama dan gambaran singkat:** identitas fiktif untuk memudahkan diskusi.
- **Latar belakang yang relevan:** konteks penggunaan produk.
- **Tujuan (goals):** hasil yang ingin dicapai.
- **Kebutuhan (needs):** hal yang dibutuhkan agar tujuan tercapai.
- **Perilaku:** cara pengguna biasanya bertindak.
- **Frustrasi atau pain points:** hambatan yang dialami.
- **Konteks penggunaan:** perangkat, lokasi, waktu, koneksi, atau situasi.
- **Kutipan representatif:** ringkasan ungkapan pengguna yang benar-benar didukung hasil riset.

Informasi persona harus dipilih berdasarkan relevansinya terhadap masalah desain. Tidak semua persona memerlukan usia, hobi, atau foto.

## 3.3 Contoh Persona: Aplikasi Akademik

> Contoh berikut merupakan persona hipotetis untuk latihan, bukan hasil wawancara pengguna nyata.

### Naya — Mahasiswa yang Sering Mengakses Informasi Lewat Ponsel

- **Konteks:** menggunakan aplikasi akademik di sela jadwal kuliah.
- **Tujuan:** memeriksa tenggat tugas dan mengumpulkan file dengan cepat.
- **Kebutuhan:** status tugas jelas, navigasi mudah, dan konfirmasi setelah pengumpulan.
- **Perilaku:** membuka aplikasi dalam sesi singkat dan sering berpindah antarhalaman.
- **Pain points:** label menu kurang jelas, status unggahan tidak terlihat, dan harus mengulang langkah ketika koneksi terputus.
- **Implikasi desain:** sediakan navigasi yang konsisten, status proses, pesan error yang membantu, dan konfirmasi pengumpulan.

Persona ini membantu tim mengevaluasi apakah rancangan mendukung tujuan dan konteks Naya, bukan sekadar apakah tampilannya terlihat menarik.

## 3.4 Cara Membuat Persona

1. **Tentukan tujuan riset.** Contoh: mencari tahu kesulitan mahasiswa mengumpulkan tugas.
2. **Kumpulkan data.** Lakukan wawancara, observasi, survei, atau analisis feedback.
3. **Cari pola.** Identifikasi kesamaan tujuan, perilaku, kebutuhan, dan hambatan.
4. **Kelompokkan pengguna.** Buat kelompok berdasarkan pola yang relevan, bukan stereotip.
5. **Susun persona.** Tulis tujuan, konteks, perilaku, dan pain points dengan ringkas.
6. **Validasi.** Periksa apakah persona sesuai bukti yang terkumpul dan revisi bila perlu.
7. **Gunakan dalam keputusan desain.** Hubungkan kebutuhan persona dengan fitur atau rancangan yang dibuat.

## 3.5 Hal yang Perlu Dihindari

- Membuat persona hanya berdasarkan tebakan tim.
- Menganggap semua orang dalam satu kelompok demografis memiliki perilaku sama.
- Memasukkan terlalu banyak detail yang tidak relevan.
- Membuat persona lalu tidak pernah menggunakannya untuk mengambil keputusan.
- Menganggap persona mewakili setiap pengguna tanpa pengecualian.

Persona membantu memusatkan perhatian pada kebutuhan pengguna, tetapi tidak menggantikan riset atau pengujian langsung.

---

# 4. Skenario

## 4.1 Pengertian

**Skenario** adalah cerita singkat yang menjelaskan bagaimana seorang pengguna berinteraksi dengan produk dalam konteks tertentu untuk mencapai tujuan. Skenario biasanya memuat pengguna, tujuan, situasi, tindakan, dan hasil yang diharapkan.

Skenario menjawab pertanyaan: **siapa yang menggunakan sistem, dalam situasi apa, untuk mencapai tujuan apa, dan bagaimana interaksinya berlangsung?**

## 4.2 Komponen Skenario

- **Aktor/pengguna:** siapa yang melakukan aktivitas.
- **Konteks:** kapan, di mana, dan dalam kondisi apa aktivitas berlangsung.
- **Tujuan:** hasil yang ingin dicapai.
- **Alur tindakan:** langkah atau interaksi penting.
- **Hasil:** kondisi yang diharapkan setelah alur selesai.
- **Hambatan atau alternatif:** kondisi yang dapat mengubah alur, jika relevan.

Skenario tidak harus menjelaskan setiap klik secara rinci. Fokusnya adalah pengalaman dan alur untuk mencapai tujuan.

## 4.3 Contoh Skenario: Mengumpulkan Tugas

**Pengguna:** Naya, mahasiswa yang menggunakan ponsel.

**Konteks:** tenggat tugas tinggal 30 menit dan Naya sedang berada di area kampus dengan koneksi internet yang tidak stabil.

**Tujuan:** mengumpulkan file tugas sebelum tenggat.

**Alur skenario:**

1. Naya membuka halaman mata kuliah dan memilih tugas yang harus dikumpulkan.
2. Sistem menampilkan instruksi, batas waktu, format file, dan status pengumpulan.
3. Naya memilih file dari ponselnya.
4. Sistem memeriksa format file dan menampilkan nama serta ukuran file yang dipilih.
5. Naya menekan tombol “Kumpulkan”.
6. Sistem menampilkan indikator proses, lalu memberikan konfirmasi ketika pengumpulan berhasil.
7. Jika koneksi terputus, sistem menjelaskan bahwa pengiriman belum terkonfirmasi dan menyediakan cara untuk mencoba kembali tanpa membuat pengguna menebak statusnya.

**Hasil yang diharapkan:** Naya mengetahui apakah tugasnya berhasil dikumpulkan dan dapat melihat bukti atau status pengumpulan.

**Implikasi desain:** tampilkan status yang jelas, pertahankan pilihan file ketika memungkinkan, tangani koneksi gagal, dan hindari pesan sukses sebelum server benar-benar mengonfirmasi pengumpulan.

## 4.4 Jenis Skenario yang Umum

- **Skenario utama (happy path):** alur ketika semuanya berjalan sesuai harapan.
- **Skenario alternatif:** alur berbeda untuk mencapai tujuan yang sama.
- **Skenario pengecualian/error:** alur ketika terjadi kegagalan, input tidak valid, atau kondisi yang tidak diharapkan.

Contoh pada pengumpulan tugas:

- Utama: file valid berhasil dikirim.
- Alternatif: pengguna mengganti file sebelum mengirim.
- Pengecualian: koneksi terputus atau format file tidak didukung.

## 4.5 Perbedaan Persona dan Skenario

| Persona | Skenario |
|---|---|
| Menjelaskan siapa pengguna dan apa karakteristik kebutuhannya | Menjelaskan bagaimana pengguna bertindak dalam situasi tertentu |
| Relatif stabil selama kebutuhan kelompok pengguna tidak berubah | Spesifik pada konteks dan tujuan tertentu |
| Contoh: Naya membutuhkan status tugas yang jelas | Contoh: Naya mengunggah tugas dengan koneksi internet tidak stabil |
| Membantu menentukan untuk siapa desain dibuat | Membantu memahami alur penggunaan dan kebutuhan interaksi |

Persona dan skenario saling melengkapi. Persona memberikan konteks tentang pengguna, sedangkan skenario menunjukkan bagaimana kebutuhan pengguna muncul dalam situasi nyata.

---

# 5. Design Thinking

## 5.1 Pengertian

**Design Thinking** adalah pendekatan pemecahan masalah yang berpusat pada manusia (*human-centered*) dan dilakukan secara iteratif. Tim berusaha memahami kebutuhan pengguna, mendefinisikan masalah yang tepat, mengeksplorasi ide, membuat prototipe, dan mengujinya.

Design Thinking bukan proses linear yang wajib selesai sekali jalan. Hasil pengujian dapat membuat tim kembali memperjelas masalah atau mengembangkan ide baru.

## 5.2 Lima Tahap Design Thinking

Model yang populer menggunakan lima tahap: **Empathize, Define, Ideate, Prototype, dan Test**.

### 1. Empathize — Memahami pengguna

Tujuan: memahami kebutuhan, pengalaman, perilaku, dan kesulitan pengguna dari sudut pandang mereka.

Aktivitas:

- Wawancara pengguna.
- Observasi aktivitas.
- Membaca keluhan atau feedback.
- Memetakan pengalaman pengguna.

Contoh: tim mengamati mahasiswa yang kesulitan mengetahui apakah tugas mereka sudah terkumpul.

**Output:** temuan riset, kebutuhan pengguna, dan hambatan yang didukung bukti.

### 2. Define — Mendefinisikan masalah

Tujuan: merumuskan masalah utama berdasarkan hasil riset, bukan langsung melompat ke solusi.

Aktivitas:

- Mengelompokkan temuan.
- Menemukan pola dan kebutuhan.
- Menentukan masalah yang paling penting.
- Membuat pernyataan masalah atau *How Might We* (HMW).

Contoh pernyataan masalah:

“Mahasiswa membutuhkan cara untuk mengetahui status pengumpulan tugas dengan cepat karena konfirmasi yang tidak jelas membuat mereka ragu apakah file sudah diterima.”

Contoh pertanyaan HMW:

“Bagaimana kita dapat membantu mahasiswa mengetahui status pengumpulan tugas tanpa membuat alur menjadi rumit?”

**Output:** pernyataan masalah yang terfokus dan dapat ditindaklanjuti.

### 3. Ideate — Menghasilkan ide

Tujuan: mengeksplorasi banyak kemungkinan solusi sebelum memilih solusi yang akan diuji.

Aktivitas:

- Brainstorming.
- Sketching atau menggambar ide.
- Mengembangkan beberapa alternatif.
- Membandingkan ide berdasarkan manfaat, kebutuhan pengguna, biaya, dan kelayakan.

Contoh ide:

- Menampilkan status “Belum dikumpulkan”, “Mengirim”, dan “Berhasil dikumpulkan”.
- Memberikan bukti pengumpulan dengan waktu.
- Menyediakan tombol coba lagi ketika pengiriman gagal.

**Output:** kumpulan alternatif solusi dan alasan memilih ide untuk diuji.

### 4. Prototype — Membuat prototipe

Tujuan: membuat representasi solusi yang bisa diperiksa atau dicoba pengguna tanpa harus membangun produk lengkap.

Bentuk prototipe:

- Sketsa di kertas.
- Wireframe.
- Mockup visual.
- Prototipe interaktif.
- Simulasi alur sederhana.

Contoh: tim membuat wireframe halaman pengumpulan tugas yang menampilkan status unggahan dan konfirmasi.

Prototipe tidak harus sempurna. Tingkat detailnya disesuaikan dengan pertanyaan yang ingin dijawab dan biaya perubahan.

**Output:** representasi solusi untuk dievaluasi.

### 5. Test — Menguji dengan pengguna

Tujuan: mengetahui apakah rancangan membantu pengguna mencapai tujuan, serta menemukan kebingungan atau masalah baru.

Aktivitas:

- Berikan tugas yang realistis kepada peserta.
- Amati tindakan dan kesulitan mereka.
- Minta mereka menjelaskan pemahamannya.
- Catat kesalahan, pertanyaan, dan bagian yang berhasil.
- Gunakan hasil untuk memperbaiki rancangan.

Contoh: minta mahasiswa mengumpulkan file dalam prototipe, lalu periksa apakah mereka dapat mengenali status berhasil tanpa bantuan.

**Output:** temuan pengujian dan keputusan untuk memperbaiki, menguji ulang, atau mengembangkan solusi.

## 5.3 Alur Design Thinking

```
Empathize
   ↓
Define
   ↓
Ideate
   ↓
Prototype
   ↓
Test
   ↺
Hasil pengujian dapat membawa tim kembali ke tahap sebelumnya
```

Urutan ini membantu tim bekerja secara terstruktur, tetapi prosesnya tetap iteratif. Misalnya, jika pengguna tidak memahami prototipe, tim mungkin perlu memperbaiki desain atau kembali memeriksa apakah masalah awal sudah didefinisikan dengan benar.

## 5.4 Contoh Penerapan Lengkap: Status Pengumpulan Tugas

| Tahap | Aktivitas | Hasil |
|---|---|---|
| Empathize | Wawancara mahasiswa tentang pengalaman mengumpulkan tugas | Banyak pengguna ragu apakah unggahan berhasil |
| Define | Merumuskan masalah utama dan kebutuhan pengguna | Status pengumpulan harus mudah dikenali |
| Ideate | Menghasilkan beberapa pilihan feedback dan status | Ide status, timestamp, dan bukti pengumpulan |
| Prototype | Membuat wireframe status pengumpulan | Prototipe halaman pengumpulan |
| Test | Meminta mahasiswa mencoba tugas dan mengamati perilakunya | Ditemukan label yang membingungkan; rancangan direvisi |

## 5.5 Mengapa Design Thinking Penting dalam IMK?

- Mengarahkan desain pada kebutuhan manusia, bukan asumsi pembuat.
- Membantu menemukan masalah sebelum biaya pengembangan menjadi besar.
- Mendorong eksplorasi beberapa alternatif.
- Memungkinkan ide diuji sejak awal.
- Membantu memperbaiki usability berdasarkan observasi dan feedback.

**Ingat:** Design Thinking bukan sekadar membuat desain yang cantik. Tujuannya adalah memahami masalah manusia dan menguji apakah solusi benar-benar membantu.

---

# 6. Hubungan Kelima Topik

Kelima topik ini dapat digunakan bersama dalam proses perancangan antarmuka.

1. **Design Thinking** menyediakan proses untuk memahami masalah, menghasilkan solusi, membuat prototipe, dan mengujinya.
2. **Persona** membantu tim memahami kelompok pengguna yang menjadi fokus desain.
3. **Skenario** menggambarkan tujuan pengguna dalam konteks tertentu dan alur penggunaan produk.
4. **Mental model** membantu tim memahami dugaan pengguna tentang cara kerja sistem dan membuat antarmuka yang sesuai.
5. **Model Interaksi Don Norman** membantu menganalisis apakah pengguna dapat menemukan tindakan yang tepat serta memahami hasil tindakannya.

### Contoh hubungan

Tim merancang aplikasi akademik. Dari tahap Empathize, tim mengetahui bahwa mahasiswa sering ragu apakah tugas sudah terkumpul. Temuan itu digunakan untuk membuat persona dan skenario. Tim lalu membuat prototipe yang sesuai dengan mental model pengguna dan menggunakan prinsip Norman untuk memastikan tombol mudah ditemukan serta feedback pengumpulan jelas. Prototipe diuji, lalu diperbaiki berdasarkan hasil pengujian.

---

# 7. Ringkasan Cepat untuk Ujian

| Topik | Kata kunci | Pertanyaan yang dijawab |
|---|---|---|
| Model Interaksi Don Norman | 7 tahap, Gulf of Execution, Gulf of Evaluation, feedback | Bagaimana pengguna bertindak dan memahami hasil? |
| Mental Model | Pemahaman pengguna, prediksi, pengalaman | Bagaimana pengguna mengira sistem bekerja? |
| Persona | Pengguna representatif, tujuan, kebutuhan, pain points | Untuk siapa desain dibuat? |
| Skenario | Konteks, tujuan, alur tindakan, hasil | Bagaimana pengguna memakai sistem dalam situasi tertentu? |
| Design Thinking | Empathize, Define, Ideate, Prototype, Test | Bagaimana menemukan dan menguji solusi yang berpusat pada pengguna? |

## Hafalan Konsep Penting

- **Gulf of Execution:** pengguna kesulitan mengetahui tindakan apa yang harus dilakukan.
- **Gulf of Evaluation:** pengguna kesulitan memahami keadaan sistem atau hasil tindakannya.
- **Mental model:** gambaran pengguna tentang cara kerja sistem.
- **Persona:** representasi fiktif berbasis data tentang kelompok pengguna.
- **Skenario:** cerita tentang penggunaan produk untuk mencapai tujuan dalam konteks tertentu.
- **Design Thinking:** proses berpusat pada manusia yang iteratif untuk memahami masalah dan menguji solusi.

---

# 8. Latihan Soal

Cobalah jawab dengan kata-katamu sendiri sebelum melihat kunci jawaban.

## A. Pertanyaan Konsep

1. Sebutkan tujuh tahap model interaksi Don Norman secara berurutan.
2. Jelaskan perbedaan Gulf of Execution dan Gulf of Evaluation, masing-masing dengan satu contoh.
3. Apa yang dimaksud mental model? Mengapa mental model pengguna dapat berbeda dari cara kerja sistem yang sebenarnya?
4. Apa perbedaan mental model, conceptual model, dan system image?
5. Mengapa persona sebaiknya dibuat berdasarkan riset, bukan asumsi desainer?
6. Sebutkan komponen utama persona yang berguna untuk desain IMK.
7. Apa perbedaan persona dan skenario?
8. Sebutkan lima tahap Design Thinking dan tujuan setiap tahap.
9. Mengapa prototipe sebaiknya diuji sebelum produk dibangun sepenuhnya?
10. Apakah Design Thinking selalu berjalan satu arah? Jelaskan.

## B. Studi Kasus

Sebuah aplikasi perpustakaan kampus memiliki tombol “Selesai” setelah pengguna memperpanjang masa peminjaman buku. Setelah menekan tombol, layar kembali ke beranda tanpa pesan. Pengguna tidak yakin apakah perpanjangan berhasil.

1. Masalah ini paling jelas menunjukkan gulf yang mana?
2. Feedback apa yang sebaiknya ditambahkan?
3. Buat satu kebutuhan pengguna yang dapat digunakan untuk menyusun persona.
4. Tulis satu skenario singkat ketika pengguna memperpanjang masa peminjaman.
5. Jelaskan bagaimana tim dapat menggunakan lima tahap Design Thinking untuk memperbaiki masalah tersebut.

---

# 9. Kunci Jawaban Ringkas

1. Membentuk tujuan → membentuk niat → menentukan tindakan → melaksanakan tindakan → mempersepsikan keadaan sistem → menafsirkan keadaan sistem → mengevaluasi hasil.
2. Gulf of Execution terkait kesulitan menemukan tindakan; Gulf of Evaluation terkait kesulitan memahami hasil atau keadaan sistem.
3. Mental model adalah pemahaman pengguna tentang cara kerja sistem. Model itu bisa berbeda karena pengalaman, kebiasaan, atau petunjuk antarmuka yang tidak jelas.
4. Mental model berada pada pemahaman pengguna; conceptual model adalah model kerja yang dirancang agar sistem dapat dipahami; system image adalah petunjuk yang dilihat pengguna untuk membentuk pemahaman tersebut.
5. Riset mengurangi asumsi dan membuat persona lebih mewakili pola kebutuhan pengguna yang ditemukan.
6. Tujuan, kebutuhan, perilaku, pain points, konteks penggunaan, dan latar belakang yang relevan. Nama atau kutipan dapat ditambahkan untuk memudahkan pemahaman.
7. Persona menggambarkan siapa pengguna dan kebutuhannya; skenario menggambarkan bagaimana pengguna mencapai tujuan dalam situasi tertentu.
8. Empathize (memahami pengguna), Define (merumuskan masalah), Ideate (menghasilkan ide), Prototype (membuat representasi solusi), Test (menguji solusi).
9. Untuk menemukan masalah usability lebih awal ketika perubahan masih relatif murah.
10. Tidak. Design Thinking iteratif; hasil pengujian dapat membuat tim kembali ke tahap definisi masalah atau ideasi.
11. Studi kasus: terutama Gulf of Evaluation karena pengguna tidak memahami apakah tindakan berhasil. Tambahkan konfirmasi status yang jelas, misalnya “Perpanjangan berhasil sampai [tanggal]”, setelah server memastikan transaksi berhasil. Persona dan skenario harus didasarkan pada kebutuhan serta konteks pengguna yang relevan. Dalam Design Thinking, tim meneliti pengalaman pengguna, mendefinisikan masalah feedback, membuat beberapa ide, memprototipekannya, lalu menguji apakah pengguna memahami status perpanjangan.

**Strategi belajar terakhir:** jangan hanya menghafal istilah. Latih diri menjelaskan definisi, membandingkan konsep yang mirip, lalu menerapkan setiap konsep pada satu contoh aplikasi sehari-hari.

# 📚 Materi Lengkap Jaringan Komputer (Cisco NetAcad ITN v7.0)

> Kumpulan rangkuman Module 9, 12, 13, 14, 16, dan 17 — dirapikan dan digabung jadi satu dokumen referensi belajar.

---

## Daftar Isi

1. [Module 9 — Address Resolution](#module-9--address-resolution)
2. [Module 12 — IPv6 Addressing](#module-12--ipv6-addressing)
3. [Module 13 — ICMP](#module-13--icmp)
4. [Module 14 — Transport Layer](#module-14--transport-layer)
5. [Module 16 — Network Security Fundamentals](#module-16--network-security-fundamentals)
6. [Module 17 — Build a Small Network](#module-17--build-a-small-network)

---

## Module 9 — Address Resolution

### 🎯 Tujuan
Menjelaskan bagaimana **ARP** dan **Neighbor Discovery (ND)** memungkinkan komunikasi antar perangkat.

### 9.1 MAC vs IP Address

| Layer | Jenis Alamat | Fungsi |
|---|---|---|
| Layer 2 | MAC Address (Physical) | Komunikasi NIC-ke-NIC dalam jaringan **sama** |
| Layer 3 | IP Address (Logical) | Kirim paket sumber → tujuan, bisa **beda jaringan** |

- **Jaringan sama**: Destination MAC = MAC perangkat tujuan langsung.
- **Jaringan berbeda**: Destination MAC = MAC **default gateway** (router), bukan MAC tujuan akhir.
  - IPv4 → pakai **ARP**
  - IPv6 → pakai **ICMPv6** (Neighbor Discovery)

### 9.2 ARP (Address Resolution Protocol)

**Fungsi:** mencari MAC address dari IP address yang sudah diketahui, dalam jaringan yang sama. Hasilnya disimpan di **ARP Table**.

**Cara kerja:**
1. Cek ARP table dulu (IP tujuan kalau satu jaringan, atau IP gateway kalau beda jaringan).
2. Jika ketemu → langsung pakai MAC tersimpan.
3. Jika tidak ketemu → kirim **ARP Request** (broadcast): *"Siapa yang punya IP ini? Kirim MAC-nya!"*
4. Perangkat yang cocok membalas dengan **ARP Reply** (unicast) → disimpan ke ARP table.

**Melihat ARP table:**
```
# Cisco Router
R1# show ip arp

# Windows
C:\> arp -a
```

**Penghapusan entri ARP:**
- ARP Cache Timer (otomatis, durasi tergantung OS)
- Manual oleh administrator

**Risiko ARP:**
- **ARP Broadcasting** — terlalu banyak request bisa menurunkan performa jaringan.
- **ARP Spoofing/Poisoning** — penyerang kirim ARP Reply palsu agar traffic disadap (MITM). Mitigasi: **Dynamic ARP Inspection (DAI)** di switch enterprise.

### 9.3 IPv6 Neighbor Discovery (ND)

IPv6 tidak pakai ARP — menggunakan **ND berbasis ICMPv6**.

| Layanan | Fungsi |
|---|---|
| Address Resolution | Cari MAC dari IPv6 address |
| Router Discovery | Temukan router di jaringan |
| Redirection | Pilih next-hop lebih baik |

**Pesan ICMPv6 ND:**
- **NS** (Neighbor Solicitation) — seperti ARP Request, tapi **multicast**
- **NA** (Neighbor Advertisement) — seperti ARP Reply
- **RS** (Router Solicitation) — device tanya ke router
- **RA** (Router Advertisement) — router balas info jaringan
- **ICMPv6 Redirect** — arahkan ke next-hop optimal

### Ringkasan IPv4 vs IPv6

| Aspek | IPv4 | IPv6 |
|---|---|---|
| Protokol | ARP | ICMPv6 ND |
| Request | ARP Request (broadcast) | NS (multicast) |
| Reply | ARP Reply (unicast) | NA (unicast) |
| Penyimpanan | ARP Table | Neighbor Cache |
| Command | `show ip arp` / `arp -a` | — |

---

## Module 12 — IPv6 Addressing

### 12.1 Masalah IPv4 & Solusi IPv6

IPv4 = 32-bit (~4,3 miliar alamat) — sudah tidak cukup. IPv6 = **128-bit**.

Pendorong transisi: pertumbuhan internet, keterbatasan IPv4, masalah NAT, pertumbuhan IoT.

**Teknik koeksistensi:**
| Teknik | Penjelasan |
|---|---|
| Dual Stack | Jalankan IPv4 & IPv6 bersamaan |
| Tunneling | Paket IPv6 dibungkus dalam paket IPv4 |
| Translation (NAT64) | Translasi antar IPv6 ↔ IPv4 |

### 12.2 Representasi Alamat IPv6

- 128 bit, ditulis heksadesimal, **tidak case-sensitive**
- Format: `x:x:x:x:x:x:x:x` (8 hextet, masing-masing 4 digit hex)

**Aturan penyederhanaan:**
1. **Leading zero** boleh dihilangkan (`01ab` → `1ab`), hanya di depan, bukan di belakang.
2. **Double colon `::`** menggantikan satu grup hextet nol berurutan — **hanya boleh sekali** per alamat.

Contoh:
```
Preferred         : 2001:0db8:0000:1111:0000:0000:0000:0200
Tanpa leading zero: 2001:db8:0:1111:0:0:0:200
Compressed        : 2001:db8:0:1111::200
```

### 12.3 Tipe-Tipe Alamat IPv6

| Tipe | Penjelasan |
|---|---|
| Unicast | Satu interface unik |
| Multicast | Satu paket ke banyak tujuan |
| Anycast | Beberapa device, dikirim ke yang terdekat |

> IPv6 **tidak punya broadcast** — diganti multicast all-nodes.

- Prefix length: `/0` – `/128`, rekomendasi LAN = **/64** (SLAAC butuh 64-bit interface ID).

**Tipe unicast:**
- **GUA (Global Unicast Address)** — setara IP publik, mulai dari `2000::/3` (awalan 2 atau 3). Struktur: Global Routing Prefix (48 bit) + Subnet ID (16 bit) + Interface ID (64 bit).
- **LLA (Link-Local Address)** — wajib di setiap interface, range `fe80::/10`, tidak bisa di-route, dipakai sebagai default gateway.
- **ULA (Unique Local Address)** — range `fc00::/7`–`fdff::/7`, mirip private IPv4 tapi tidak di-route global.

### 12.4 Konfigurasi Statis GUA & LLA

```
! GUA
R1(config-if)# ipv6 address 2001:db8:acad:1::1/64
R1(config-if)# no shutdown

! LLA manual
R1(config-if)# ipv6 address fe80::1:1 link-local
```

### 12.5 Dynamic Addressing untuk GUA

**RS/RA:**
- **RS** — host cari router IPv6
- **RA** — router kirim tiap **200 detik**: prefix, prefix length, gateway, DNS, domain name

**3 Metode:**
1. **SLAAC** — GUA dari prefix RA, Interface ID dibuat sendiri (EUI-64/random)
2. **SLAAC + Stateless DHCPv6** — GUA via SLAAC, info tambahan (DNS dll) via DHCPv6
3. **Stateful DHCPv6** — semua dari DHCPv6 server, gateway tetap dari LLA router

**EUI-64:** sisipkan `fffe` di tengah MAC 48-bit, balik bit ke-7 dari 0 ke 1.
```
MAC: fc:99:47:75:ce:e0
EUI-64 Interface ID: fe:99:47:ff:fe:75:ce:e0
```
- **Random ID** dipakai Windows Vista+ (lebih privat), keunikan dijamin via **DAD (Duplicate Address Detection)**.

### 12.6 Dynamic Addressing untuk LLA

- Wajib di setiap interface, prefix `fe80::/10`
- Windows: sama seperti GUA (EUI-64/random)
- Cisco Router: otomatis EUI-64 saat GUA dikonfigurasi

```
R1# show ipv6 interface brief
GigabitEthernet0/0/0 [up/up]
   FE80::7279:B3FF:FE92:3640
   2001:DB8:ACAD:1::1
```

### 12.7 IPv6 Multicast

- Semua multicast berawalan `ff00::/8`
- **Well-known**: `ff02::1` (all-nodes), `ff02::2` (all-routers)
- **Solicited-node multicast** — lebih efisien, filter di level hardware NIC

> Multicast hanya bisa jadi **destination**, bukan source.

### 12.8 Subnetting IPv6

Struktur GUA: `Global Routing Prefix (48 bit) | Subnet ID (16 bit) | Interface ID (64 bit)`

Dengan Subnet ID 16-bit → 65.536 subnet /64 dari satu prefix /48.

```
2001:db8:acad::/48
├── Subnet 0: 2001:db8:acad:0000::/64
├── Subnet 1: 2001:db8:acad:0001::/64
├── Subnet 2: 2001:db8:acad:0002::/64
└── ... hingga 2001:db8:acad:ffff::/64
```

### Istilah Penting Module 12

`Hextet`, `GUA`, `LLA`, `ULA`, `SLAAC`, `EUI-64`, `DAD`, `RA`, `RS`, `Solicited-node multicast`

---

## Module 13 — ICMP

### 🎯 Tujuan
Menguji konektivitas jaringan dengan ICMP, Ping, dan Traceroute.

### Bagian 1: ICMP Messages

ICMP = protokol feedback soal masalah pemrosesan paket IP. Ada **ICMPv4** dan **ICMPv6**.

**3 Jenis pesan umum:**

1. **Host Reachability (Echo)** — dasar dari `ping`. Echo Request → Echo Reply.
2. **Destination/Service Unreachable** — disertai kode error:

| Kode | ICMPv4 | ICMPv6 |
|---|---|---|
| 0 | Net unreachable | No route to destination |
| 1 | Host unreachable | Diblokir administratif (firewall) |
| 2 | Protocol unreachable | Beyond scope of source address |
| 3 | Port unreachable | Address unreachable |
| 4 | — | Port unreachable |

3. **Time Exceeded** — TTL (IPv4) atau Hop Limit (IPv6) mencapai 0. Dipakai oleh `traceroute`.

**ICMPv6 khusus — NDP (4 pesan tambahan):**
- **RA** (Router Advertisement) — tiap 200 detik, berisi prefix, DNS, domain
- **RS** (Router Solicitation) — host minta info IPv6
- **NS** (Neighbor Solicitation) — DAD & address resolution
- **NA** (Neighbor Advertisement) — balasan NS

### Bagian 2: Ping dan Traceroute

**Ping** — uji konektivitas via Echo Request/Reply, hasil: success rate & round-trip time.

| Skenario | Tujuan |
|---|---|
| Ping Loopback (`127.0.0.1` / `::1`) | Cek TCP/IP stack lokal |
| Ping Default Gateway | Cek komunikasi jaringan lokal |
| Ping Remote Host | Cek komunikasi lintas jaringan |

> Ping pertama sering timeout karena perlu ARP/ND dulu.

**Traceroute** — memetakan jalur hop-per-hop:
1. Kirim paket TTL=1 → router pertama balas "Time Exceeded"
2. Catat alamat, kirim TTL=2, dst.
3. Berlanjut sampai sampai tujuan / TTL maksimum

`*` = hop tidak merespons.

### Istilah Module 13

`ICMP/ICMPv4/ICMPv6`, `ping`, `traceroute/tracert`, `NDP`, `RS/RA`, `NS/NA`, `TTL`, `DAD`, `SLAAC`

---

## Module 14 — Transport Layer

### 14.1 Peran Transport Layer

Lapisan ke-4 TCP/IP — mengelola komunikasi logis antar aplikasi.

**Tanggung jawab:**
- Melacak percakapan individual
- Segmentasi & reassembly
- Menambahkan header
- Multiplexing (banyak aplikasi sekaligus)

Dua protokol utama: **TCP** dan **UDP**.

### 14.2 TCP Overview

Connection-oriented, andal, terkontrol.

| Fitur | Penjelasan |
|---|---|
| Establishes a Session | Koneksi dulu sebelum data |
| Reliable Delivery | Jamin setiap segmen tiba |
| Same-Order Delivery | Urutkan ulang jika perlu |
| Flow Control | Atur kecepatan kirim |

**TCP Header (20 bytes):** Source/Destination Port, Sequence Number, Acknowledgment Number, Header Length, Reserved, Control Bits, Window Size, Checksum, Urgent.

Aplikasi: FTP, HTTP, SMTP, SSH.

### 14.3 UDP Overview

Connectionless, best-effort, tidak ada retransmission/session.

**UDP Header (8 bytes):** Source Port, Destination Port, Length, Checksum.

**Kategori aplikasi UDP:**
1. Live video/multimedia (VoIP, streaming)
2. Simple request-reply (DNS, DHCP)
3. Aplikasi yang urus reliabilitas sendiri (SNMP, TFTP)

### 14.4 Port Numbers

**Socket** = IP + port, contoh `192.168.1.5:1305`.

| Kelompok | Rentang |
|---|---|
| Well-known | 0–1.023 |
| Registered | 1.024–49.151 |
| Dynamic/Private | 49.152–65.535 |

| Port | Protokol | Aplikasi |
|---|---|---|
| 20/21 | TCP | FTP |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | UDP/TCP | DNS |
| 67/68 | UDP | DHCP |
| 69 | UDP | TFTP |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 161 | UDP | SNMP |
| 443 | TCP | HTTPS |

`netstat` — lihat koneksi TCP aktif (deteksi koneksi mencurigakan).

### 14.5 TCP Communication Process

**Three-Way Handshake:**
```
Client          Server
  --- SYN ----->     (1) minta koneksi
  <-- SYN+ACK --     (2) setuju & minta balik
  --- ACK ----->     (3) konfirmasi
```

**Termination (4 langkah):**
```
--- FIN -----> <-- ACK -- <-- FIN -- --- ACK -->
```

**6 Control Flags:** URG, ACK, PSH, RST, SYN, FIN.

### 14.6 Reliability and Flow Control

- **Sequence Numbers** — reassembly data tidak berurutan
- **Retransmission** — kirim ulang segmen tanpa ACK
- **SACK** — beri tahu segmen spesifik yang sudah diterima (lebih efisien)
- **Flow Control** — sliding window, ukuran membesar jika jaringan lancar
- **MSS** — IPv4 umum = 1.460 bytes (MTU 1500 − header IP 20 − header TCP 20)
- **Congestion Avoidance** — kurangi data jika terdeteksi macet

### 14.7 UDP Communication

- Overhead kecil, lebih cepat tapi tidak andal
- Tidak ada sequence number / reordering / retransmission
- Server pakai well-known port, client pilih port dinamis

### TCP vs UDP

| Aspek | TCP | UDP |
|---|---|---|
| Koneksi | Connection-oriented | Connectionless |
| Keandalan | Andal | Best-effort |
| Urutan | Diurutkan | Tidak diurutkan |
| Retransmit | Ya | Tidak |
| Header | 20 byte | 8 byte |
| Kecepatan | Lebih lambat | Lebih cepat |
| Contoh | FTP, HTTP, Email, SSH | VoIP, DNS, Streaming, DHCP |

---

## Module 16 — Network Security Fundamentals

### 16.1 Security Threats and Vulnerabilities

**4 Ancaman setelah penyusup masuk:**
- Information Theft
- Data Loss and Manipulation
- Identity Theft
- Disruption of Service

**3 Jenis kerentanan:**

| Tipe | Contoh |
|---|---|
| Technological | Kelemahan TCP/IP, OS, perangkat |
| Configuration | Password lemah, akun default |
| Security Policy | Tidak ada kebijakan/disaster recovery |

**4 Kelas ancaman fisik:** Hardware, Environmental, Electrical, Maintenance.

### 16.2 Network Attacks

**Malware:**
- **Virus** — menyisip ke program lain
- **Worm** — tidak butuh host file, berjalan sendiri
- **Trojan Horse** — terlihat sah, butuh dijalankan user

**3 Kategori serangan:**

1. **Reconnaissance** — pemetaan via `nslookup`, `whois`, ping sweep
2. **Access Attacks** — Password attacks, Trust exploitation, Port redirection, Man-in-the-middle
3. **DoS/DDoS** — DoS dari satu sumber, DDoS dari banyak sumber (botnet/zombies via CnC)

### 16.3 Network Attack Mitigations

**Defense-in-Depth:**

| Komponen | Fungsi |
|---|---|
| VPN | Koneksi aman lewat jaringan publik |
| ASA Firewall | Kontrol traffic masuk/keluar |
| IPS | Deteksi & cegah intrusi |
| ESA/WSA | Keamanan email & web |
| AAA Server | Kontrol akses |

**Backup:** frequency (rutin), storage (offsite), security (password kuat).

**Patch:** download update vendor, aktifkan auto-update.

**AAA:** Authentication (siapa kamu) → Authorization (boleh apa) → Accounting (sudah ngapain).

**Firewall (4 jenis):**

| Tipe | Cara kerja |
|---|---|
| Packet filtering | IP/MAC address |
| Application filtering | Nomor port |
| URL filtering | URL/keyword |
| SPI | Hanya izinkan respons request internal |

**Endpoint Security:** kebijakan tertulis, training, antivirus, host IPS.

### 16.4 Device Security

**Cisco AutoSecure:** ganti default credential, batasi akses, matikan layanan tak perlu, update sebelum dipakai.

**Password kuat:** min 8 karakter (lebih baik 10+), campuran karakter, hindari kata umum, sengaja salah eja (`Security` → `5ecur1ty`), ganti berkala, gunakan passphrase.

**Perintah Cisco:**
```
service password-encryption
security passwords min-length 8
login block-for 120 attempts 3 within 60
exec-timeout 5 30
```

**Enable SSH (6 langkah):**
1. Set hostname
2. Set IP domain name
3. `crypto key generate rsa general-keys modulus 1024`
4. Buat local database username
5. `login local`
6. `transport input ssh`

**Disable Unused Services:** hemat resource, cegah eksploitasi.
- `show ip ports all` (IOS-XE)
- `show control-plane host open-ports` (IOS lama)

---

## Module 17 — Build a Small Network

### 17.1 Devices in a Small Network

- Biasanya 1 koneksi WAN, dikelola 1 teknisi/kontraktor
- **Pemilihan device:** Cost, Speed & port types, Expandability, OS features
- **IP Addressing:** dokumentasikan per tipe perangkat (end user, server, intermediary)
- **Redundancy:** perangkat duplikat + link duplikat
- **QoS Priority Queuing:** High (VoIP) > Medium (SMTP) > Normal (IM) > Low (FTP)

### 17.2 Small Network Applications and Protocols

| Protokol | Fungsi |
|---|---|
| Telnet/SSH | Remote access |
| HTTP/HTTPS | Web |
| SMTP/POP3/IMAP | Email |
| FTP/SFTP | Transfer file |
| DHCP | Konfigurasi IP otomatis |
| DNS | Resolusi nama domain |

Voice/Video: VoIP (murah, fitur terbatas), IP Telephony (dedicated server), butuh QoS + **RTP/RTCP**.

### 17.3 Scale to Larger Networks

Perlu: network documentation, device inventory, budget, traffic analysis.

**Protocol Analysis:** capture traffic saat peak, berbagai segmen, evaluasi sumber/tujuan/tipe.

### 17.4 Verify Connectivity

**Ping** — Layer 3, ICMP Echo (Type 8) / Echo Reply (Type 0). Windows: 4 echo. IOS: 5 echo.

| Simbol IOS | Arti |
|---|---|
| `!` | Sukses |
| `.` | Timeout |
| `U` | Destination unreachable |

**Extended ping** — mode interaktif di privileged EXEC.

**Traceroute** — Windows pakai ICMP, Cisco IOS/Linux pakai UDP port tidak valid. `*` = timeout.

**Network Baseline** — simpan hasil ping/traceroute dengan timestamp sebagai pembanding.

### 17.5 Host and IOS Commands

**Windows:** `ipconfig`, `ipconfig /all`, `/release`, `/renew`, `/displaydns`

**Linux:** `ifconfig`, `ip address`

**macOS:** Network Preferences, `ifconfig`, `networksetup -listallnetworkservices`

**ARP:** `arp -a`, `netsh interface ip delete arpcache`

**IOS Show Commands:**

| Perintah | Fungsi |
|---|---|
| `show running-config` | Konfigurasi berjalan |
| `show interfaces` | Status & error |
| `show ip interface` | Info Layer 3 |
| `show arp` | Host dikenal di LAN |
| `show ip route` | Routing |
| `show protocols` | Protokol aktif |
| `show version` | Memori, interface, lisensi |
| `show cdp neighbors [detail]` | Info perangkat tetangga (CDP) |
| `show ip interface brief` | Ringkasan semua interface |

### 17.6 Troubleshooting Methodologies

**6 Langkah:**
1. Identify the Problem
2. Establish Theory of Probable Causes
3. Test the Theory
4. Establish Plan & Implement Solution
5. Verify & Implement Preventive Measures
6. Document Findings

**Escalate jika:** butuh keputusan manajer, keahlian khusus, atau akses lebih tinggi.

**Debug:** `debug ?`, `no debug <command>`/`undebug`, `undebug all`. Hati-hati output besar.

**Terminal monitor:** `terminal monitor` (tampilkan log di vty), `terminal no monitor`.

### 17.7 Troubleshooting Scenarios

- **Duplex Mismatch** — beda mode duplex antar ujung link → performa buruk meski koneksi tetap ada
- **IP Addressing (IOS)** — cek dengan `show ip interface brief`
- **IP Addressing (end device)** — APIPA (`169.254.0.0/16`) jika DHCP gagal; Linux/macOS tidak pakai APIPA
- **Default Gateway** — cek `ipconfig` (Windows) / `show ip route` (router)
- **DNS** — Cisco OpenDNS: `208.67.222.222` & `208.67.220.220`; cek dengan `ipconfig /all`, `nslookup`

### Istilah & Perintah Module 17

`network applications`, `application layer services`, `extended ping`, `extended traceroute`, `network baseline`, `ifconfig`, `netsh interface ip delete arpcache`, `scientific method`, `debug`, `terminal monitor`

---

*Dokumen ini disusun sebagai rangkuman belajar dari kurikulum Cisco NetAcad ITN v7.0 (Module 9, 12, 13, 14, 16, 17).*

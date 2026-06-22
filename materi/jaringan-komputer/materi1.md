---
title: "Module 9 - Address Resolution"
description: "Memahami ARP (Address Resolution Protocol) dan Neighbor Discovery Protocol dalam jaringan komputer"
order: 1
date: 2026-06-22
---

# Address Resolution Protocol (ARP)

Address Resolution Protocol (ARP) digunakan untuk memetakan alamat **IP (Layer 3)** ke alamat **MAC (Layer 2)** dalam jaringan lokal. Tanpa ARP, perangkat tidak akan bisa mengirimkan frame Ethernet ke tujuan yang tepat.

## Cara Kerja ARP

Proses ARP terdiri dari beberapa langkah utama:

1. **ARP Request** — Host pengirim broadcast ARP request ke seluruh jaringan
2. **ARP Reply** — Host pemilik IP yang dicari membalas dengan MAC address-nya
3. **ARP Cache** — Hasil mapping disimpan sementara di ARP table

### Diagram Proses ARP

```text
Host A (192.168.1.10)                         Host B (192.168.1.20)
     |                                              |
     |--- ARP Request (broadcast) ----------------->|
     |    "Who has 192.168.1.20?"                    |
     |                                              |
     |<-- ARP Reply (unicast) ----------------------|
     |    "192.168.1.20 is at AA:BB:CC:DD:EE:FF"    |
     |                                              |
```

## Perintah ARP di Berbagai OS

### Linux

```bash
# Melihat ARP table
arp -a

# Menambah entri statis
sudo arp -s 192.168.1.100 AA:BB:CC:DD:EE:FF

# Menghapus entri
sudo arp -d 192.168.1.100

# Menggunakan ip neighbor (modern)
ip neigh show
```

### Cisco IOS

```text
! Melihat ARP table pada router Cisco
Router# show arp
Protocol  Address          Age (min)  Hardware Addr   Type   Interface
Internet  192.168.1.1             -   0011.2233.4455  ARPA   GigabitEthernet0/0
Internet  192.168.1.10           5   AABB.CCDD.EEFF  ARPA   GigabitEthernet0/0

! Clear ARP cache
Router# clear arp-cache
```

## ARP Table

Berikut contoh isi ARP table pada sebuah host:

| IP Address     | MAC Address        | Type    | Interface |
|----------------|-------------------|---------|-----------|
| 192.168.1.1    | 00:11:22:33:44:55 | Dynamic | eth0      |
| 192.168.1.10   | AA:BB:CC:DD:EE:FF | Dynamic | eth0      |
| 192.168.1.100  | 11:22:33:44:55:66 | Static  | eth0      |

## Neighbor Discovery Protocol (NDP)

Pada jaringan **IPv6**, fungsi ARP digantikan oleh **Neighbor Discovery Protocol (NDP)**, yang menggunakan pesan **ICMPv6**:

- **Neighbor Solicitation (NS)** — Setara dengan ARP Request
- **Neighbor Advertisement (NA)** — Setara dengan ARP Reply

> **Perbedaan utama**: NDP menggunakan **multicast** (bukan broadcast) sehingga lebih efisien dibanding ARP.

### Contoh Penggunaan di Linux

```bash
# Melihat IPv6 neighbor table
ip -6 neigh show

# Ping untuk trigger NDP
ping6 fe80::1%eth0
```

## Keamanan ARP

ARP memiliki beberapa kerentanan yang perlu diperhatikan:

- **ARP Spoofing** — Penyerang mengirim ARP reply palsu
- **ARP Poisoning** — Meracuni ARP cache korban
- **Man-in-the-Middle** — Menggunakan ARP spoofing untuk menyadap traffic

### Mitigasi

```python
# Contoh deteksi ARP spoofing sederhana dengan Scapy
from scapy.all import *

def detect_arp_spoof(packet):
    if packet.haslayer(ARP) and packet[ARP].op == 2:
        real_mac = getmacbyip(packet[ARP].psrc)
        response_mac = packet[ARP].hwsrc
        if real_mac != response_mac:
            print(f"[!] ARP Spoofing Detected!")
            print(f"    IP: {packet[ARP].psrc}")
            print(f"    Real MAC: {real_mac}")
            print(f"    Fake MAC: {response_mac}")

sniff(filter="arp", prn=detect_arp_spoof, store=0)
```

## Rangkuman

| Fitur | ARP (IPv4) | NDP (IPv6) |
|-------|-----------|-----------|
| Layer | 2/3 | 3 (ICMPv6) |
| Mekanisme | Broadcast | Multicast |
| Keamanan | Rentan spoofing | Lebih aman (SEND) |
| Autoconfiguration | Tidak | Ya (SLAAC) |

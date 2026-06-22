---
title: "Pengantar Kecerdasan Buatan"
description: "Konsep dasar AI, sejarah, dan paradigma utama dalam kecerdasan buatan"
order: 1
date: 2026-06-22
---

# Pengantar Kecerdasan Buatan

**Kecerdasan Buatan (Artificial Intelligence / AI)** adalah cabang ilmu komputer yang berfokus pada pembuatan sistem yang dapat melakukan tugas-tugas yang biasanya membutuhkan kecerdasan manusia.

## Definisi AI

Menurut berbagai tokoh:

> "AI is the science and engineering of making intelligent machines." — **John McCarthy** (1956)

> "AI is the study of how to make computers do things at which, at the moment, people are better." — **Elaine Rich**

## Sejarah Singkat AI

| Tahun | Peristiwa |
|-------|-----------|
| 1950 | Alan Turing mengusulkan **Turing Test** |
| 1956 | Konferensi Dartmouth — istilah "AI" pertama kali digunakan |
| 1966 | ELIZA — chatbot pertama |
| 1997 | Deep Blue mengalahkan Garry Kasparov di catur |
| 2011 | IBM Watson memenangkan Jeopardy! |
| 2016 | AlphaGo mengalahkan Lee Sedol di Go |
| 2022 | ChatGPT diluncurkan — era LLM dimulai |

## Paradigma Utama

### 1. Symbolic AI (Good Old-Fashioned AI)

Menggunakan **aturan logika** dan **representasi simbol** untuk menyelesaikan masalah.

```python
# Contoh sistem pakar sederhana
rules = {
    "demam_tinggi AND batuk": "Kemungkinan Flu",
    "demam_tinggi AND ruam": "Kemungkinan Campak",
    "sakit_kepala AND kaku_leher": "Kemungkinan Meningitis",
}

def diagnose(symptoms: list[str]) -> str:
    symptom_str = " AND ".join(sorted(symptoms))
    return rules.get(symptom_str, "Diagnosis tidak ditemukan")

result = diagnose(["demam_tinggi", "batuk"])
print(result)  # Output: Kemungkinan Flu
```

### 2. Machine Learning

Sistem **belajar dari data** tanpa diprogram secara eksplisit.

```python
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Data training: [suhu, batuk, pilek]
X = np.array([
    [38.5, 1, 1],  # Flu
    [39.0, 0, 0],  # Demam biasa
    [37.0, 1, 1],  # Common cold
    [40.0, 1, 0],  # Flu berat
])
y = ["flu", "demam", "cold", "flu"]

clf = DecisionTreeClassifier()
clf.fit(X, y)

# Prediksi
prediction = clf.predict([[38.0, 1, 1]])
print(f"Diagnosis: {prediction[0]}")
```

### 3. Deep Learning

Menggunakan **neural network** berlapis-lapis untuk mengenali pola kompleks.

```python
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.layer1(x)
        out = self.relu(out)
        out = self.layer2(out)
        return out

# Membuat model
model = SimpleNN(input_size=10, hidden_size=64, num_classes=3)
print(model)
```

## Cabang-Cabang AI

- **Natural Language Processing (NLP)** — Pemrosesan bahasa alami
- **Computer Vision** — Pengolahan dan pemahaman gambar
- **Robotics** — Sistem otonom dan robot
- **Expert Systems** — Sistem berbasis pengetahuan
- **Speech Recognition** — Pengenalan suara

## Turing Test

Turing Test mengukur apakah mesin bisa **meniru perilaku manusia** sehingga penguji tidak bisa membedakan respons mesin dan manusia.

> **Kritik**: Turing Test hanya mengukur imitasi, bukan pemahaman sesungguhnya. Lihat argumen **Chinese Room** oleh John Searle.

## Rangkuman

- AI adalah ilmu membuat mesin yang cerdas
- Tiga paradigma utama: **Symbolic AI**, **Machine Learning**, **Deep Learning**
- AI sudah diterapkan di banyak bidang: NLP, Computer Vision, Robotics
- Perkembangan AI semakin pesat dengan hadirnya model bahasa besar (LLM)

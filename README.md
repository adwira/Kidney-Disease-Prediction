# 🏥 Prediksi Penyakit Ginjal - Kidney Disease Prediction

Aplikasi web berbasis React untuk prediksi awal penyakit ginjal menggunakan teknologi AI (Google Gemini). Aplikasi ini menyediakan analisis prediktif berdasarkan data medis pasien dan memberikan informasi ICD-10 yang relevan.

## 📋 Deskripsi Project

Project ini adalah sistem prediksi penyakit ginjal yang menggunakan:
- **Frontend**: React.js dengan Vite
- **AI Model**: Google Gemini 2.0 Flash
- **Styling**: CSS custom dengan responsive design
- **Routing**: React Router DOM

Aplikasi ini dirancang untuk memberikan **prediksi awal** dan **tidak menggantikan diagnosis dokter**. Hasil yang diberikan merupakan perkiraan berdasarkan data terbatas dan membutuhkan konfirmasi lebih lanjut melalui pemeriksaan medis oleh profesional kesehatan.

## ⚠️ Peringatan Penting

**DISCLAIMER MEDIS:**
- Website ini menyediakan **prediksi awal berbasis AI** dan **TIDAK menggantikan diagnosis dokter**
- Hasil yang diberikan merupakan perkiraan berdasarkan data terbatas
- Konsultasikan hasil ini dengan **dokter spesialis ginjal** untuk evaluasi menyeluruh
- Gunakan hanya sebagai referensi awal, bukan sebagai diagnosis definitif

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn
- Google AI API Key

### Langkah-langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd kidney-disease-prediction
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env` di root directory:
   ```env
   VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

4. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   Aplikasi akan berjalan di `http://localhost:5173`

## 📊 Fitur Utama

### 1. Form Input Data Medis
- **Informasi Umum**: Usia, tekanan darah, berat jenis urin
- **Hasil Laboratorium**: Sel darah merah, sel nanah, gula darah, urea, kreatinin, dll
- **Riwayat Medis**: Hipertensi, diabetes, penyakit jantung koroner
- **Gejala**: Edema pedal, anemia, nafsu makan

### 2. Prediksi AI
- Analisis data menggunakan Google Gemini 2.0 Flash
- Prediksi status penyakit ginjal (positif/negatif)
- Kesimpulan analisis dalam bahasa Indonesia

### 3. Informasi ICD-10
- Kode ICD-10 yang relevan (jika terindikasi penyakit)
- Penjelasan detail kode ICD-10
- Disclaimer medis yang jelas

### 4. Interface Responsif
- Design modern dan user-friendly
- Responsive untuk desktop dan mobile
- Loading states dan error handling

## 🛠️ Scripts yang Tersedia

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Preview build production
npm run preview

# Linting
npm run lint
```

## 📁 Struktur Project

```
kidney-disease-prediction/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── PredictionForm.jsx
│   │   └── PredictionResult.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Main prediction page
│   │   ├── About.jsx      # About page
│   │   └── Contact.jsx    # Contact page
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   │   └── api.js         # AI API integration
│   ├── assets/            # Images and other assets
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── fine-tuning.py         # AI model fine-tuning script
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Konfigurasi

### Environment Variables
Pastikan file `.env` berisi:
```env
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

### Dependencies Utama
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-router-dom`: ^7.5.0
- `@google/genai`: ^0.10.0
- `axios`: ^1.9.0
- `react-icons`: ^5.5.0

## 🎯 Cara Penggunaan

1. **Akses Aplikasi**
   - Buka browser dan akses `http://localhost:5173`
   - Anda akan melihat halaman utama dengan form prediksi

2. **Isi Data Pasien**
   - Lengkapi semua field yang diperlukan
   - Data dibagi menjadi 3 kategori: Informasi Umum, Hasil Laboratorium, dan Riwayat Medis
   - Pastikan data yang dimasukkan akurat

3. **Submit dan Tunggu Hasil**
   - Klik tombol "Prediksi Penyakit Ginjal"
   - Sistem akan memproses data menggunakan AI
   - Hasil akan ditampilkan di sidebar kanan

4. **Interpretasi Hasil**
   - **Status**: Terindikasi Penyakit Ginjal atau Sehat
   - **Kesimpulan**: Analisis detail dalam bahasa Indonesia
   - **ICD-10**: Kode dan penjelasan (jika terindikasi penyakit)
   - **Disclaimer**: Peringatan medis penting

## 🔒 Keamanan dan Privasi

- Data pasien diproses secara real-time dan tidak disimpan
- Menggunakan API Google AI yang aman
- Tidak ada database lokal untuk menyimpan data medis
- Semua komunikasi menggunakan HTTPS

## 🤝 Kontribusi

Untuk berkontribusi pada project ini:

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- Pastikan semua environment variables sudah dikonfigurasi dengan benar

## Lisensi

Project ini dibuat untuk tujuan edukasi dan penelitian. Penggunaan untuk diagnosis medis harus dilakukan dengan hati-hati dan selalu dikonsultasikan dengan profesional kesehatan.

## Acknowledgments

- Google AI untuk menyediakan API Gemini
- React.js community untuk framework yang luar biasa
- Semua kontributor yang telah membantu pengembangan project ini

---

**⚠️ PENTING: Aplikasi ini hanya untuk prediksi awal dan tidak menggantikan diagnosis dokter profesional. Selalu konsultasikan dengan dokter spesialis ginjal untuk evaluasi medis yang menyeluruh.**

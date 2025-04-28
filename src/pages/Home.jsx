// src/pages/Home.jsx
// import { useState } from 'react';
// import PredictionForm from '../components/PredictionForm';
import { predictKidneyDisease } from '../utils/api';

import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import '../styles/result.css'; // Buat file CSS khusus

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await predictKidneyDisease(formData);
      console.log(response);
      
      setResult({
        prediction: response.label === 1 ? 'positive' : 'negative',
        details: {
          kesimpulan: response["Kesimpulan Prediksi"],
          icd10: response["Prediksi Kode ICD-10"]
        }
      });
    } catch (err) {
      setError('Terjadi kesalahan saat memproses prediksi. Silakan coba lagi.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Main Content (Form) */}
      <div className="form-section">
        <PredictionForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {/* Sidebar Result */}
      <div className={`result-sidebar ${result?.prediction || 'default'}`}>
        {!result ? (
          <div className="welcome-message">
            <h2>Selamat Datang</h2>
            <p>
              Sistem prediksi penyakit ginjal menggunakan AI untuk menganalisis data kesehatan Anda.
              Hasil prediksi ini hanya sebagai referensi awal dan tidak menggantikan diagnosis dokter.
            </p>
            <ul>
              <li>Hasil akurat berbasis AI</li>
              <li>Analisis faktor risiko</li>
              <li>Rekomendasi tindakan</li>
            </ul>
          </div>
        ) : (
          <div className="prediction-result">
            <h2>Hasil Prediksi</h2>
            <div className="result-status">
              Status: 
              <span className={result.prediction}>
                {result.prediction === 'positive' ? 'Terindikasi' : 'Sehat'}
              </span>
            </div>
            
            <div className="prediction-details">
              <h3>Kesimpulan:</h3>
              <p>{result.details.kesimpulan}</p>
              
              {result.prediction === 'positive' && result.details.icd10 && (
                <>
                  <h3>Kode ICD-10:</h3>
                  <p>{result.details.icd10}</p>
                </>
              )}
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
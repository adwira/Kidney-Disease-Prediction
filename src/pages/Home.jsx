// src/pages/Home.jsx
// import { useState } from 'react';
// import PredictionForm from '../components/PredictionForm';
import { predictKidneyDisease } from '../utils/api';

import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import '../styles/result.css'; // Buat file CSS khusus
import '../styles/disclaimer.css'; 

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
          <div className="disclaimer-box">
            <h3>Penting: Informasi Diagnosa</h3>
              <p>
              Website ini menyediakan <strong>prediksi awal berbasis AI</strong> dan 
              <strong> tidak menggantikan diagnosis dokter</strong>. Hasil yang diberikan 
              merupakan perkiraan berdasarkan data terbatas dan membutuhkan konfirmasi lebih 
              lanjut melalui pemeriksaan medis oleh profesional kesehatan.
            </p>
            <p>
              Konsultasikan hasil ini dengan <strong>dokter spesialis ginjal</strong> untuk 
              evaluasi menyeluruh dan rencana penanganan yang tepat.
            </p>
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
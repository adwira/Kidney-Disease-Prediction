// src/pages/Home.jsx
// import { useState } from 'react';
// import PredictionForm from '../components/PredictionForm';
import { predictKidneyDisease } from '../utils/api';

import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import Footer from '../components/Footer';
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
          kesimpulan: response.kesimpulan,
          kode_icd10: response.kode_icd10,
          penjelasan_icd10: response.penjelasan_icd10,
          disclaimer: response.disclaimer
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
    <div className="page-wrapper">
      <div className="home-container">
        {/* Main Content (Form) */}
        <div className="form-section">
          <PredictionForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Sidebar Result */}
        <div className={`result-sidebar ${result?.prediction || 'default'}`}>
          {!result ? (
            <div className="disclaimer-box">
              <h3>⚠️ PENTING: Informasi Diagnosa</h3>
              <p className="important-text">
                Website ini menyediakan <strong>prediksi awal berbasis AI</strong> dan 
                <strong> tidak menggantikan diagnosis dokter</strong>.
              </p>
              <p>
                Hasil yang diberikan merupakan perkiraan berdasarkan data terbatas dan 
                membutuhkan konfirmasi lebih lanjut melalui pemeriksaan medis oleh 
                profesional kesehatan.
              </p>
              <p className="important-text">
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
                  {result.prediction === 'positive' ? 'Terindikasi Penyakit Ginjal' : 'Sehat'}
                </span>
              </div>
              
              <div className="prediction-details">
                <section className="result-section">
                  <h3>Kesimpulan Analisis:</h3>
                  <p>{result.details.kesimpulan}</p>
                </section>

                {result.prediction === 'positive' && (
                  <>
                    <section className="result-section">
                      <h3>Kode ICD-10:</h3>
                      <p className="icd-code">{result.details.kode_icd10}</p>
                    </section>

                    <section className="result-section">
                      <h3>Penjelasan ICD-10:</h3>
                      <p>{result.details.penjelasan_icd10}</p>
                    </section>
                  </>
                )}

                <section className="result-section disclaimer-section">
                  <h3>Peringatan Penting:</h3>
                  <p>{result.details.disclaimer}</p>
                </section>
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
      <Footer />
    </div>
  );
};

export default Home;
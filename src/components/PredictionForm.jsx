import { useState } from 'react';
import '../styles/form.css';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    // General Info
    age: '',
    blood_pressure: '',
    specific_gravity: '1.005',
    albumin: '0',
    sugar: '0',
    appetite: 'good',
    
    // Lab Results
    red_blood_cells: 'normal',
    pus_cell: 'normal',
    pus_cell_clumps: 'present',
    bacteria: 'present',
    blood_glucose: '',
    blood_urea: '',
    serum_creatinine: '',
    sodium: '',
    potassium: '',
    hemoglobin: '',
    packed_cell_volume: '',
    white_cell_count: '',
    red_cell_count: '',
    
    // Symptoms & History
    hypertension: 'no',
    diabetes_mellitus: 'no',
    coronary_artery_disease: 'no',
    pedal_edema: 'no',
    anemia: 'no'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const RadioGroup = ({ name, value, options }) => (
    <div className="radio-group">
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option.toLowerCase()}
            checked={value === option.toLowerCase()}
            onChange={handleInputChange}
          />
          {option}
        </label>
      ))}
    </div>
  );

  const renderSelectOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (
      <option key={i} value={start + i}>{start + i}</option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      {/* General Info Section */}
      <div className="form-section">
        <h2>Informasi Umum</h2>
        <div className="input-grid">
          <div className="input-group">
            <label>Usia</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div className="input-group">
            <label>Tekanan Darah (mm Hg)</label>
            <input
              type="number"
              name="blood_pressure"
              value={formData.blood_pressure}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Berat Jenis Urin (mgs/dl)</label>
            <select
              name="specific_gravity"
              value={formData.specific_gravity}
              onChange={handleInputChange}
            >
              {[1.005, 1.010, 1.015, 1.020, 1.025].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Albumin  dalam Urin</label>
            <select
              name="albumin"
              value={formData.albumin}
              onChange={handleInputChange}
            >
              {renderSelectOptions(0, 5)}
            </select>
          </div>

          <div className="input-group">
            <label>Gula dalam Urin (mgs/dl)</label>
            <select
              name="sugar"
              value={formData.sugar}
              onChange={handleInputChange}
            >
              {renderSelectOptions(0, 5)}
            </select>
          </div>

          <div className="input-group">
            <label>Nafsu Makan</label>
            <RadioGroup
              name="appetite"
              value={formData.appetite}
              options={['Baik', 'Buruk']}
            />
          </div>
        </div>
      </div>

      {/* Lab Results Section */}
      <div className="form-section">
        <h2>Hasil Laboratorium</h2>
        <div className="input-grid">
          <div className="input-group">
            <label>Sel Darah Merah</label>
            <RadioGroup
              name="red_blood_cells"
              value={formData.red_blood_cells}
              options={['Normal', 'Abnormal']}
            />
          </div>

          <div className="input-group">
            <label>Sel Nanah</label>
            <RadioGroup
              name="pus_cell"
              value={formData.pus_cell}
              options={['Normal', 'Abnormal']}
            />
          </div>

          <div className="input-group">
            <label>Gumpalan Sel Nanah</label>
            <RadioGroup
              name="pus_cell_clumps"
              value={formData.pus_cell_clumps}
              options={['Ada', 'Tidak Ada']}
            />
          </div>

          <div className="input-group">
            <label>Bakteri</label>
            <RadioGroup
              name="bacteria"
              value={formData.bacteria}
              options={['Ada', 'Tidak Ada']}
            />
          </div>

          <div className="input-group">
            <label>Gula Darah (mgs/dl)</label>
            <input
              type="number"
              name="blood_glucose"
              value={formData.blood_glucose}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Urea Darah (mgs/dl)</label>
            <input
              type="number"
              name="blood_urea"
              value={formData.blood_urea}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Serum Kreatinin (mgs/dl)</label>
            <input
              type="number"
              name="serum_creatinine"
              value={formData.serum_creatinine}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Natrium (mEq/L)</label>
            <input
              type="number"
              name="sodium"
              value={formData.sodium}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Kalium (mEq/L)</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hemoglobin</label>
            <input
              type="number"
              name="hemoglobin"
              value={formData.hemoglobin}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Packed Cell Volume (PCV)</label>
            <input
              type="number"
              name="packed_cell_volume"
              value={formData.packed_cell_volume}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Jumlah Sel Darah Putih (cells/cumm)</label>
            <input
              type="number"
              name="white_cell_count"
              value={formData.white_cell_count}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Jumlah Sel Darah Merah (millions/cmm)</label>
            <input
              type="number"
              name="red_cell_count"
              value={formData.red_cell_count}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Symptoms & History Section */}
      <div className="form-section">
        <h2>Gejala & Riwayat Penyakit</h2>
        <div className="input-grid">
          <div className="input-group">
            <label>Hipertensi</label>
            <RadioGroup
              name="hypertension"
              value={formData.hypertension}
              options={['Ya', 'Tidak']}
            />
          </div>

          <div className="input-group">
            <label>Diabetes Melitus</label>
            <RadioGroup
              name="diabetes_mellitus"
              value={formData.diabetes_mellitus}
              options={['Ya', 'Tidak']}
            />
          </div>

          <div className="input-group">
            <label>Penyakit Arteri Koroner</label>
            <RadioGroup
              name="coronary_artery_disease"
              value={formData.coronary_artery_disease}
              options={['Ya', 'Tidak']}
            />
          </div>

          <div className="input-group">
            <label>Edema Kaki</label>
            <RadioGroup
              name="pedal_edema"
              value={formData.pedal_edema}
              options={['Ya', 'Tidak']}
            />
          </div>

          <div className="input-group">
            <label>Anemia</label>
            <RadioGroup
              name="anemia"
              value={formData.anemia}
              options={['Ya', 'Tidak']}
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        className="predict-button"
      >
        {loading ? 'Memproses...' : 'Prediksi'}
      </button>
    </form>
  );
};

export default PredictionForm;
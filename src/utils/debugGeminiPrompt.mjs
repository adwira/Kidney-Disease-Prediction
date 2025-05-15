import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { predictKidneyDisease } from '../utils/api.js';

const csvPath = 'D:\\data\\Chronic_Kidney_Disease\\testing_datset.csv'; // Pastikan path sesuai

function mapCsvToForm(row) {
  return {
    age: row['Age'],
    blood_pressure: row['BloodPressure'],
    specific_gravity: row['SpecificGravity'] || row[' Specific Gravity'],
    albumin: row['Albumin'],
    sugar: row['Sugar'],
    appetite: row['Appetite'] === '1' ? 'buruk' : 'baik',
    red_blood_cells: row['RedBloodCells'] === '1' ? 'abnormal' : 'normal',
    pus_cell: row['PusCell'] === '1' ? 'abnormal' : 'normal',
    pus_cell_clumps: row['PusCellclumps'] === '1' ? 'ada' : 'tidak ada',
    bacteria: row['Bacteria'] === '1' ? 'ada' : 'tidak ada',
    blood_glucose: row['BloodGlucoseRandom'],
    blood_urea: row['BloodUrea'],
    serum_creatinine: row['SerumCreatinine'],
    sodium: row['Sodium'],
    potassium: row['Potassium'],
    hemoglobin: row['Hemoglobin'],
    packed_cell_volume: row['PackedCellVolume'],
    white_cell_count: row['WhiteBloodCell'] || row['WhiteBloodCellCount'],
    red_cell_count: row['RedBloodCellCount'] || row['RedBloodCel Count'],
    hypertension: row['Hypertension'] === '1' ? 'ya' : 'tidak',
    diabetes_mellitus: row['DiabetesMellitus'] === '1' ? 'ya' : 'tidak',
    coronary_artery_disease: row['CoronaryArteryDisease'] === '1' || row['CoronaryArtery Disease'] === '1' ? 'ya' : 'tidak',
    pedal_edema: row['PedalEdema'] === '1' ? 'ya' : 'tidak',
    anemia: row['Anemia'] === '1' ? 'ya' : 'tidak',
  };
}

const rows = [];
fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (data) => rows.push(data))
  .on('end', async () => {
    if (rows.length === 0) {
      console.log('Data CSV kosong!');
      return;
    }
    // Ambil satu baris data untuk debug
    const row = { ...rows[1] };
    const labelAsli = row.label;
    delete row.label;

    const normalizedRow = mapCsvToForm(row);
    console.log('=== DATA YANG DIKIRIM KE GEMINI (SETELAH MAPPING) ===');
    console.log(normalizedRow);

    try {
      const result = await predictKidneyDisease(normalizedRow);
      console.log('\n=== RESPONSE DARI GEMINI ===');
      console.log(result);
      console.log('\nLabel Asli:', labelAsli);
    } catch (err) {
      console.error('Error saat prediksi:', err);
    }
  });

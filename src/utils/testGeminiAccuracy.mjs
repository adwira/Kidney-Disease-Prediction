import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { predictKidneyDisease } from '../utils/api.js';

const csvPath = 'D:\\data\\Chronic_Kidney_Disease\\testing_datset.csv';
const hasilPrediksiPath = path.resolve('./src/utils/hasilPrediksi.txt');

fs.writeFileSync(hasilPrediksiPath, ''); // Kosongkan file sebelum mulai

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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    let benar = 0;
    let total = 0;
    let prediksiLabels = [];
    for (let i = 0; i < rows.length; i++) {
      const row = { ...rows[i] };
      const labelAsli = row.label;
      delete row.label;
      const normalizedRow = mapCsvToForm(row);
      try {
        const result = await predictKidneyDisease(normalizedRow);
        const predLabel = result.label;
        rows[i].prediksi_gemini = predLabel;
        prediksiLabels.push(predLabel);
        if (String(predLabel) === String(labelAsli)) benar++;
        total++;
        console.log(`Data ke-${i + 1}: Prediksi=${predLabel}, Label Asli=${labelAsli}`);
      } catch (err) {
        rows[i].prediksi_gemini = 'error';
        prediksiLabels.push('error');
        console.error(`Error pada data ke-${i + 1}:`, err.message);
      }
      // Backup label prediksi setiap selesai 1 data
      fs.appendFileSync(hasilPrediksiPath, `${prediksiLabels[prediksiLabels.length-1]}\n`);
      // Delay 2 menit sebelum request berikutnya
      if (i < rows.length - 1) {
        console.log('Menunggu 1.5 menit sebelum request berikutnya...');
        await delay(90000); // 2 menit
      }
    }
    // Tulis ulang ke file CSV yang sama
    const headers = Object.keys(rows[0]).map((key) => ({ id: key, title: key }));
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: headers,
      alwaysQuote: true,
    });
    await csvWriter.writeRecords(rows);
    console.log(`Akurasi: ${(benar / total * 100).toFixed(2)}%`);
    console.log('Hasil prediksi telah disimpan ke file CSV.');
    console.log('Backup label prediksi tersimpan di hasilPrediksi.txt');
  }); 
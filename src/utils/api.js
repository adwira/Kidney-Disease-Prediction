import { GoogleGenAI } from "@google/genai";

console.log('Environment variables:', import.meta.env);
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
console.log('API Key:', API_KEY);

if (!API_KEY) {
    throw new Error('API key tidak ditemukan. Pastikan VITE_GOOGLE_AI_API_KEY sudah diset di .env file');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function predictKidneyDisease(formData) {
    console.log("in thh func");
    try {
        const prompt = `
        Kamu adalah asisten medis berpengalaman.  
        Tugasmu:
        1. Berdasarkan data pasien di bawah ini, prediksi apakah pasien memiliki penyakit ginjal (label 1 = ya, 0 = tidak).  
        2. Jika label = 1, sertakan juga kode ICD-10 yang paling mungkin, beserta penjelasan singkat tentang arti kode itu dan mengapa dipilih (misal: keterbatasan data, stadium, dll).  
        3. Akhiri dengan disclaimer bahwa ini hanya prediksi percobaan dan bukan pengganti diagnosa dokter.

        **Data Pasien (isi numeric atau 0/1 sesuai field):**  
        Age: ${formData.age}  
        BloodPressure: ${formData.blood_pressure}  
        SpecificGravity: ${formData.specific_gravity}  
        Albumin: ${formData.albumin}  
        Sugar: ${formData.sugar}  
        RedBloodCells: ${formData.red_blood_cells === 'normal' ? 0 : 1}  
        PusCell: ${formData.pus_cell === 'normal' ? 0 : 1}  
        PusCellClumps: ${formData.pus_cell_clumps === 'present' ? 1 : 0}  
        Bacteria: ${formData.bacteria === 'present' ? 1 : 0}  
        BloodGlucoseRandom: ${formData.blood_glucose}  
        BloodUrea: ${formData.blood_urea}  
        SerumCreatinine: ${formData.serum_creatinine}  
        Sodium: ${formData.sodium}  
        Potassium: ${formData.potassium}  
        Hemoglobin: ${formData.hemoglobin}  
        PackedCellVolume: ${formData.packed_cell_volume}  
        WhiteBloodCellCount: ${formData.white_cell_count}  
        RedBloodCellCount: ${formData.red_cell_count}  
        Hypertension: ${formData.hypertension === 'yes' ? 1 : 0}  
        DiabetesMellitus: ${formData.diabetes_mellitus === 'yes' ? 1 : 0}  
        CoronaryArteryDisease: ${formData.coronary_artery_disease === 'yes' ? 1 : 0}  
        Appetite: ${formData.appetite === 'good' ? 0 : 1}  
        PedalEdema: ${formData.pedal_edema === 'yes' ? 1 : 0}  
        Anemia: ${formData.anemia === 'yes' ? 1 : 0}

        **Instruksi Format Output (harus JSON, gunakan Bahasa Indonesia):**  
        \`\`\`json
        {
        "label": 0 | 1,
        "kesimpulan": "…",
        "kode_icd10": "…",
        "penjelasan_icd10": "…",
        "disclaimer": "…"
        }
        \`\`\`
        `;

        
        const response = await ai.models.generateContent({
            model: "models/gemini-2.0-flash",
            contents: prompt,
        });
        
        const text = response.text;
        console.log(text);
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Tidak dapat menemukan JSON dalam response');
        }
        const jsonResponse = JSON.parse(jsonMatch[0]);
        
        return jsonResponse;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
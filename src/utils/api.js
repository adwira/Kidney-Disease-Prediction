import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: 'AIzaSyBfbcm4XpeECjZAfDDiA2eMCKsYzk2eZo0' });

export async function predictKidneyDisease(formData) {
    console.log("in thh func");
    try {
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Berdasarkan data pasien berikut, prediksi apakah pasien tersebut memiliki penyakit ginjal (berikan label 1 jika ya, 0 jika tidak): 
        Age: ${formData.age}, 
        BloodPressure: ${formData.blood_pressure}, 
        Specific Gravity: ${formData.specific_gravity}, 
        Albumin: ${formData.albumin}, 
        Sugar: ${formData.sugar}, 
        RedBloodCells: ${formData.red_blood_cells === 'normal' ? 0 : 1}, 
        Pus Cell: ${formData.pus_cell === 'normal' ? 0 : 1}, 
        PusCellclumps: ${formData.pus_cell_clumps === 'present' ? 1 : 0}, 
        Bacteria: ${formData.bacteria === 'present' ? 1 : 0}, 
        BloodGlucoseRandom: ${formData.blood_glucose}, 
        BloodUrea: ${formData.blood_urea}, 
        SerumCreatinine: ${formData.serum_creatinine}, 
        Sodium: ${formData.sodium}, 
        Potassium: ${formData.potassium}, 
        Hemoglobin: ${formData.hemoglobin}, 
        PackedCellVolume: ${formData.packed_cell_volume}, 
        WhiteBloodCell: ${formData.white_cell_count}, 
        RedBloodCel Count: ${formData.red_cell_count}, 
        Hypertension: ${formData.hypertension === 'yes' ? 1 : 0}, 
        DiabetesMellitus: ${formData.diabetes_mellitus === 'yes' ? 1 : 0}, 
        CoronaryArtery Disease: ${formData.coronary_artery_disease === 'yes' ? 1 : 0}, 
        Appetite: ${formData.appetite === 'good' ? 0 : 1}, 
        PedalEdema: ${formData.pedal_edema === 'yes' ? 1 : 0}, 
        Anemia: ${formData.anemia === 'yes' ? 1 : 0}
        
        Jika terprediksi penyakit ginjal (label 1), berikan prediksi kode ICD-10 yang paling mungkin.
        Hasil prediksi hanya sebagai percobaan tidak akan menggantikan diagnosa dokter ahli.
        
        Berikan output/return dalam format JSON seperti ini:
        {
            "label": 1 atau 0,
            "Kesimpulan Prediksi": "",
            "Prediksi Kode ICD-10": "berikan prediksi ICD-10 jika label = 1, dan kosongan bagian ini jika label 0"
        }`;

        // const result = await ai.model.generateContent(prompt);
        const response = await ai.models.generateContent({
            model: "models/gemini-2.0-flash",
            contents: prompt,
        });
        // console.log(response.text);

        // const response = await result.response;
        const text = response.text;
        console.log(text);
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Tidak dapat menemukan JSON dalam response');
        }
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return jsonResponse;
        // Parse JSON response
        // const jsonResponse = JSON.parse(text);
        // return jsonResponse;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
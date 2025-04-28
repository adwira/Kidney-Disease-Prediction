// src/utils/dummyApi.js
export const predictKidneyDisease = async (formData) => {
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      prediction: Math.random() > 0.5 ? 'positive' : 'negative',
      confidence: (Math.random() * 100).toFixed(2),
      message: 'Dummy response: Replace with real API call later.',
      details: formData // Optional: untuk debug input
    };
  };
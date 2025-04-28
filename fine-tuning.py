import json
import google.generativeai as genai
import time

# 1. Inisialisasi client
genai.configure(api_key='AIzaSyBfbcm4XpeECjZAfDDiA2eMCKsYzk2eZo0')

# 2. Load data JSONL ke list of tuples (input, output)
pairs = []
with open("training.jsonl", "r") as f:
    for line in f:
        obj = json.loads(line)
        pairs.append((obj["input"], obj["output"]))

# 3. Buat model
model = genai.GenerativeModel('gemini-pro')

# 4. Fine-tuning
print("Memulai proses fine-tuning...")
for epoch in range(6):
    print(f"\nEpoch {epoch + 1}/6")
    for i, (input_text, output) in enumerate(pairs):
        try:
            # Training
            response = model.generate_content(
                input_text,
                generation_config={
                    "temperature": 0.1,
                    "top_p": 0.8,
                    "top_k": 40,
                }
            )
            
            # Print progress
            if (i + 1) % 10 == 0:
                print(f"Progress: {i + 1}/{len(pairs)} samples")
                
        except Exception as e:
            print(f"Error pada sample {i + 1}: {str(e)}")
            continue
            
    print(f"Epoch {epoch + 1} selesai")

print("\nFine-tuning selesai!")
# SecureScan 🔐🧠

**LIVE DEMO LINK : https://secure-scan-frontend.onrender.com**

SecureScan is a full-stack file security analysis tool that scans uploaded files using VirusTotal API and generates an AI-powered security summary using Google Gemini.

⚠️ File input size restricted to 32mb due to virustotal free tier api limitations

## Screenshot 
<img width="1919" height="1029" alt="Screenshot 2026-10-23 220712" src="https://github.com/user-attachments/assets/6d07183d-726c-46a6-a509-2a26cefe5220" />

<img width="1919" height="1027" alt="Screenshot 2026-10-23 220828" src="https://github.com/user-attachments/assets/6b5f42d2-775d-41a0-a432-07804065b0d1" />


## 🚀 Features

- Upload any file for malware analysis
- Scans using 60+ antivirus engines via VirusTotal API
- Real-time analysis status tracking
- AI-generated security summary (Gemini 2.5 Flash Lite)
- Visual breakdown using doughnut chart
- Vendor-wise detection report

## 🧠 Tech Stack

**Frontend:**
- React.js
- Axios
- Chart.js

**Backend:**
- Node.js
- Express.js
- Multer
- Axios

**APIs:**
- VirusTotal API
- Google Gemini API

## ⚙️ How It Works

1. User uploads a file
2. Backend sends file to VirusTotal API
3. Polling fetches analysis result
4. Result is processed and sent to Gemini AI
5. AI returns a simplified security summary
6. Frontend displays:
   - AI summary
   - Risk chart
   - Vendor breakdown

## 🧪 AI Summary Example

Gemini analyzes:
- malicious count
- suspicious count
- undetected engines

And returns:
- verdict
- explanation
- safety advice

## 📦 Setup

```bash
npm install
npm run dev

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
})

async function generateAISummary(req, res) {
    try {

        console.log("AI ROUTE HIT");
        console.log(req.body);

        const { reportData } = req.body;

        const prompt = `
You are a cybersecurity assistant.

Analyze this VirusTotal scan result and generate a summary based on this:

Malicious: ${reportData.malicious}
Suspicious: ${reportData.suspicious}
Undetected: ${reportData.undetected} 

Provide me a short report summary of 120 words stictly that first contains whether the file is safe, suspicious or malicious 
Then tell me how many number of vendors have said it is safe or malicious 
Then give an advice to the user based on this 
also keep in mind to not use bold,italics, or any special formatting in the summary and do not include headers or titles in the summary. The summary should be concise and easy to understand for a non-technical user.
`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        const response = await result.response;
        const text = response.text();

        res.json({ summary: text }); //sends summary to frontend

    } catch (err) {
        console.log("FULL AI ERROR");
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {
    generateAISummary
};
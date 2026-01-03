const axios = require("axios");

module.exports = async function aiAnalyze(stats) {
    const prompt = `
We are monitoring environmental sensor data.

Average temperature: ${stats.avgTemp.toFixed(2)}
Latest temperature: ${stats.latestTemp.toFixed(2)}
Deviation: ${stats.deviation.toFixed(2)}

Explain briefly whether this deviation could indicate an environmental anomaly.
Do not make decisions, only analysis.
`;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 5000
            }
        );

        return response.data.choices[0].message.content;

    } catch (err) {
        console.error("AI analysis unavailable:", err.response?.data?.error?.message || err.message);

        // Graceful fallback — REQUIRED
        return "AI analysis unavailable (quota or network issue). Rule-based anomaly detected.";
    }
};

const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getGeminiGeneratedQuestion = async (description) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Based on the following job description, generate a technical coding question for a mock interview:\n\n${description}`,
              },
            ],
          },
        ],
      }
    );

    const question = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No question generated';
    return question;
  } catch (err) {
    console.error('❌ Gemini Question Gen Error:', err.response?.data || err.message);
    return 'AI Question Generation Failed';
  }
};

module.exports = getGeminiGeneratedQuestion;

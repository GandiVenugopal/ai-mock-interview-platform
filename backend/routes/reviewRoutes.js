const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { sourceCode, language } = req.body;

  const prompt = `Review this ${language} code and give suggestions:\n\n${sourceCode}`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const feedback = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No feedback.';
    res.json({ feedback });
  } catch (error) {
    console.error('❌ Gemini Review Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Gemini API failed to provide feedback' });
  }
});

module.exports = router;

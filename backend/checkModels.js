const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

const checkModels = async () => {
  try {
    console.log('\n🔍 Checking models in v1beta...');
    const betaRes = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    console.log('v1beta Models:', betaRes.data.models.map(m => m.name));

    console.log('\n🔍 Checking models in v1...');
    const v1Res = await axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
    console.log('v1 Models:', v1Res.data.models.map(m => m.name));
  } catch (err) {
    console.error('❌ Error fetching models:', err.response?.data || err.message);
  }
};

checkModels();

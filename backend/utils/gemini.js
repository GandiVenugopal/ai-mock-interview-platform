// const axios = require('axios');

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// const getGeminiReview = async (sourceCode) => {
//   try {
//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + GEMINI_API_KEY,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Please review the following code and provide detailed feedback:\n\n${sourceCode}`,
//               },
//             ],
//           },
//         ],
//       }
//     );

//     const feedback = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No feedback available';
//     return feedback;
//   } catch (err) {
//     console.error('❌ Gemini Review Error:', err.response?.data || err.message);
//     return 'AI Review Failed';
//   }
// };

// module.exports = getGeminiReview;


// // utils/gemini.js
// const generateTestCases = async (question) => {
//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Generate 2 simple test cases in JSON format for the following coding problem:\n\n${question}\n\nExample format:\n[\n  { "input": "2 3", "expectedOutput": "5" },\n  { "input": "10 20", "expectedOutput": "30" }\n]`,
//                 },
//               ],
//             },
//           ],
//         }
//       );
  
//       const raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//       return JSON.parse(raw); // Expecting valid JSON format
//     } catch (err) {
//       console.error('❌ Test Case Generation Error:', err.message);
//       return [];
//     }
//   };
//   module.exports = { getGeminiReview, generateTestCases };
  
//   const generateTestCases = async (question, language) => {
//   try {
//     const prompt = `Generate a few test cases for this coding problem:\n\n${question}\nLanguage: ${language}`;
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }],
//           },
//         ],
//       }
//     );

//     const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//     return output || 'No test cases generated.';
//   } catch (err) {
//     console.error('❌ Gemini Test Case Error:', err.response?.data || err.message);
//     return 'Test case generation failed.';
//   }
// };

// module.exports = { getGeminiReview, generateTestCases };

//---------------------------
// backend/utils/gemini.js
const axios = require('axios');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getGeminiReview = async (sourceCode) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Please review the following code and provide detailed feedback:\n\n${sourceCode}`,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No feedback available';
  } catch (err) {
    console.error('❌ Gemini Review Error:', err.response?.data || err.message);
    return 'AI Review Failed';
  }
};

// 🧪 Add this function to generate test cases
const generateTestCases = async (question) => {
  try {
    const prompt = `Generate 2-3 test cases (with input and expected output) for this coding question:\n\n${question}\n\nReturn the test cases in JSON format like this:\n\n[\n  { "input": "2 3", "expectedOutput": "5" },\n  { "input": "10 20", "expectedOutput": "30" }\n]`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const jsonString = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('❌ Test Case Generation Error:', err.response?.data || err.message);
    return [];
  }
};

module.exports = { getGeminiReview, generateTestCases };

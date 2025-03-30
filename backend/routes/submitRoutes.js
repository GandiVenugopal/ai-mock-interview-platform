const express = require('express');
const router = express.Router();
const axios = require('axios');
const Interview = require('../models/Interview');
const Job = require('../models/Job');
const { getGeminiReview, generateTestCases } = require('../utils/gemini');

// Judge0 Language IDs
const languageMap = {
  Python: 71,
  JavaScript: 63,
  Java: 62,
};

router.post('/', async (req, res) => {
  const { interviewId, sourceCode, language } = req.body;

  try {
    const languageId = languageMap[language];
    if (!languageId) {
      return res.status(400).json({ message: 'Unsupported language' });
    }

    // 🛠 Fetch the interview
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // 🛠 Fetch the job using interview.jobId
    const job = await Job.findById(interview.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Start Judge0 & Gemini in parallel
    const judge0Promise = axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: sourceCode,
        language_id: languageId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': '9a30de90dbmsh94b77af67e59f15p1edeaejsnbbaa2b8b3550',
        },
      }
    );

    const geminiPromise = getGeminiReview(sourceCode);
    const testCasesPromise = generateTestCases(job.question || '');

    const [response, feedback, testCases] = await Promise.all([
      judge0Promise,
      geminiPromise,
      testCasesPromise,
    ]);

    const result = response.data;

    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        userCode: sourceCode,
        result:
          result?.stdout ||
          result?.stderr ||
          result?.compile_output ||
          result?.message ||
          'No output',
      },
      { new: true }
    );

    res.json({
      message: 'Code submitted and evaluated',
      output: updatedInterview.result,
      status: result.status?.description || 'Unknown',
      interview: updatedInterview,
      feedback,
      testCases,
    });
  } catch (err) {
    console.error('❌ Judge0 submission failed:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    res.status(500).json({ message: 'Failed to submit code' });
  }
});

module.exports = router;


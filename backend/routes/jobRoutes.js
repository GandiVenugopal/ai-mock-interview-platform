const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const getGeminiGeneratedQuestion = require('../utils/geminiQuestionGen');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/generate-question/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 💡 ADD THIS to skip if question already exists unless forced
    if (job.question && !req.query.force) {
      return res.status(200).json({ message: '⏩ Skipping (already has question): ' + job.title });
    }

    const prompt = `Based on this job description, generate a coding question:\n\n${job.description}`;
    const question = await getGeminiQuestion(prompt);

    job.question = question;
    await job.save();

    res.status(200).json({ message: 'AI-generated question updated', question });
  } catch (err) {
    console.error('❌ Error generating question:', err.message);
    res.status(500).json({ message: 'Failed to generate question' });
  }
});
module.exports = router;


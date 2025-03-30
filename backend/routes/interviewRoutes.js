const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const Job = require('../models/Job');

// Start a mock interview
router.post('/', async (req, res) => {
  console.log('/api/interviews POST endpoint hit');
  console.log('Request body:', req.body);

  const { jobId, language } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const interview = new Interview({
      jobId,
      language,
      userCode: ''
    });

    console.log('📦 Saving interview:', interview);

    await interview.save();

    res.status(201).json({
      message: 'Mock interview started',
      interviewId: interview._id,
      job,
    });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

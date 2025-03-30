const mongoose = require('mongoose');
const Job = require('./models/Job');
const getGeminiGeneratedQuestion = require('./utils/geminiQuestionGen');
require('dotenv').config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const jobs = await Job.find({});

    for (const job of jobs) {
      if (!job.question || job.question.trim() === '') {
        const prompt = `Based on this job description, generate a coding question:\n\n${job.description}`;
        const question = await getGeminiGeneratedQuestion(prompt);
        job.question = question;
        await job.save();
        console.log(`Updated question for: ${job.title}`);
      } else {
        console.log(`Skipping (already has question): ${job.title}`);
      }
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Failed to update questions:', err.message);
  }
};

run();

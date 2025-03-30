// seedJobs.js
const mongoose = require('mongoose');
const Job = require('./models/Job');
require('dotenv').config();

// Sample job entries
const jobs = [
  {
    title: 'Frontend Developer',
    description: 'Build responsive UIs using React.js.',
    question: 'Write a React component that fetches and displays user data from an API.',
    difficulty: 'Medium'
  },
  {
    title: 'Backend Developer',
    description: 'Develop scalable APIs using Node.js and Express.',
    question: 'Implement an Express.js route that returns the current server time.',
    difficulty: 'Easy'
  },
  {
    title: 'Data Scientist',
    description: 'Work on ML models and data pipelines.',
    question: 'Write a Python function to calculate the mean, median, and mode of a list of numbers.',
    difficulty: 'Medium'
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage CI/CD pipelines and cloud infrastructure.',
    question: 'Write a shell script to check if Docker is installed and running.',
    difficulty: 'Hard'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Job.deleteMany();
    await Job.insertMany(jobs);
    console.log('Job data inserted!');
    mongoose.disconnect();
  } catch (err) {
    console.log('Connecting to MongoDB:', process.env.MONGO_URI);

    console.error(' Error seeding DB:', err.message);
  }
};

seedDB();

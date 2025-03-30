const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  userCode: {
    type: String,
    default: '' 
  },
  language: {
    type: String,
    enum: ['Python', 'Java', 'JavaScript'],
    required: true,
  },
  result: {
    type: String,
    default: 'Pending',
  },
});

const Interview = mongoose.model('Interview', interviewSchema, 'interviewmock');
module.exports = Interview;

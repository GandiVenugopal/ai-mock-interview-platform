require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
const submitRoutes=require('./routes/submitRoutes');
//require('dotenv').config();
const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/review', reviewRoutes);
app.use('/api/submit', submitRoutes);
app.use('/api/interviews', interviewRoutes);

//  MOUNT THE ROUTE
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes); // <-- THIS IS IMPORTANT

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.listen(6500, () => {
  console.log(' Server running on port 6500');
});


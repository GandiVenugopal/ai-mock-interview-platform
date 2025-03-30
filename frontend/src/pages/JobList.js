import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:6500/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleStartInterview = (jobId) => {
    navigate(`/interview/${jobId}`);
  };

  return (
    <div className="job-list-container">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => handleStartInterview(job._id)}>
                Start Mock Interview
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;


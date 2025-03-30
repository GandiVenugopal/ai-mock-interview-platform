import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import '../App.css';

const languageOptions = {
  Python: python(),
  JavaScript: javascript(),
  Java: java(),
};

const InterviewPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [interviewId, setInterviewId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadInterview = async () => {
      try {
        const jobRes = await axios.get(`http://localhost:6500/api/jobs/${jobId}`);
        setJob(jobRes.data);

        const interviewRes = await axios.post('http://localhost:6500/api/interviews', {
          jobId,
          language,
        });

        setInterviewId(interviewRes.data.interviewId);
      } catch (err) {
        console.error('Error fetching job or starting interview:', err);
      }
    };

    loadInterview();
  }, [jobId, language]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:6500/api/submit', {
        interviewId,
        language,
        sourceCode: code,
      });

      setOutput(res.data.output);
      setStatus(res.data.status);
      setFeedback(res.data.feedback);
      console.log(res.data.output);
    } catch (err) {
      console.error('❌ Submission error:', err.message);
      setOutput('❌ Failed to submit code');
    }
    finally {
        setLoading(false);
      }
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <h2>{job?.title || 'Loading job...'}</h2>
        <p><strong>Description:</strong> {job?.description || 'Fetching description...'}</p>
        <p><strong>Question:</strong> {job?.question || 'Fetching question...'}</p>
        <p><strong>Difficulty:</strong> {job?.difficulty}</p>

      </div>

      <div className="right-panel">
        <div className="lang-select">
          <label>Select Language: </label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {Object.keys(languageOptions).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <CodeMirror
          value={code}
          height="300px"
          theme="light"
          extensions={[languageOptions[language]]}
          onChange={(value) => setCode(value)}
        />
        
        <button onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Code'}</button>

        <div className="output">
        <h4> Output: </h4>
        <pre>{output}</pre>

        </div>
        <div className="ai-feedback">
             <h4>AI Feedback:</h4>
             <pre>{feedback}</pre>
             
        </div>

      </div>
    </div>
  );
};

export default InterviewPage;

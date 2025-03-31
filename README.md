# 💼 AI-Powered Mock Interview Platform (Gemini AI -powered code review & suggestion)


An intelligent full-stack web platform that simulates real-world coding interviews. Users can select jobs and take mock interviews with LeetCode-style questions, an in-browser code editor, multi-language support, and AI-powered code review.

Live Links:
ai-mock-interview-platform-phi.vercel.app
mock.jobrecommender.online

### ☁️ Infrastructure
- AWS EC2 (Ubuntu) for backend
- Vercel for frontend
- GitHub Actions (CI/CD pipeline)
- BigRock DNS + custom domain
- PM2 (production process manager)

## How It Works

1. **User selects a job**
2. Clicks "Start Mock Interview"
3. The system loads a coding problem related to the job
4. User writes and submits code
5. Judge0 executes the code and returns output
6. Gemini AI reviews the code and gives improvement suggestions + alternative solutions
7. Results and feedback are saved in MongoDB

##  Features

- 🧾 Job Listings UI (static API or job DB)
- 👨‍💻 Mock interview with code editor (LeetCode-style)
- 🗂️ Language selection (Python, JavaScript, Java, etc.)
- 🧠 Gemini-powered code AI review & suggestions
- 🧪 Judge0-powered live code execution
- 🔐 Secure backend with HTTPS (via Nginx + SSL on EC2)
- 🔄 Auto-deploy backend via GitHub Actions


### Backend
- Node.js + Express.js
- MongoDB (via MongoDB Atlas)
- Judge0 API (via RapidAPI)
- Gemini API (AI code review & test case generation)

### Frontend
- React.js
- TailwindCSS
- Axios

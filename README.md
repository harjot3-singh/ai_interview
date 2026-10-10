# 🚀 AI Interview Simulator & Resume Analyzer

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google)

A full-stack application that leverages **Google Gemini AI** to empower job seekers. Upload your resume, provide a job description, and get a personalized, AI-generated interview report detailing your match score, tailored interview questions, skill gaps, and a customized preparation plan.

---

## ✨ Features

- **🔒 Secure Authentication:** User registration, login, and protected routes using JWT stored in HTTP-only cookies.
- **📄 Resume Parsing:** Extracts text seamlessly from uploaded PDF resumes.
- **🧠 AI-Powered Insights:** 
  - **Match Score:** Quantifies how well your resume aligns with the target job description.
  - **Tailored Questions:** Generates technical and behavioral questions specific to your profile and the role, complete with the intention behind each question and an expected ideal answer.
  - **Skill Gap Analysis:** Identifies missing skills with severity levels to help you focus your learning.
  - **Preparation Plan:** Provides a day-by-day actionable plan to ace your upcoming interview.
- **🎨 Modern UI:** A beautiful, responsive interface built with React and SCSS.
- **📑 Resume PDF Generation:** Dynamically generate and export tailored resumes.

---

## 🛠️ Technology Stack

### **Frontend**
- **React 19 & Vite:** Fast, modern frontend framework and build tool.
- **React Router:** For seamless single-page application navigation.
- **Axios:** For handling API requests with credentials.
- **SCSS:** For modular and scalable styling.

### **Backend**
- **Node.js & Express.js:** Robust and scalable server environment.
- **MongoDB & Mongoose:** NoSQL database for flexible data modeling (Users, Interview Reports).
- **Google GenAI SDK:** Integration with the `gemini-2.5-flash` model for structured JSON outputs.
- **Authentication:** `jsonwebtoken` for stateless auth and `bcrypt` for secure password hashing.
- **Utilities:** `multer` (file handling), `pdf-parse` (PDF text extraction), `puppeteer` (HTML to PDF generation), `zod` (schema validation).

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/harjot3-singh/ai_interview.git
cd ai_interview
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### 3. Install Dependencies
You need to install dependencies for both the frontend and backend.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 4. Start the Application
You can run both servers simultaneously.

**Start Backend Server (Runs on port 3000):**
```bash
cd backend
node server.js
```

**Start Frontend Development Server (Runs on port 5173):**
```bash
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
ai_interview/
├── backend/
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # API Logic
│   │   ├── middlewares/ # Auth & File handling (Multer)
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # Express routes
│   │   └── services/    # Gemini AI integrations
│   ├── .env             # Backend secrets
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static assets
    ├── src/
    │   ├── features/    # Feature-based modules (auth, interview)
    │   │   ├── auth/    # Auth contexts, hooks, pages, styles
    │   │   └── interview/ # Interview contexts, pages, API services
    │   ├── App.jsx      # Main application component
    │   ├── main.jsx     # Vite entry point
    │   └── app.routes.jsx # React Router configuration
    └── vite.config.js   # Vite configuration
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is open source and available under the [MIT License](LICENSE).

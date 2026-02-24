# 🚀 DevFlow AI

DevFlow AI is a full-stack AI-powered chat application that helps users with **coding, studying, interviews, and content writing**.  
It supports **authentication, persistent chat sessions, streaming AI responses**, and a modern responsive UI.

🔗 **Live Demo**: https://dev-flow-ai-six.vercel.app  
🔗 **Backend API**: https://devflow-ai-1-7qjl.onrender.com  

---

## ✨ Features

- 🔐 **Authentication**
  - User registration & login
  - Secure JWT authentication via **HTTP-only cookies**
- 💬 **AI Chat**
  - Streaming AI responses (real-time)
  - Multiple assistant modes:
    - Coding Assistant
    - Study Tutor
    - Interview Coach
    - Content Writer
- 🗂️ **Chat Sessions**
  - Create multiple chat sessions
  - Auto-save messages per session
  - Dynamic session titles
- 🎨 **Modern UI**
  - Dark mode support
  - Animated UI with Framer Motion
  - Markdown + syntax-highlighted code blocks
- ☁️ **Deployed & Scalable**
  - Frontend on **Vercel**
  - Backend on **Render**
  - MongoDB for persistence

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios & Fetch API
- Framer Motion
- React Markdown
- Prism Syntax Highlighter

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cookie-based auth
- CORS configured for production

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 📂 Project Structure

### Backend
backend/
├── index.js
├── routes/
│ ├── auth.js
│ ├── sessions.js
│ ├── ai.js
│ └── contact.js
├── models/
│ └── User.js
├── middleware/
│ └── authMiddleware.js
└── .env

### Fronten
frontend/
├── src/
│ ├── pages/
│ │ └── Dashboard.jsx
│ ├── api/
│ │ └── axios.js
│ └── main.jsx
├── .env
└── vite.config.js


---

## 🔐 Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
VITE_API_URL=https://devflow-ai-1-7qjl.onrender.com

👨‍💻 Author

Nitin
Student | Full-Stack Developer
Built with ❤️ to learn and grow

⭐ If you like this project

Give it a star ⭐ and feel free to fork or contribute!

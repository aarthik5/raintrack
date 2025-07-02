# 🌧️ RainTrack - Rainfall Logger App

RainTrack is a full-stack rainfall logging and monitoring application where users can record, view, edit, and delete rain data (in cm or inches). It features secure user authentication, a responsive dashboard, and an admin panel.

## 📦 Project Structure

rain/
├── rain-api/               # Backend - Node.js, Express, MongoDB
└── raintrack-frontend/     # Frontend - React.js, Tailwind CSS

---

## ✨ Features

- 🔐 User signup & login (JWT-based authentication)
- 🌧️ Add rainfall data with units (cm/inch)
- 📆 Timestamped history of past rain records
- ✏️ Edit & 🗑️ delete individual records
- 👋 Logout confirmation modal
- ⚡ Responsive and clean UI (Tailwind CSS)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (with Hooks)
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/raintrack.git
cd rain


⸻

2. Setup Backend

cd rain-api
npm install

Create a .env file inside rain-api/:

PORT=5500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend:

npm start


⸻

3. Setup Frontend

cd ../raintrack-frontend
npm install
npm run dev

App will run on: http://localhost:5173

⸻

🧠 Future Enhancements (Ideas)
	•	Admin dashboard to manage all user records
	•	Export rainfall data to CSV
	•	Graphical analysis of rainfall trends (D3.js / Chart.js)
	•	Dark mode toggle

⸻

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

⸻

📄 License

This project is open-source under the MIT License.

⸻

🙌 Acknowledgements

Developed by Aarthik

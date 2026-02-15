🚀 ConvertLite
===========

A simple, fast, and privacy-focused online file converter.

ConvertLite allows users to convert and compress files directly in the browser without complicated workflows, accounts, or ads.

## ✨ Features
- 🔄 **PNG → JPG**
- 🔄 **JPG → PNG**
- 🔄 **PNG → WEBP**
- 🗜 **Image Compression**
- ⚡ **Fast processing**
- 🔒 **Privacy-first** (files auto-deleted)
- 📱 **Responsive UI**

## 🛠 Tech Stack
### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- Multer
- Sharp (image processing)

### Hosting
- Vercel (Frontend)
- Render / VPS (Backend)

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AdityaGowda/convertlite.git
cd convertlite
```

### 2️⃣ Install Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: [http://localhost:3000](http://localhost:3000)

### 3️⃣ Install Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: [http://localhost:5000](http://localhost:5000)

## 🔐 Environment Variables
Create `.env` file in `backend`:
```env
PORT=5000
```
*(If using cloud storage or payments, add relevant keys.)*

## 🧠 How It Works
1. User selects a tool
2. Uploads a file
3. Backend processes file using Sharp
4. File is returned for download
5. Temporary files are deleted automatically

## 💡 Why ConvertLite?
Most online converters are:
- Overloaded with ads
- Require signups
- Complicated interfaces

ConvertLite focuses on:
- ✔ **Simplicity**
- ✔ **Speed**
- ✔ **Clean UI**
- ✔ **Privacy**

## ☕ Support
If this project helps you, consider supporting development:
👉 [Buy Me A Coffee](https://buymeacoffee.com/adithya_m_r)

Your support helps keep the servers running and motivates future improvements.

## 📌 Roadmap
- [ ] Add more PDF tools
- [ ] Add global payment integration
- [ ] Improve performance optimization
- [ ] Add user usage tracking
- [ ] Add Docker support

## 📄 License
MIT License

## 👨‍💻 Author
Built with ❤️ by [Adithya](https://github.com/AdityaGowda)
Passionate about building practical tools and learning new technologies.    
# 📄 CV Analyzer

The **CV Analyzer** is an AI-powered web application that analyzes resumes and CVs in multiple formats (**PDF, DOCX, XLSX**).  
It extracts key details, validates content, and provides structured insights using the **Google Gemini API**.  

With secure **user authentication**, a modern UI (**EJS + TailwindCSS**), and robust **file handling via Multer**, the platform ensures a seamless and user-friendly experience for resume analysis.

---

## 🚀 Features

### 🔐 User Authentication
- Register and log in with email and password.  
- Passwords securely hashed with **bcrypt**.  
- **JWT-based authentication** stored in HTTP-only cookies.  
- Middleware (`protect`, `checkUser`) to protect routes and manage session state.  

### 📂 File Upload System
- Supports **PDF, DOCX, XLSX** file uploads (max 5MB).  
- Drag-and-drop and click-to-upload functionality.  
- File validation and error handling with **Multer**.  

### 🎨 Modern UI
- Built with **EJS templates** and **TailwindCSS**.  
- Responsive, clean, and user-friendly design.  
- Real-time feedback for upload success/error messages.  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, Mongoose, JWT  
- **Frontend:** EJS, TailwindCSS  
- **Database:** MongoDB  
- **File Handling:** Multer  
- **AI Processing:** Google Gemini API  
- **Other Libraries:** `pdfjs-dist`, `mammoth`, `bcrypt`  

---



# 📄 CV Analyzer

The **CV Analyzer** is an AI-powered web application that analyzes resumes and CVs in multiple formats (**PDF, DOCX, XLSX**).  
It extracts key details, validates content, and provides structured insights using the **Google Gemini API**.  

With secure **user authentication**, a modern UI (**EJS + TailwindCSS**), and robust **file handling via Multer**, the platform ensures a seamless and user-friendly experience for resume analysis.

---

## 🚀 Features

### 🔐 User Authentication
- Register and log in with email and password.  
- Passwords securely hashed with **bcrypt**.  
- **JWT-based authentication** stored in HTTP-only cookies.  
- Middleware (`protect`, `checkUser`) to protect routes and manage session state.  

### 📂 File Upload System
- Supports **PDF, DOCX, XLSX** file uploads (max 5MB).  
- Drag-and-drop and click-to-upload functionality.  
- File validation and error handling with **Multer**.  

### 🎨 Modern UI
- Built with **EJS templates** and **TailwindCSS**.  
- Responsive, clean, and user-friendly design.  
- Real-time feedback for upload success/error messages.  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, Mongoose, JWT  
- **Frontend:** EJS, TailwindCSS  
- **Database:** MongoDB  
- **File Handling:** Multer  
- **AI Processing:** Google Gemini API  
- **Other Libraries:** `pdfjs-dist`, `mammoth`, `bcrypt`  

---

## ⚙️ Environment Variables

Create a `.env` file in the project root and add:

```env
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
GEMINI_API_KEY=your_google_gemini_api_key  


## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/advait2711/cv_analyzer.git
cd cv_analyzer

# Install dependencies
npm install

# Create .env file with required variables
# See Environment Variables section above

# Start the server
npm run dev  # For development
npm start    # For production
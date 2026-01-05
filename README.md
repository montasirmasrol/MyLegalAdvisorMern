# My Legal Advisor - MERN Stack Application

A comprehensive legal consultation platform connecting users with professional lawyers for appointments, consultations, and legal advice.

## 🚀 Features

- **User Authentication** - Firebase-based authentication (Email/Password, Google Sign-In)
- **Role-Based Access** - User, Lawyer, and Admin roles
- **Lawyer Profiles** - Comprehensive lawyer profiles with ratings and experience
- **Appointment Booking** - Free, Online, and Offline consultation bookings
- **Blog System** - Create, approve, and manage legal blogs
- **Contact Form** - Direct email communication with admin
- **Rating System** - Rate lawyers based on experience
- **Dashboard** - Separate dashboards for Users, Lawyers, and Admins

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** v20.x LTS (⚠️ **Important**: v22 has SSL compatibility issues with MongoDB)
- **npm** or **yarn**
- **MongoDB Atlas Account** (Free tier works)
- **Firebase Project** (Free tier works)
- **ImgBB API Key** (Free)
- **Gmail Account** (for email notifications)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd My-Legal-Advisor-main
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file in backend folder:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=mylegaladvisor

# Email Configuration (Gmail)
TRANSPORTER_EMAIL=your_email@gmail.com
TRANSPORTER_PASS=your_app_specific_password

# Server Configuration
PORT=3000
```

**Important Notes:**
- For `TRANSPORTER_PASS`, use [Gmail App Password](https://support.google.com/accounts/answer/185833), not your regular password
- Never commit `.env` file to Git

### 3. Frontend Setup

```bash
cd frontend/lawace-client-main
npm install
```

#### Create `.env.local` file in `frontend/lawace-client-main` folder:

```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_project.firebasestorage.app
VITE_MESSAGINGSENDERID=your_sender_id
VITE_APPID=your_app_id
VITE_MEASUREMENTID=your_measurement_id

# Image Upload API
VITE_IMGBB_API_KEY=your_imgbb_api_key

# Backend API URL
VITE_AXIOS_API=http://localhost:3000
```

---

## 🔥 Firebase Setup Guide

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "mylegaladvisormern")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** authentication:
   - Toggle on "Email/Password"
   - Save
4. Enable **Google** authentication:
   - Toggle on "Google"
   - Enter support email
   - Save

### Step 3: Register Web App

1. In Project Overview, click the **Web icon** (</>)
2. Enter app nickname (e.g., "Legal Advisor Web")
3. Don't check "Firebase Hosting" (optional)
4. Click "Register App"
5. Copy the `firebaseConfig` object

### Step 4: Get Firebase Credentials

From the config object, copy these values to your `.env.local`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // → VITE_APIKEY
  authDomain: "project.firebase...", // → VITE_AUTHDOMAIN
  projectId: "mylegaladvisor...",    // → VITE_PROJECTID
  storageBucket: "project.firebase...", // → VITE_STORAGEBUCKET
  messagingSenderId: "123456...",    // → VITE_MESSAGINGSENDERID
  appId: "1:123456...",             // → VITE_APPID
  measurementId: "G-ABC123..."      // → VITE_MEASUREMENTID (optional)
};
```

### Step 5: Verify Firebase Connection

Run the frontend and check the browser console:
```bash
cd frontend/lawace-client-main
npm run dev
```

✅ **Success**: No Firebase errors in console  
❌ **Error**: "Firebase configuration missing required keys" → Check your `.env.local`

---

## 🗄️ MongoDB Setup Guide

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a **Free Tier** cluster (M0)
4. Choose a cloud provider and region (closest to you)
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Create Database User

1. Click **Database Access** in left sidebar
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `montasir_db_user` (or your choice)
5. Auto-generate secure password (save it!)
6. Set role: **Read and write to any database**
7. Click "Add User"

### Step 3: Configure Network Access

1. Click **Network Access** in left sidebar
2. Click "Add IP Address"
3. Choose one:
   - **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **For Production**: Add your specific IP address
4. Click "Confirm"

### Step 4: Get Connection String

1. Click **Database** in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: **Node.js**, Version: **6.7 or later**
5. Copy the connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. Replace:
   - `<username>` with your database username
   - `<password>` with your database password (not the Atlas account password!)

### Step 5: Configure Backend

Paste the connection string in `backend/.env`:

```env
MONGODB_URI=mongodb+srv://montasir_db_user:YourPassword123@cluster0.qoin3nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Step 6: Create Database and Collections

MongoDB will automatically create the database and collections when the app runs for the first time. The required collections are:

- `users` - User accounts
- `lawyers` - Lawyer profiles
- `blogs` - Blog posts
- `appointments` - Appointment bookings
- `comments` - Blog comments
- `ratings` - Lawyer ratings

### Step 7: Verify MongoDB Connection

Run the test script:

```bash
cd backend
node test-connection.js
```

**Expected Output:**
```
✅ MongoDB connected successfully!
✅ MongoDB ping successful!
✅ Database 'mylegaladvisor' accessible!
✅ Found X collections:
   - users
   - lawyers
   - blogs
   ...
```

**Common Errors and Solutions:**

| Error | Solution |
|-------|----------|
| `MongoServerError: bad auth` | Check username/password in connection string |
| `MongoNetworkError: connection timed out` | Check Network Access whitelist in Atlas |
| `SSL routines: tlsv1 alert internal error` | Use Node.js v20 instead of v22: `nvm install 20 && nvm use 20` |
| `ENOTFOUND` | Check internet connection and cluster URL |

---

## 📧 Email Setup (Gmail)

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: "Legal Advisor App"
5. Click "Generate"
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Backend

Add to `backend/.env`:

```env
TRANSPORTER_EMAIL=your_email@gmail.com
TRANSPORTER_PASS=abcdefghijklmnop  # No spaces!
```

---

## 🖼️ ImgBB API Setup

### Step 1: Create Account

1. Go to [ImgBB](https://imgbb.com/)
2. Sign up for free account

### Step 2: Get API Key

1. Go to [API Settings](https://api.imgbb.com/)
2. Copy your API key

### Step 3: Configure Frontend

Add to `frontend/lawace-client-main/.env.local`:

```env
VITE_IMGBB_API_KEY=your_imgbb_api_key_here
```

---

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

✅ **Success Output:**
```
✅ Successfully connected to MongoDB!
✅ MongoDB ping successful!
✅ Using database: mylegaladvisor
✅ All collections initialized successfully!
My My Legal Advisor app is listening on port: 3000
```

### Start Frontend Development Server

```bash
cd frontend/lawace-client-main
npm run dev
```

✅ **Success Output:**
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 🧪 Testing the Application

### 1. Test User Registration

1. Go to http://localhost:5173
2. Click "Join Us" → Register
3. Fill form:
   - Name: Test User
   - Upload photo
   - Role: **User**
   - Email: testuser@example.com
   - Password: Test123!
4. Click "Register"
5. ✅ Should redirect to homepage with user logged in

### 2. Test Lawyer Registration

1. Register another account with Role: **Lawyer**
2. ✅ Lawyer should appear in "Expert Lawyers" page
3. Login as lawyer
4. Go to Dashboard → Update Lawyer Profile
5. Fill out complete profile
6. ✅ Profile should be updated

### 3. Test Contact Form

1. Go to homepage → Contact Us section
2. Fill form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 123456789
   - Message: Test message
3. Click "Submit Now"
4. ✅ Should show success message
5. ✅ Check `TRANSPORTER_EMAIL` inbox for email

### 4. Test Appointment Booking

1. Go to Expert Lawyers → Click a lawyer
2. Click "Request Appointment"
3. Fill form:
   - Choose consultation type
   - Enter subject and message
   - Upload documents (optional)
4. Click "Send Request"
5. ✅ Should show success message
6. ✅ Lawyer can see appointment in Dashboard

### 5. Test Blog Creation

1. Go to All Blogs page
2. Click "Create Blog +"
3. Fill form:
   - Blog Title
   - Upload Image
   - Description
4. Click "Post Blog"
5. ✅ Blog created (pending admin approval)
6. Login as admin → Dashboard → Blogs
7. Click "Approve" on the blog
8. ✅ Blog now visible on All Blogs page

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem**: `SSL routines: tlsv1 alert internal error`

**Solution**:
```bash
# Downgrade to Node.js v20 LTS
nvm install 20.11.0
nvm use 20.11.0

# Verify version
node --version  # Should show v20.x.x

# Reinstall dependencies
cd backend
npm install

# Try again
npm run dev
```

### Firebase Authentication Not Working

**Check**:
1. Browser console for errors
2. Firebase Console → Authentication → Sign-in method (Email/Password enabled?)
3. `.env.local` file exists and has correct values
4. Restart dev server after changing `.env.local`

### Contact Form Not Sending Emails

**Check**:
1. Gmail App Password created correctly (16 characters, no spaces)
2. 2-Factor Authentication enabled on Gmail
3. `TRANSPORTER_EMAIL` and `TRANSPORTER_PASS` in `backend/.env`
4. Backend server running without errors
5. Check spam folder in recipient email

### Images Not Uploading

**Check**:
1. `VITE_IMGBB_API_KEY` in `frontend/.env.local`
2. ImgBB API key is valid
3. Image size < 32MB
4. Internet connection working

### "Cannot connect to backend" Error

**Check**:
1. Backend server running on port 3000
2. `VITE_AXIOS_API=http://localhost:3000` in `frontend/.env.local`
3. No CORS errors in browser console
4. Firewall not blocking port 3000

---

## 📁 Project Structure

```
My-Legal-Advisor-main/
├── backend/
│   ├── .env                    # Backend environment variables
│   ├── index.js                # Main server file
│   ├── test-connection.js      # Connection testing script
│   ├── package.json
│   └── uploads/                # File uploads directory
│       └── documents/
│
└── frontend/
    └── lawace-client-main/
        ├── .env.local          # Frontend environment variables
        ├── src/
        │   ├── Authentication/
        │   │   └── firebase.config.js
        │   ├── Components/
        │   ├── Hooks/
        │   ├── Pages/
        │   ├── Routes/
        │   └── Utils/
        ├── package.json
        └── vite.config.js
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` or `.env.local` files to Git**
2. **Use App Passwords for Gmail, not your regular password**
3. **Restrict MongoDB Network Access in production**
4. **Use environment variables for all sensitive data**
5. **Enable Firebase security rules in production**
6. **Keep dependencies updated**: `npm audit fix`

---

## 🚢 Deployment Guide

### Backend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. In backend folder: `vercel`
3. Add environment variables in Vercel dashboard
4. Update `VITE_AXIOS_API` in frontend to deployed URL

### Frontend (Vercel/Netlify)

1. Build: `npm run build`
2. Deploy `dist` folder
3. Add environment variables in hosting dashboard
4. Update Firebase authorized domains

---

## 📝 Environment Variables Checklist

### Backend `.env`
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `MONGODB_DB` - Database name (mylegaladvisor)
- [ ] `TRANSPORTER_EMAIL` - Gmail address
- [ ] `TRANSPORTER_PASS` - Gmail app password
- [ ] `PORT` - Server port (3000)

### Frontend `.env.local`
- [ ] `VITE_APIKEY` - Firebase API key
- [ ] `VITE_AUTHDOMAIN` - Firebase auth domain
- [ ] `VITE_PROJECTID` - Firebase project ID
- [ ] `VITE_STORAGEBUCKET` - Firebase storage bucket
- [ ] `VITE_MESSAGINGSENDERID` - Firebase messaging sender ID
- [ ] `VITE_APPID` - Firebase app ID
- [ ] `VITE_IMGBB_API_KEY` - ImgBB API key
- [ ] `VITE_AXIOS_API` - Backend URL (http://localhost:3000)

---

## 🆘 Support

If you encounter issues:

1. Check this README thoroughly
2. Run `node test-connection.js` in backend
3. Check browser console for errors
4. Check backend terminal for errors
5. Verify all environment variables are set correctly

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

Developed as a MERN stack legal consultation platform.

---

## ⚡ Quick Start Checklist

- [ ] Node.js v20 installed
- [ ] MongoDB Atlas cluster created
- [ ] Firebase project created
- [ ] Gmail app password generated
- [ ] ImgBB API key obtained
- [ ] Backend `.env` file created and configured
- [ ] Frontend `.env.local` file created and configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Connection test passed (`node test-connection.js`)
- [ ] Backend server running (`npm run dev`)
- [ ] Frontend server running (`npm run dev`)
- [ ] Application accessible at http://localhost:5173

**🎉 Once all checkboxes are complete, your application is ready to use!**

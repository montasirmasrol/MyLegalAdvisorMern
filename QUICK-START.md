# Quick Setup Guide - My Legal Advisor

## 🚨 CRITICAL: Fix Node.js Version FIRST!

**Your current Node.js version (v22.12.0) has SSL issues with MongoDB!**

### Fix NOW:
```powershell
# Option 1: Run the fix script
.\fix-node-version.ps1

# Option 2: Manual NVM installation
# Download NVM: https://github.com/coreybutler/nvm-windows/releases
nvm install 20.11.0
nvm use 20.11.0

# Verify
node --version  # Should show v20.x.x
```

**After fixing Node version, close ALL terminals and open new ones!**

---

## ⚡ 5-Minute Setup

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend/lawace-client-main
npm install
```

### 2. Configure Environment Variables

**Backend: Create `backend/.env`**
```env
MONGODB_URI=mongodb+srv://montasir_db_user:LgAwwrXaOyJuXmqV@cluster0.qoin3nb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=mylegaladvisor
TRANSPORTER_EMAIL=montasir.masrol@gmail.com
TRANSPORTER_PASS=idcw tqov akda eqhd
PORT=3000
```

**Frontend: Create `frontend/lawace-client-main/.env.local`**
```env
VITE_APIKEY=AIzaSyBUcbfVwFqgaqDKglOc11IW9YxzI0BW7AE
VITE_AUTHDOMAIN=mylegaladvisormern.firebaseapp.com
VITE_PROJECTID=mylegaladvisormern
VITE_STORAGEBUCKET=mylegaladvisormern.firebasestorage.app
VITE_MESSAGINGSENDERID=359872000974
VITE_APPID=1:359872000974:web:2376657c2ace9e3ede719f
VITE_MEASUREMENTID=G-NLE8G7D9L9
VITE_IMGBB_API_KEY=bd314e0bdc3b739a985d342e8d55db6e
VITE_AXIOS_API=http://localhost:3000
```

### 3. Test Connection

```bash
cd backend
node test-connection.js
```

**Expected:**
```
✅ MongoDB connected successfully!
✅ MongoDB ping successful!
✅ All tests passed!
```

**If it fails with SSL error:**
- You MUST fix Node.js version (see top of this file)
- OR change connection string temporarily (not recommended)

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/lawace-client-main
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## ✅ Verify Everything Works

### Test 1: Firebase Authentication
1. Go to http://localhost:5173
2. Click "Join Us"
3. Register a new account
4. ✅ Should log you in automatically

### Test 2: Contact Form
1. Scroll to Contact Us section
2. Fill and submit form
3. ✅ Should show "Message sent successfully!"
4. ✅ Check email: montasir.masrol@gmail.com

### Test 3: Lawyer Registration
1. Register new account with Role: "Lawyer"
2. Go to "Expert Lawyers" page
3. ✅ Should see your lawyer profile
4. Login and go to Dashboard → Update Lawyer Profile
5. Fill complete profile
6. ✅ Profile updated successfully

### Test 4: Blog Creation
1. Go to "All Blogs" page
2. Click "Create Blog +"
3. Fill form and submit
4. ✅ Blog created (pending approval)

### Test 5: Appointment Booking
1. Go to Expert Lawyers → Click any lawyer
2. Click "Request Appointment"
3. Fill form and submit
4. ✅ Appointment created successfully

---

## 🔧 Common Issues

### Issue: "Cannot connect to MongoDB"
**Fix**: 
1. Run `.\fix-node-version.ps1`
2. Downgrade to Node.js v20
3. Restart terminal
4. Run `node test-connection.js`

### Issue: "Contact form not working"
**Fix**:
- Verify `TRANSPORTER_EMAIL` and `TRANSPORTER_PASS` in `backend/.env`
- Check backend terminal for errors
- Ensure Gmail App Password is correct (no spaces!)

### Issue: "Cannot connect to backend"
**Fix**:
- Ensure backend is running on port 3000
- Check `VITE_AXIOS_API=http://localhost:3000` in frontend `.env.local`
- Restart both servers

### Issue: "Firebase authentication not working"
**Fix**:
- Check browser console for errors
- Verify all Firebase env variables in `.env.local`
- Restart frontend server after changing `.env.local`

### Issue: "Images not uploading"
**Fix**:
- Verify `VITE_IMGBB_API_KEY` in `.env.local`
- Check internet connection
- Image must be < 32MB

---

## 📞 Need Help?

1. ✅ Read the full [README.md](README.md)
2. ✅ Run `node test-connection.js` to diagnose issues
3. ✅ Check browser console for errors
4. ✅ Check backend terminal for errors
5. ✅ Verify all environment variables are set correctly

---

## 🎯 Summary

**If you followed all steps:**
- ✅ Node.js v20 installed
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Connection test passed
- ✅ Both servers running
- ✅ Application accessible at http://localhost:5173

**🎉 Your app should be fully functional!**

If not, review the Common Issues section above or check the full README.md for detailed troubleshooting.

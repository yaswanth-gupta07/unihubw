# Quick Setup Guide

## Step 1: Setup MongoDB (Choose One Option)

### Option A: MongoDB Atlas (Cloud - Recommended) ⭐
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string (see `backend/MONGODB_ATLAS_SETUP.md` for detailed guide)
4. Your connection string will look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB
Install MongoDB locally on your system.

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Step 2: Setup Backend

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in backend folder:
   
   **For MongoDB Atlas (Online):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority
   NODE_ENV=development
   ```
   Replace `your_username`, `your_password`, and `cluster0.xxxxx.mongodb.net` with your actual Atlas credentials.
   
   **For Local MongoDB:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/unihub
   NODE_ENV=development
   ```
   
   **Important:** The `.env` file is required! Copy your MongoDB connection string here.

4. Start backend server:
   ```bash
   npm run dev
   ```

   You should see: `🚀 Server running on port 5000`

## Step 3: Setup Frontend

1. Open `frontend/config.js` and verify API URL:
   ```javascript
   BASE_URL: 'http://localhost:5000/api'
   ```

2. Open `frontend/index.html` in your browser or use a local server:
   ```bash
   cd frontend
   python -m http.server 8000
   ```

3. Visit: `http://localhost:8000`

## Step 4: Test the Application

1. Click "Join UniHub Community" button
2. Fill out the form
3. Submit the form
4. Check MongoDB database - you should see the submission saved!

## Viewing Data in MongoDB

**Using MongoDB Compass:**
- Connect to: `mongodb://localhost:27017`
- Database: `unihub`
- Collection: `applications`

**Using MongoDB Shell:**
```bash
mongosh
use unihub
db.applications.find().pretty()
```

## Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify PORT 5000 is not in use
- Check `.env` file exists

**Form submission fails:**
- Check browser console for errors
- Verify backend is running on port 5000
- Check CORS settings in backend

**MongoDB connection error:**
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify MongoDB is accessible on port 27017
- **Authentication Error ("bad auth"):**
  - If MongoDB doesn't require auth, use: `mongodb://127.0.0.1:27017/unihub`
  - If MongoDB has auth enabled, add credentials: `mongodb://user:pass@127.0.0.1:27017/unihub`
  - To disable auth temporarily (local dev only):
    1. Open MongoDB config file (usually `mongod.cfg`)
    2. Comment out or remove `security:` section
    3. Restart MongoDB service


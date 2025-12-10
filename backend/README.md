# UniHub Backend API

Backend server for UniHub website using Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string if needed
   - Default MongoDB URI: `mongodb://localhost:27017/unihub`

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default port: 27017

4. **Run the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

5. **API Endpoints**
   - `POST /api/applications/submit` - Submit application form
   - `GET /api/applications/all` - Get all applications
   - `GET /api/applications/:id` - Get single application
   - `GET /api/health` - Health check

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)


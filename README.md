# UniHub Website - Full Stack Application

A complete full-stack application for UniHub campus ecosystem with frontend and backend separation.

## Project Structure

```
UNIHUB WEBSITE/
├── frontend/          # Frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── config.js
├── backend/          # Backend API (Node.js, Express, MongoDB)
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the backend folder
   - Copy from `.env.example` and update:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/unihub
     NODE_ENV=development
     ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default: `mongodb://localhost:27017`

5. **Run the backend server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Update API configuration**
   - Open `config.js`
   - Update `BASE_URL` if your backend runs on a different port or URL
   - Default: `http://localhost:5000/api`

3. **Open the website**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server -p 8000
     ```

## API Endpoints

### Submit Application
- **POST** `/api/applications/submit`
- **Body**: JSON with form data
- **Response**: Success/Error message

### Get All Applications (Admin)
- **GET** `/api/applications/all`
- **Response**: Array of all applications

### Get Single Application
- **GET** `/api/applications/:id`
- **Response**: Single application object

### Health Check
- **GET** `/api/health`
- **Response**: API status

## Features

- ✅ Form submission with real-time database storage
- ✅ MongoDB integration
- ✅ RESTful API
- ✅ Error handling
- ✅ Responsive design
- ✅ Modern UI/UX

## Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Development

- Backend runs on: `http://localhost:5000`
- Frontend can be served on any port (default: 8000)
- Make sure CORS is enabled in backend (already configured)

## Notes

- Form submissions are saved to MongoDB database
- Each submission includes timestamp
- Duplicate email submissions are prevented
- All form fields are validated


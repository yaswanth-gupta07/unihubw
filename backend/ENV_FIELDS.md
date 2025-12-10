# .env File Required Fields

## Required Fields (Must Have)

### 1. MONGODB_URI ⚠️ REQUIRED
**Description:** Your MongoDB connection string

**For MongoDB Atlas (Online):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/unihub
```

**Important:**
- Replace `username` and `password` with your actual credentials
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- Add `/unihub` before the `?` (this is the database name)
- If password has special characters, URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

**What happens if missing:** Server will exit with error message

---

## Optional Fields (Have Defaults)

### 2. PORT (Optional)
**Description:** Port number for the backend server

**Default:** `5000`

**Example:**
```env
PORT=5000
```

**What happens if missing:** Server will use port 5000

---

### 3. NODE_ENV (Optional)
**Description:** Environment mode (development/production)

**Default:** Not set (will be undefined)

**Example:**
```env
NODE_ENV=development
```

**What happens if missing:** No impact, but recommended to set

---

## Complete .env File Example

Create a file named `.env` in the `backend` folder:

```env
# REQUIRED: MongoDB Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority

# OPTIONAL: Server Port (default: 5000)
PORT=5000

# OPTIONAL: Environment (development/production)
NODE_ENV=development
```

---

## Quick Checklist

- [ ] Create `.env` file in `backend` folder
- [ ] Add `MONGODB_URI` with your MongoDB connection string
- [ ] (Optional) Add `PORT` if you want a different port
- [ ] (Optional) Add `NODE_ENV` for environment setting
- [ ] Make sure `.env` is in `.gitignore` (already configured)

---

## Notes

- The `.env` file should be in the `backend` folder, not the root folder
- Never commit `.env` file to git (it contains sensitive credentials)
- The `.env` file is already in `.gitignore` for security


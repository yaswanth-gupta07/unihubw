# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account (or sign in if you have one)
3. Create a free cluster (M0 - Free tier)

## Step 2: Get Your Connection String

1. **Click "Connect" on your cluster**

2. **Choose "Connect your application"**

3. **Copy the connection string**
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **Important:** Replace `<username>` and `<password>` with your actual credentials

4. **Add database name**
   - Add `/unihub` before the `?` in the connection string
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority`

## Step 3: Configure Database Access

1. **Go to "Database Access" in left sidebar**
2. **Create a database user:**
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

## Step 4: Configure Network Access

1. **Go to "Network Access" in left sidebar**
2. **Add IP Address:**
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

## Step 5: Update Your .env File

Create or update `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/unihub?retryWrites=true&w=majority
NODE_ENV=development
```

**Important:**
- Replace `your_username` with your database username
- Replace `your_password` with your database password
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- Make sure password doesn't contain special characters that need URL encoding (or encode them)

## Step 6: Test Connection

1. Start your backend:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   📊 Database: unihub
   ```

## Troubleshooting

**"Authentication failed" error:**
- Double-check username and password in connection string
- Make sure you replaced `<username>` and `<password>` placeholders
- Verify database user exists in "Database Access"

**"IP not whitelisted" error:**
- Go to "Network Access" and add your IP (or 0.0.0.0/0 for all)

**Connection timeout:**
- Check your internet connection
- Verify cluster is running (not paused)
- Check firewall settings

**Special characters in password:**
- If password has special characters like `@`, `#`, `%`, encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - Or change password to avoid special characters

## Example Connection String Format

```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/unihub?retryWrites=true&w=majority
```

Where:
- `myuser` = your database username
- `mypassword123` = your database password
- `cluster0.abc123.mongodb.net` = your cluster URL
- `unihub` = database name


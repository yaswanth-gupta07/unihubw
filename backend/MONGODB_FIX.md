# Fix MongoDB Authentication Error

## Problem
You're seeing: `Error: bad auth : authentication failed`

## Solutions

### Solution 1: Use IP Address Instead of localhost (Recommended)
Update your `.env` file:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/unihub
```

### Solution 2: Disable MongoDB Authentication (Local Development Only)

**Windows:**
1. Open MongoDB config file (usually at `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`)
2. Find the `security:` section
3. Comment it out or remove it:
   ```yaml
   # security:
   #   authorization: enabled
   ```
4. Restart MongoDB service:
   ```powershell
   net stop MongoDB
   net start MongoDB
   ```

**Mac/Linux:**
1. Open MongoDB config: `/etc/mongod.conf` or `/usr/local/etc/mongod.conf`
2. Comment out security section:
   ```yaml
   # security:
   #   authorization: enabled
   ```
3. Restart MongoDB:
   ```bash
   sudo systemctl restart mongod
   # or
   brew services restart mongodb-community
   ```

### Solution 3: Use MongoDB with Authentication
If you need to keep authentication enabled, update `.env`:
```env
MONGODB_URI=mongodb://your_username:your_password@127.0.0.1:27017/unihub
```

### Solution 4: Use MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unihub
```

### Solution 5: Check MongoDB Status
Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## Quick Test
After fixing, restart your backend server:
```bash
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: 127.0.0.1`


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Get MongoDB URI from environment variable (Render uses MONGO_URI)
        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('❌ MONGO_URI or MONGODB_URI is not set in environment variables');
            console.error('💡 Please add your MongoDB connection string to .env file or Render environment variables');
            console.error('   Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unihub');
            process.exit(1);
        }
        
        // Modern mongoose connection (no deprecated options needed in mongoose 6+)
        const conn = await mongoose.connect(mongoURI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        
        // Provide helpful error messages
        if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
            console.error('\n💡 Authentication Error Solutions:');
            console.error('1. Check your MongoDB connection string in environment variables');
            console.error('2. Verify username and password are correct');
            console.error('3. For MongoDB Atlas:');
            console.error('   - Make sure IP address is whitelisted (0.0.0.0/0 for all)');
            console.error('   - Check database user credentials');
            console.error('   - Verify connection string format: mongodb+srv://user:pass@cluster.mongodb.net/dbname');
            console.error('4. Replace <password> in connection string with actual password\n');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('\n💡 Network Error:');
            console.error('1. Check your internet connection');
            console.error('2. Verify MongoDB Atlas cluster is running');
            console.error('3. Check if connection string is correct\n');
        }
        
        process.exit(1);
    }
};

module.exports = connectDB;


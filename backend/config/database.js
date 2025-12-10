const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Get MongoDB URI from environment variable (required for online MongoDB)
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('❌ MONGODB_URI is not set in .env file');
            console.error('💡 Please add your MongoDB connection string to backend/.env file');
            console.error('   Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unihub');
            process.exit(1);
        }
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        
        // Provide helpful error messages
        if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
            console.error('\n💡 Authentication Error Solutions:');
            console.error('1. Check your MongoDB connection string in .env file');
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


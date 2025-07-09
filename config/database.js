const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', conn.connection.host);
    console.log('Database Name:', conn.connection.name);
    console.log('Connection State:', conn.connection.readyState);
    
    // List existing collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
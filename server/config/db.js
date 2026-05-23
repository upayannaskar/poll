import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // We use process.env to access the MongoDB URI defined in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with a failure code (1) if the connection fails
    process.exit(1); 
  }
};

export default connectDB;
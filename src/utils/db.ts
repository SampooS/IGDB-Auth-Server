/**
 * `mongoConnect` Function
 *
 * A function that establishes a connection to a MongoDB database using Mongoose.
 *
 * @returns A Promise that resolves to the database connection object.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from a .env file (if available)
dotenv.config();

const mongoConnect = async () => {
  try {
    // Connect to the MongoDB database using the DATABASE_URL from the environment variables.
    const connection = await mongoose.connect(
      process.env.DATABASE_URL as string
    );

    // Log a success message when the database connection is established.
    console.log('DB connected successfully');

    // Return the database connection object.
    return connection;
  } catch (error) {
    // Handle any errors that occur during the connection process.
    console.error('DB connection failed:', error);

    // Re-throw the error to propagate it to the calling code.
    throw error;
  }
};

export default mongoConnect;

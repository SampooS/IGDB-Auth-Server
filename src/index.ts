import app from './app';
import mongoConnect from './utils/db';

/**
 * Get the port from the environment variables or use a default port (3000).
 */
const port = process.env.PORT || 3000;

/**
 * Start the Express application and connect to the MongoDB database.
 */
(async () => {
  try {
    // Connect to the MongoDB database using the mongoConnect function.
    await mongoConnect();

    // Start the Express server and listen on the specified port.
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    // Handle any errors that occur during server startup.
    console.log('Server error', (error as Error).message);
  }
})();

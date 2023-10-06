/**
 * Import required packages and modules.
 */
require('dotenv').config(); // Load environment variables from a .env file
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

/**
 * Create an Express application instance.
 */
const app = express();

/**
 * Middleware Setup
 */

// Logging middleware using Morgan with 'dev' format
app.use(morgan('dev'));

// Helmet middleware for enhancing security headers
app.use(helmet());

// CORS middleware for handling Cross-Origin Resource Sharing
app.use(cors());

// JSON request body parsing middleware
app.use(express.json());

/**
 * Define Routes
 */

// Root route for displaying a welcome message
app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});

// Mount the API routes under the '/api/v1' path
app.use('/api/v1', api);

/**
 * Error Handling Middleware
 */

// Middleware for handling 404 (Not Found) errors
app.use(notFound);

// Middleware for handling other errors and returning appropriate responses
app.use(errorHandler);

/**
 * Export the Express application as the default export.
 */
export default app;

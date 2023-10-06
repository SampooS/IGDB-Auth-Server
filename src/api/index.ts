import express from 'express';

import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import MessageResponse from '../interfaces/MessageResponse';
/**
 * Create an Express router.
 */
const router = express.Router();

/**
 * Define routes for the main entry point.
 */

// Route for the main entry point
router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: users, auth',
  });
});

/**
 * Use the authRoute and userRoute modules for specific paths.
 */
router.use('/auth', authRoute); // Use the authRoute module for paths starting with '/auth'
router.use('/users', userRoute); // Use the userRoute module for paths starting with '/users'

/**
 * Export the router as a module export.
 */
export default router;

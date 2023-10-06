import express from 'express';
import {loginPost} from '../controllers/authController';
/**
 * Create an Express router.
 */
const router = express.Router();

/**
 * Define a POST route for user login.
 * When a POST request is made to '/login', the loginPost function from the authController will handle it.
 */
router.post('/login', loginPost);

/**
 * Export the router as a module export.
 */
export default router;

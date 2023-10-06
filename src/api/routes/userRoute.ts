import express from 'express';
import {
  check,
  checkToken,
  userDelete,
  userGet,
  userListGet,
  userPost,
  userPut,
  userDeleteAsAdmin,
  userPutAsAdmin,
} from '../controllers/userController';
import {authenticate} from '../../middlewares';

/**
 * Create an Express router.
 */
const router = express.Router();

/**
 * Define routes for user-related operations.
 */

// Route for handling user list, creation, update, and deletion
router
  .route('/')
  .get(userListGet) // GET - Retrieve a list of users
  .post(userPost) // POST - Create a new user
  .put(authenticate, userPut) // PUT - Update a user (requires authentication)
  .delete(authenticate, userDelete); // DELETE - Delete a user (requires authentication)

// Route for checking authentication token
router.get('/token', authenticate, checkToken); // GET - Check the validity of the authentication token

// Route for a simple server check
router.route('/check').get(check); // GET - Perform a server check

// Route for handling individual user retrieval, deletion, and update (admin only)
router
  .route('/:id')
  .get(userGet) // GET - Retrieve a specific user by ID
  .delete(authenticate, userDeleteAsAdmin) // DELETE - Delete a user as an admin (requires authentication and admin role)
  .put(authenticate, userPutAsAdmin); // PUT - Update a user as an admin (requires authentication and admin role)

/**
 * Export the router as a module export.
 */
export default router;

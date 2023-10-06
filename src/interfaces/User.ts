import {Document} from 'mongoose';
/**
 * User Interface
 *
 * An interface representing a user document in the database.
 */
interface User extends Document {
  /**
   * The URL of the user's profile image.
   */
  profile_image: string;

  /**
   * The user's username.
   */
  user_name: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's role, which can be 'user' or 'admin'.
   */
  role: 'user' | 'admin';

  /**
   * The hashed password of the user.
   */
  password: string;

  /**
   * An optional array of the user's favorite games.
   */
  favourite_games?: string[];
}

/**
 * OutputUser Interface
 *
 * An interface representing a simplified user object typically used in responses.
 */
interface OutputUser {
  /**
   * The unique identifier of the user (optional).
   */
  id?: string;

  /**
   * The user's username.
   */
  user_name: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * An array of the user's favorite games.
   */
  favourite_games: string[];

  /**
   * The URL of the user's profile image (optional).
   */
  profile_image?: string;
}

/**
 * Export the User and OutputUser interfaces for use in other modules.
 */
export {User, OutputUser};

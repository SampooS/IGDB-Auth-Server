import {OutputUser} from './User';

/**
 * DBMessageResponse Interface
 *
 * An interface representing a response message from a database operation.
 */
export default interface DBMessageResponse {
  /**
   * A descriptive message related to the database operation.
   */
  message: string;

  /**
   * The user or an array of users associated with the database operation.
   * It can be of type OutputUser (a single user) or OutputUser[] (an array of users).
   */
  user: OutputUser | OutputUser[];
}

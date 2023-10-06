import {OutputUser} from './User';

/**
 * LoginMessageResponse Interface
 *
 * An interface representing a response message for user login.
 */
export default interface LoginMessageResponse {
  /**
   * A JSON Web Token (JWT) associated with a successful login.
   */
  token: string;

  /**
   * A descriptive message related to the login status or outcome.
   */
  message: string;

  /**
   * The user associated with the successful login, represented as an OutputUser.
   */
  user: OutputUser;
}

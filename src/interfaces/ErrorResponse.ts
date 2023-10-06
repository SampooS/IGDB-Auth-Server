import MessageResponse from './MessageResponse';
/**
 * ErrorResponse Interface
 *
 * An interface representing an error response, extending the MessageResponse interface.
 */
export default interface ErrorResponse extends MessageResponse {
  /**
   * A stack trace associated with the error (optional).
   */
  stack?: string;
}

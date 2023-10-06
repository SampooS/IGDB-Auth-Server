/**
 * MessageResponse Interface
 *
 * An interface representing a response message with an optional ID.
 */
export default interface MessageResponse {
  /**
   * A descriptive message related to the response.
   */
  message: string;

  /**
   * An optional ID associated with the response (typically a number).
   */
  id?: number;
}

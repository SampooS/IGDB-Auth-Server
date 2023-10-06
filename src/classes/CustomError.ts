/**
 * CustomError Class
 *
 * A custom error class that extends the built-in Error class to include an HTTP status code.
 */
export default class CustomError extends Error {
  /**
   * HTTP status code associated with the error (default is 400 - Bad Request).
   */
  status = 400;

  /**
   * Constructor for the CustomError class.
   *
   * @param message - A descriptive error message.
   * @param status - The HTTP status code associated with the error (default is 400).
   */
  constructor(message: string, status: number) {
    // Call the parent class constructor with the error message.
    super(message);

    // Set the status property to the provided status code.
    this.status = status;

    // Ensure that the object's prototype is set to CustomError's prototype.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

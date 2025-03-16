class HttpError extends Error {
  public statusCode: number;
  public errors: object[];
  public isOperational: boolean;
  public success: boolean = false;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: object[] = [],
    isOperational: boolean = true,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    // Restore the prototype chain to ensure instanceof works correctly
    Object.setPrototypeOf(this, new.target.prototype);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default HttpError;

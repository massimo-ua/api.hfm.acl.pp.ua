class ApiError extends Error {
  constructor (message, status) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

class InternalError extends ApiError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}
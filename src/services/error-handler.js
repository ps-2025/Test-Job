// services/error-handler.js
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data.message || 'An error occurred with the server';
    throw new ApiError(message, error.response.status);
  } else if (error.request) {
    // Request made but no response received
    throw new ApiError('Unable to connect to the server', 503);
  } else {
    // Error in request setup
    throw new ApiError('Failed to make request', 400);
  }
};
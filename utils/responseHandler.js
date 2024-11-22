/**
 * Responds with the specified message and status code.
 * @param {Object} res - The response object from Express or serverless handler.
 * @param {string} message - The response message to send.
 * @param {number} statusCode - The HTTP status code to send (default is 200).
 */
function handleResponse(res, message, statusCode = 200) {
    res.status(statusCode).json({
      message: message,
    });
}

export default handleResponse;
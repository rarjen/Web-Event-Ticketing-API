const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode bad request
    this.statuscode = StatusCodes.BAD_REQUEST; // properti di dlm constructor
  }
}

module.exports = BadRequest;

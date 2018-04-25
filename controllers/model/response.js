'use strict';

class Response {

  constructor(status, statusText, errors, result) {
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
    this.result = result;
  }
}

module.exports = Response;

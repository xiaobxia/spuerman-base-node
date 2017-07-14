/**
 * Created by xiaobxia on 2017/6/30.
 */
module.exports = class BaseResult {
  constructor() {
    this.success = true;
  }

  setResult(result) {
    this.result = result;
  }

  getResult() {
    return this.result;
  }

  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }

  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }
};

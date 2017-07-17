/**
 * Created by xiaobxia on 2017/7/3.
 */
function baseError(errorMsg, errorCode) {
  let error = new Error(errorMsg)
  error.code = errorCode;
  error.type = 'user';
  return error;
}
function parameterError(errorMsg, errorCode) {
  let error = new Error(errorMsg)
  error.code = errorCode;
  error.type = 'parameter';
  return error;
}
exports.baseError = baseError;
exports.parameterError = parameterError;

/**
 * Created by xiaobxia on 2017/7/3.
 */
function baseError(errorMsg, errorCode) {
    let error = new Error(errorMsg)
    error.code = errorCode;
    return error;
}
exports.dbError = function (errorCode) {
    return baseError('数据库错误', errorCode);
};

exports.baseError = baseError;

/**
 * Created by xiaobxia on 2017/6/26.
 */
module.exports={
    error: function (errMsg,errCode) {
        return {
            success: false,
            errorMessage:errMsg,
            errorCode: errCode
        }
    },
    dbError: function (errCode) {
        return {
            success: false,
            errorMessage: '数据库操作出错',
            errorCode: errCode
        }
    }
}
/**
 * Created by xiaobxia on 2017/7/12.
 */
const BaseResult = require('../model/result/baseResult');
module.exports = function (error, req, res, next) {
  console.log(error.stack);
  if (error.type === 'user') {
    let result = new BaseResult();
    result.setSuccess(false);
    result.setErrorCode(error.code);
    result.setErrorMessage(error.message);
    res.json(result);
  } else if (error.type === 'parameter') {
    res.status(400).send('Bad Request');
  } else {
    res.status(500).send('Internal Server Error');
  }
};

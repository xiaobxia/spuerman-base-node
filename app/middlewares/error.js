/**
 * Created by xiaobxia on 2017/7/12.
 */
const BaseResult = require('../model/result/baseResult');
const email = require('../common/email');
const config = require('../../config/index');
const logger = require('../common/logger');
const debug = config.server.debug;
module.exports = function (error, req, res, next) {
  if (debug) {
    console.log(error.stack);
  }
  if (error.type === 'user') {
    let result = new BaseResult();
    result.setSuccess(false);
    result.setErrorCode(error.code);
    result.setErrorMessage(error.message);
    res.json(result);
  } else if (error.type === 'parameter') {
    res.status(400).send('Bad Request');
  } else {
    if (!debug) {
      email.sendError(error.stack, function (error, info) {
        if (error) {
          logger.error(error);
        }
      });
    }
    res.status(500).send('Internal Server Error');
  }
};

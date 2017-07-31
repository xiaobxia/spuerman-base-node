/**
 * Created by xiaobxia on 2017/7/25.
 */
const co = require('co');
const moment = require('moment');
const BaseService = require('./base');
const ParamORM = require('../model/orm/sys/paramORM');

module.exports = class ParamService extends BaseService {
  getParams(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.getParams(start, offset);
      let params = paramORM.dataToHump(result);
      params.sort(function (a, b) {
        return b.id - a.id;
      });
      return params;
    });
    return fn(start, offset);
  }

  getParamsCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.getParamsCount();
      return result[0].count;
    });
    return fn();
  }

  addParam(paramInfo) {
    let self = this;
    let fn = co.wrap(function*(paramInfo) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.checkExistByCode(paramInfo.paramCode);
      if (result.length === 0) {
        // 前台就是Id
        delete paramInfo.Id;
        let data = paramORM.dataToHyphen(paramInfo);
        data['STATE'] = 'A';
        data['UPDATE_DATE'] = moment().format('YYYY-M-D HH:mm:ss');
        let dbResult = yield paramORM.addParam(data);
        return dbResult.insertId;
      } else {
        self.throwBaseError('code已存在', 'PARAM_CODE_HAS_EXIST');
      }
    });
    return fn(paramInfo);
  }

  updateParamById(paramInfo) {
    let self = this;
    let fn = co.wrap(function*(paramInfo) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let id = paramInfo.id;
      delete paramInfo.id;
      // 兼容前台
      delete paramInfo.Id;
      let data = paramORM.dataToHyphen(paramInfo);
      data['UPDATE_DATE'] = moment().format('YYYY-M-D HH:mm:ss');
      yield paramORM.updateParamById(id, data);
    });
    return fn(paramInfo);
  }

  deleteParamById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.deleteParamById(id);
      if (result.affectedRows === 0) {
        self.throwBaseError('不可删除', 'PARAM_NOT_EXIST');
      }
    });
    return fn(id);
  }

  getParamByCode(code) {
    let self = this;
    let fn = co.wrap(function*(code) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.getParamByCode(code);
      self.checkDBResult(result, '不存在的参数', 'PARAM_NOT_EXIST');
      return paramORM.dataToHump(result)[0];
    });
    return fn(code);
  }

  getParamById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let paramORM = new ParamORM(connection);
      let result = yield paramORM.getParamById(id);
      self.checkDBResult(result, '不存在的参数', 'PARAM_NOT_EXIST');
      return paramORM.dataToHump(result)[0];
    });
    return fn(id);
  }
};

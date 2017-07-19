/**
 * Created by xiaobxia on 2017/7/19.
 */
const co = require('co');
const moment = require('moment');
const BaseService = require('./base');
const RolePrivORM = require('../model/orm/sys/rolePriv');
const PrivORM = require('../model/orm/sys/priv');

module.exports = class RolePrivService extends BaseService {
  getPrivsByRoleId(roleId, start, offset) {
    let self = this;
    let fn = co.wrap(function*(roleId, start, offset) {
      let connection = self.getConnection();
      let rolePrivORM = new RolePrivORM(connection);
      let privORM = new PrivORM(connection);
      let dbResult = yield rolePrivORM.getPrivIdsByRoleId(roleId, start, offset);
      if (dbResult.length > 0) {
        let ids = [];
        for (let k = 0, len = dbResult.length; k < len; k++) {
          ids.push(dbResult[k]['PRIV_ID']);
        }
        dbResult = yield  privORM.getPrivsByIds(ids);
        return privORM.dataToHump(dbResult);
      } else {
        return [];
      }
    });
    return fn(roleId, start, offset);
  }

  addPrivToRole(privId, roleId) {
    let self = this;
    let fn = co.wrap(function*(privId, roleId) {
      let connection = self.getConnection();
      let rolePrivORM = new RolePrivORM(connection);
      let inRow = yield rolePrivORM.checkPrivInRole(privId, roleId);
      if (inRow.length !== 0) {
        self.throwBaseError('已存在', 'ROLEPRIV_HAS_EXIST');
      } else {
        let now = moment().format('YYYY-M-D HH:mm:ss');
        yield rolePrivORM.addPrivToRole({
          'ROLE_ID': roleId,
          'PRIV_ID': privId,
          'STATE': 'A',
          'UPDATE_DATE': now,
          'CREATE_DATE': now
        });
      }
    });
    return fn(privId, roleId);
  }
};

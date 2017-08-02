/**
 * Created by xiaobxia on 2017/7/19.
 */
const co = require('co');
const BaseService = require('./../base');
const RolePrivORM = require('../../model/orm/sys/rolePrivORM');
const PrivORM = require('../../model/orm/sys/privORM');

module.exports = class RolePrivService extends BaseService {
  getPrivsByRoleId(roleId) {
    let self = this;
    let fn = co.wrap(function*(roleId) {
      let connection = self.getConnection();
      let rolePrivORM = new RolePrivORM(connection);
      let privORM = new PrivORM(connection);
      let dbResult = yield rolePrivORM.getAllPrivIdsByRoleId(roleId);
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
    return fn(roleId);
  }

  addPrivToRole(privId, roleId) {
    let self = this;
    let fn = co.wrap(function*(privId, roleId) {
      let connection = self.getConnection();
      let rolePrivORM = new RolePrivORM(connection);
      let row = yield rolePrivORM.getRow(privId, roleId);
      if (row.length !== 0) {
        if (row[0]['STATE'] === 'X') {
          yield rolePrivORM.enablePrivInRole(privId, roleId);
        } else {
          self.throwBaseError('已存在', 'ROLEPRIV_HAS_EXIST');
        }
      } else {
        let dbResult = yield rolePrivORM.addPrivToRole(privId, roleId);
        return dbResult.insertId;
      }
    });
    return fn(privId, roleId);
  }

  deletePrivInRole(privId, roleId) {
    let self = this;
    let fn = co.wrap(function*(privId, roleId) {
      let connection = self.getConnection();
      let rolePrivORM = new RolePrivORM(connection);
      let dbResult = yield rolePrivORM.disablePrivInRole(privId, roleId);
      if (dbResult.affectedRows === 0) {
        self.throwBaseError('不可删除', 'PRIV_NOT_EXIST_ROLE');
      }
    });
    return fn(privId, roleId);
  }
};

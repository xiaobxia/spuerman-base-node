/**
 * Created by xiaobxia on 2017/6/26.
 */
const BaseORM = require('../base');
module.exports = class UserORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'sys_user';
  }

  getUsersCount() {
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE STATE="A"`);
  }

  getUser(where) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE STATE="A" AND ?`,
      values: where
    });
  }

  getUserByUserCode(userCode) {
    return this.getUser({
      'USER_CODE': userCode
    });
  }

  getUserByUserId(userId) {
    return this.getUser({
      'USER_ID': userId
    });
  }

  updateUserByUserId(userId, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE USER_ID= ?`,
      values: [data, userId]
    });
  }

  getUsersByIds(ids) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE USER_ID IN (?)`,
      values: [ids]
    });
  }

  getUsers(start, offset) {
    return this.query({
      sql: `SELECT USER_ID FROM ${this.table} WHERE STATE="A" LIMIT ?,?`,
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        //为空的话直接返回空数组
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['USER_ID']);
        }
        return this.getUsersByIds(ids);
      }
    });
  }

  addUser(userInfo) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: userInfo
    });
  }

  checkUserCodeExist(userCode) {
    return this.query({
      sql: `SELECT USER_ID FROM ${this.table} WHERE STATE="A" AND USER_CODE= ?`,
      values: [userCode]
    });
  }

  lockUserById(userId) {
    return this.updateUserByUserId(userId, {
      'IS_LOCKED': 'Y'
    });
  }

  unlockUserById(userId) {
    return this.updateUserByUserId(userId, {
      'IS_LOCKED': 'N'
    });
  }

  deleteUserByWhere(where) {
    let queryObj = this.formatWhere('DELETE FROM sys_role {WHERE}', where);
    return this.query({
      sql: queryObj.sql,
      values: queryObj.values
    });
  }

  deleteUserById(id){
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE USER_ID= ?`,
      values: id
    });
  }
};

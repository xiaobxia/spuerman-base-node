/**
 * Created by xiaobxia on 2017/7/24.
 */
const BaseORM = require('../base');
module.exports = class FileORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getFilesByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_file WHERE ID IN (?)',
      values: [ids]
    });
  }

  getFiles(start, offset) {
    return this.query({
      sql: 'SELECT ID FROM sys_file ORDER BY ID DESC LIMIT ?,?',
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['ID']);
        }
        return this.getFilesByIds(ids);
      }
    });
  }
};

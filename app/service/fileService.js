/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const BaseService = require('./base');
const FileORM = require('../model/orm/sys/fileORM');


module.exports = class FileService extends BaseService {
  showFiles(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let fileORM = new FileORM(connection);
      let result = yield fileORM.getFiles(start, offset);
      let files = fileORM.dataToHump(result);
      files.sort(function (a, b) {
        return b.id - a.id;
      });
      return files;
    });
    return fn(start, offset);
  }

  getFilesCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let fileORM = new FileORM(connection);
      let result = yield fileORM.getFilesCount();
      return result[0].count;
    });
    return fn();
  }
};

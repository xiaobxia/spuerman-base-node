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
      sql: 'SELECT * FROM sys_file WHERE ID IN (?) ORDER BY ID DESC',
      values: [ids]
    });
  }

  getFileById(id) {
    return this.query({
      sql: 'SELECT * FROM sys_file WHERE ID= ?',
      values: id
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

  getFilesCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_file');
  }

  addFile(data) {
    return this.query({
      sql: 'INSERT INTO sys_file SET ?',
      values: data
    });
  }

  updateFileById(id, data) {
    return this.query({
      sql: 'UPDATE sys_file SET ? WHERE ID= ?',
      values: [data, id]
    });
  }

  getPictures(start, offset) {
    return this.query({
      sql: 'SELECT ID FROM sys_file WHERE MIME_TYPE LIKE "image%" ORDER BY ID DESC LIMIT ?,?',
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

  getPicturesCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_file WHERE MIME_TYPE LIKE "image%"');
  }

  getPicturesBySearchFileName(fileName, start, offset) {
    return this.query({
      sql: 'SELECT ID FROM sys_file WHERE MIME_TYPE LIKE "image%" AND ORIGIN_FILE_NAME LIKE ? ORDER BY ID DESC LIMIT ?,?',
      values: [`%${fileName}%`, start, offset]
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

  getPicturesCountBySearchFileName(fileName) {
    return this.query({
      sql: 'SELECT COUNT(*) AS count FROM sys_file WHERE MIME_TYPE LIKE "image%" AND ORIGIN_FILE_NAME LIKE ?',
      values: [`%${fileName}%`]
    });
  }

  deleteFileById(id){
    return this.query({
      sql: 'DELETE FROM sys_file WHERE ID= ?',
      values: id
    });
  }
};

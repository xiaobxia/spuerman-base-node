/**
 * Created by xiaobxia on 2017/7/24.
 */
const BaseORM = require('../base');
module.exports = class FileORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_FILE';
  }

  getFilesByIds(ids) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE ID IN (?) ORDER BY ID DESC`,
      values: [ids]
    });
  }

  getFileById(id) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE ID= ?`,
      values: id
    });
  }

  getFiles(start, offset) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} ORDER BY ID DESC LIMIT ?,?`,
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
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table}`);
  }

  addFile(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data
    });
  }

  updateFileById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE ID= ?`,
      values: [data, id]
    });
  }

  getPictures(start, offset) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} WHERE MIME_TYPE LIKE "image%" ORDER BY ID DESC LIMIT ?,?`,
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
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE MIME_TYPE LIKE "image%"`);
  }

  getPicturesBySearchFileName(fileName, start, offset) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} WHERE MIME_TYPE LIKE "image%" AND ORIGIN_FILE_NAME LIKE ? ORDER BY ID DESC LIMIT ?,?`,
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
      sql: `SELECT COUNT(*) AS count FROM ${this.table} WHERE MIME_TYPE LIKE "image%" AND ORIGIN_FILE_NAME LIKE ?`,
      values: [`%${fileName}%`]
    });
  }

  deleteFileById(id){
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE ID= ?`,
      values: id
    });
  }
};

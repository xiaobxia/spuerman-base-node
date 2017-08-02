/**
 * Created by xiaobxia on 2017/7/25.
 */
const BaseORM = require('../base');
module.exports = class FileBucketORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'sys_file_bucket';
  }

  getAllBucket() {
    return this.query({
      sql: `SELECT * FROM ${this.table}`,
      typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          return (field.string() === '1');
        }
        return next();
      }
    });
  }

  checkExistByCode(code) {
    return this.query({
      sql: `SELECT BUCKET_ID FROM ${this.table} WHERE BUCKET_CODE= ?`,
      values: code
    });
  }

  addBucket(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data,
    });
  }

  updateBucketById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE BUCKET_ID= ?`,
      values: [data, id]
    });
  }

  deleteBucketById(id){
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE BUCKET_ID= ?`,
      values: id
    });
  }

  getBucketById(id) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE BUCKET_ID= ?`,
      values: id
    });
  }
};

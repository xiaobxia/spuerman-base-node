/**
 * Created by xiaobxia on 2017/7/25.
 */
const BaseORM = require('../base');
module.exports = class FileBucketORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getAllBucket() {
    return this.query({
      sql: 'SELECT * FROM sys_file_bucket',
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
      sql: 'SELECT BUCKET_ID FROM sys_file_bucket WHERE BUCKET_CODE= ?',
      values: code
    });
  }

  addBucket(data) {
    return this.query({
      sql: 'INSERT INTO sys_file_bucket SET ?',
      values: data,
    });
  }

  updateBucketById(id, data) {
    return this.query({
      sql: 'UPDATE sys_file_bucket SET ? WHERE BUCKET_ID= ?',
      values: [data, id]
    });
  }

  deleteBucketById(id){
    return this.query({
      sql: 'DELETE FROM sys_file_bucket WHERE BUCKET_ID= ?',
      values: id
    });
  }
};

/**
 * Created by xiaobxia on 2017/6/30.
 */
const logger = require('../../../common/logger');
exports.getPrivIdByRoleId = function (connection, roleId, callback) {
    let query = connection.query(
        {
            sql: 'SELECT PRIV_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ?',
            values: roleId
        },
        callback
    );
    logger.trace('sql: '+query.sql);
};
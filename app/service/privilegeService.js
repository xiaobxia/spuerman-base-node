/**
 * Created by xiaobxia on 2017/6/30.
 */
// const async = require('async');
// const logger = require('../common/logger');
// const pool = require('../common/mysqlPool');
//
// const userORM = require('../model/orm/sys/user');
// const rolePrivORM = require('../model/orm/sys/rolePriv');
// const privORM = require('../model/orm/sys/priv');
// const errorModel = require('../model/result/errorModel');
//
// exports.checkUserMenuPriv = function (userId, path, controllerCallback) {
//   pool.getConnection(function (error, connection) {
//     async.waterfall([
//       //连接检验
//       function (callback) {
//         if (error) {
//           logger.error(error);
//           callback(errorModel.dbError(error.code));
//         } else {
//           callback(null);
//         }
//       },
//       //查询role_id
//       function (callback) {
//         userORM.getUserRole(connection, userId, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(errorModel.baseError('当前用户没有ROLE', 'USER_HAS_NO_ROLE'))
//             } else {
//               callback(null, results[0]['ROLE_ID']);
//             }
//           }
//         })
//       },
//       //通过role和path查priv
//       function (roleId, callback) {
//         rolePrivORM.getPrivIdByRoleId(connection, roleId, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(errorModel.baseError('当前用户没有PRIV', 'USER_HAS_NO_PRIV'));
//             } else {
//               callback(null, results);
//             }
//           }
//         })
//       },
//       //通过role查priv
//       function (privs, callback) {
//         let privList = [];
//         for (let k = 0; k < privs.length; k++) {
//           privList.push(privs[k]['PRIV_ID']);
//         }
//         privORM.checkPath(connection, privList, path, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(null, false)
//             } else {
//               callback(null, true)
//             }
//           }
//         })
//       }
//     ], function (error, results) {
//       connection.release();
//       controllerCallback(error, results)
//     })
//   });
// };
//
//
// exports.getUserMenu = function (userId, controllerCallback) {
//   pool.getConnection(function (error, connection) {
//     async.waterfall([
//       //连接检验
//       function (callback) {
//         if (error) {
//           logger.error(error);
//           callback(errorModel.dbError(error.code));
//         } else {
//           callback(null);
//         }
//       },
//       //查询role_id
//       function (callback) {
//         userORM.getUserRole(connection, userId, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(errorModel.baseError('当前用户没有ROLE', 'USER_HAS_NO_ROLE'))
//             } else {
//               callback(null, results[0]['ROLE_ID']);
//             }
//           }
//         })
//       },
//       //通过role查priv
//       function (roleId, callback) {
//         rolePrivORM.getPrivIdByRoleId(connection, roleId, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(errorModel.baseError('当前用户没有PRIV', 'USER_HAS_NO_PRIV'));
//             } else {
//               callback(null, results);
//             }
//           }
//         })
//       },
//       //得到priv的信息
//       function (privs, callback) {
//         let privList = [];
//         for (let k = 0; k < privs.length; k++) {
//           privList.push(privs[k]['PRIV_ID']);
//         }
//         privORM.getPrivsInfo(connection, privList, function (error, results, fields) {
//           if (error) {
//             logger.error(error);
//             callback(errorModel.dbError(error.code));
//           } else {
//             if (!results.length) {
//               callback(errorModel.baseError('权限系统错误', 'SYSTEM_ERROR'));
//             } else {
//               callback(null, results)
//             }
//           }
//         })
//       }
//     ], function (error, result) {
//       connection.release();
//       controllerCallback(error, result)
//     })
//   });
// };
//
//

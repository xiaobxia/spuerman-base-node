/**
 * Created by xiaobxia on 2017/6/30.
 */
const co = require('co');
const BaseController = require('../base');
const PrivilegeService = require('../../service/privilegeService');

module.exports = class PrivilegeController extends BaseController{
  /**
   * method get
   * api sys/priv/menu
   * @param res
   * @param req
   * @param next
   */
  menu () {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let user = self.getSessionUser(req.session);
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let menus = yield privilegeService.getUserMenu(user['USER_ID']);
        connection.release();
        result.setResult(createMenu(menus));
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }
};

function createMenu(menus) {
  let directory = [];
  let menuMap = {};
  for (let k = 0; k < menus.length; k++) {
    let menu = menus[k];
    if (menu['TYPE'] === 0) {
      directory.push({
        id: menu['PRIV_ID'],
        name: menu['PRIV_NAME']
      });
    } else if (menu['TYPE'] === 1) {
      if (menuMap[menu['PARENT_PRIV_ID']] === undefined) {
        menuMap[menu['PARENT_PRIV_ID']] = [];
      }
      menuMap[menu['PARENT_PRIV_ID']].push({
        id: menu['PRIV_ID'],
        name: menu['PRIV_NAME'],
        url: menu['URL'],
        path: menu['PATH']
      });
    }
  }
  for (let j = 0; j < directory.length; j++) {
    directory[j]['children'] = menuMap[directory[j]['id']]
  }
  return directory;
}

/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseResult = require('../../model/result/baseResult');
const sessionConst = require('../../model/const/session');
const privilegeService = require('../../service/privilegeService');

//分析父子关系，生成菜单
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
      })
    }
  }
  for (let j = 0; j < directory.length; j++) {
    directory[j]['children'] = menuMap[directory[j]['id']]
  }
  return directory;
}
/**
 * method get
 * api sys/priv/menu
 * @param res
 * @param req
 * @param next
 */
exports.menu = function (req, res, next) {
  let result = new BaseResult();
  let user = req.session[sessionConst.SESSION_LOGIN_USER];
  privilegeService.getUserMenu(user['USER_ID'], function (error, menus) {
    if (error) {
      result.setErrorCode(error.code);
      result.setErrorMessage(error.message);
    } else {
      result.setResult(createMenu(menus))
      res.json(result)
    }
  })
};

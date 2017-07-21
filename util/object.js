/**
 * Created by xiaobxia on 2017/7/20.
 */
exports.clone = function (option) {
  let tempData = {};
  let target = option.target || {};
  let filter = option.filterKey || [];
  let ifdeleteEmpty = option.deleteEmpty;
  for (let key in target) {
    if (target.hasOwnProperty(key) && filter.indexOf(key) === -1) {
      if (ifdeleteEmpty) {
        let value = target[key];
        //0,[],{}不算是空
        if (value || value === 0) {
          tempData[key] = target[key];
        }
      } else {
        tempData[key] = target[key];
      }
    }
  }
  return tempData;
};

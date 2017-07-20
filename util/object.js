/**
 * Created by xiaobxia on 2017/7/20.
 */
exports.clone = function (option) {
  let tempData = {};
  let target = option.target;
  let filter = option.filterKey;
  let ifdeleteEmpty = option.deleteEmpty;
  for (let key in target) {
    if (target.hasOwnProperty(key) && filter.indexOf(key) === -1) {
      if (ifdeleteEmpty) {
        let value = target[key];
        if(value) {
          tempData[key] = target[key];
        } else {
          if() {
          }
        }
      } else {
        tempData[key] = target[key];
      }
    }
  }

};

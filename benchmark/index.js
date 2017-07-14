/**
 * Created by xiaobxia on 2017/7/6.
 */
const requset = require('request');
const async = require('async');

let requsetInfo = {
  // method: 'POST',
  // url: 'http://localhost:4000/your-business/sys/login',
  // form: {
  //   userCode: 'admin',
  //   pwd: 'admin'
  // },

  // method: 'GET',
  // url: 'http://localhost:4000/your-business/sys/isLogin',

  method: 'GET',
  url: 'http://localhost:4000/your-business/sys/logout',

  //method: 'GET',
  //url: 'http://localhost:4000/your-business/sys/user/1',

  //method: 'GET',
  //url: 'http://localhost:4000/your-business/sys/user/usersCount',

  //method: 'GET',
  //url: 'http://localhost:4000/your-business/sys/users?pageIndex=1&pageSize=10',

  //method: 'POST',
  //url: 'http://localhost:4000/your-business/sys/user/checkUserMenuPriv',
  // form: {
  //   path: '/priv/index'
  // },
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3053.3 Safari/537.36'
  }
};

function query(callback) {
  let startTime = (new Date()).getTime();
  requset(requsetInfo,
    function (err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, (new Date()).getTime() - startTime);
      }
    }
  );
}
let queryList = [];

for (let k = 0; k < 500; k++) {
  queryList.push(query);
}
let allStartTime = (new Date()).getTime();
async.parallel(queryList, function (err, result) {
  if (err) {
    console.log(err);
  } else {
    //console.log(result);
    console.log('ok');
    console.log('allEndTime: ', (new Date()).getTime() - allStartTime);
  }
});

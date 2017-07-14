/**
 * Created by xiaobxia on 2017/7/12.
 */
module.exports = function () {
  return function (error, req, res, next) {
    console.error(error.stack);
    res.status(501).send('Something broke!');
  };
};

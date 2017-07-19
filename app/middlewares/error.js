/**
 * Created by xiaobxia on 2017/7/12.
 */
module.exports = function (error, req, res, next) {
  console.log(error.stack);
  if (error.type === 'parameter') {
    res.status(400).send('Bad Request');
  } else {
    res.status(500).send('Internal Server Error');
  }
};

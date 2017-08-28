/**
 * Created by xiaobxia on 2017/8/28.
 */
const mailer = require('nodemailer');
const config = require('../../config');
const emailConfig = config.email;
//创建一次就可以发很多邮件
let transporter = mailer.createTransport(emailConfig.senderAccount);

let mailOptions = {
  //格式 name<mail>
  from: `"Fred Foo" <${emailConfig.senderAccount.auth.user}>`,
  //发送的
  to: emailConfig.adminAccount.user,
  //标题
  subject: `An error occurred in server project "${config.project.projectName}"`,
  //纯文本
  text: ''
};
/**
 *
 * @param errorInfo
 * @param callback
 * (error, info) => {
 *   if (error) {
 *     return console.log(error);
 *   }
 *   console.log(info);
 * }
 */
exports.sendError = function (errorInfo, callback) {
  let message = {};
  for (let key in mailOptions) {
    if (mailOptions.hasOwnProperty(key)) {
      message[key] = mailOptions[key];
    }
  }
  message.text = errorInfo;
  transporter.sendMail(message, callback);
};



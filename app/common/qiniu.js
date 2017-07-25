/**
 * Created by xiaobxia on 2017/7/25.
 */
const qiniu = require("qiniu");

exports.getUploadToken = function (config) {
  //1.创建鉴权对象
  let mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
  //2.创建上传凭证
  let options = {
    //空间名
    scope: config.bucketCode + ':' + config.fileName,
    expires: 600,
    returnBody: '{"key":"$(key)","hash":"$(etag)","bucket":"$(bucket)","fname":"$(fname)","fsize":"$(fsize)","mimeType":"$(mimeType)"}'
    // callbackBody: '{"key":"$(key)","hash":"$(etag)","bucket":"$(bucket)","fname":"$(fname)","fsize":"$(fsize)","mimeType":"$(mimeType)"}',
    // callbackBodyType: 'application/json'
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  return {
    token: uploadToken,
    bucketHost: config.bucketHost,
    fileName: config.fileName
  };
};

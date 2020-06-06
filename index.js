const fs = require("fs");
const path = require("path");
let OSS = require('ali-oss');

let filesPath = [];
function getAllFiles(path) {
  let files = fs.readdirSync(path);
  files.forEach(function (file) {
    let stat = fs.statSync(path + '/' + file);
    if (stat.isDirectory()) {
      //如果是文件夹遍历
      getAllFiles(path + '/' + file);
    } else {
      filesPath.push(path + '/' + file);
    }
  });
}

module.exports = async function (params) {
  filesPath = [];
  let buildPath = path.resolve(params.path);
  let region = params.region;
  let accessKeyId = params.accessKeyId;
  let accessKeySecret = params.accessKeySecret;
  let bucket = params.bucket;
  let endpoint = params.endpoint;
  let client = new OSS({
    region: region,
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    bucket: bucket,
    endpoint: endpoint
  });
  getAllFiles(buildPath);
  for (var i = 0; i < filesPath.length; i++) {
    let ossKey = filesPath[i].replace(`${buildPath}/`, '');
    let fileData = filesPath[i];
    try {
      console.log(ossKey)
      let result = await client.put(`${ossKey}`, fileData);
      if (result.res.status != 200) {
        errorStatus = result.res.status;
        console.error(`${errorStatus}请参考oss错诶对照表 https://help.aliyun.com/document_detail/32005.html?spm=a2c4g.11186631.6.1266.1f333343xu9sF4#h2-url-2`);
        process.exit(1);
      }
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  return true;
};


### Oss上传中间件

- 基于ali-oss二次封装，上传文件到阿里云

### 如何使用

- 安装

  ```
  cnpm install @51npm/freedom-middleware-ossupload --save-dev;
  ```

- 参数说明

  ```json
  {
    region: 'oss上的配置',
    accessKeyId: 'oss上的配置',
    accessKeySecret: 'oss上的配置',
    bucket: 'oss上的配置',
    endpoint: 'oss上的配置',
    path: "build" // 要上传文件的所在文件夹目录
  }
  ```
  
- 使用demo
	
  ```js
  var ossUpload = require("@51npm/freedom-middleware-ossupload");
  var opts = {
    region: 'oss上的配置',
    accessKeyId: 'oss上的配置',
  accessKeySecret: 'oss上的配置',
    bucket: 'oss上的配置',
    endpoint: 'oss上的配置',
    path: "build" // 要上传文件的所在文件夹目录
  };
  await ossUpload(opts);
  ```
  
  

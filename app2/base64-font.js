const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  let { filePath, replaceStr } = this.query;
  console.log('Loader base64-font-loader is excuted!');
  const urbase = loaderUtils.interpolateName(this, `[name]-base64.[ext]`);
  // var data = fs.readFileSync('./src/assets/font/Orbitron-Regular.ttf', 'base64');
  var data = fs.readFileSync(filePath, 'base64');
  const base64Str = `data:font/ttf;base64,${data}`;
  this.emitFile(urbase, base64Str);
  var res = source.replace(replaceStr, base64Str);

  return res;
};

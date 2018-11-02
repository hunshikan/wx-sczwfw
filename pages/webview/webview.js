// pages/webview/webview.js
const staticMethod = require('../../utils/staticMethod.js');
const md5 = require('../../utils/md5.js');

Page({
  data:{
    url: ''
  },
  onLoad(opts){
    let url = staticMethod._urlDecrypt(opts.url);
    if (url.indexOf('merchant') !== -1){
      let str_md5 = md5.hex_md5('sczwfw1510876636173' + staticMethod._formatTime(new Date()) + '!@#123');
      let param = '?merchant=sczwfw27&merchantCode=' + str_md5;
      url = url + param;
    }
    
    console.log(url)
    this.setData({url: url});
  }
})
var tcity = require("./aes.js");

/*解密*/
function Decrypt(message) {
  //将+号去掉
  var wordstr = message.replace(/\+/g, "");
  //进行decodeURI解码
  var word = decodeURIComponent(wordstr);
  //对输入的参数进行utf8编码
  var key = tcity.CryptoJS.enc.Utf8.parse("1234567890111111");
  var iv = tcity.CryptoJS.enc.Utf8.parse('0123456789abcdef');
  //解密
  var decrypted = tcity.CryptoJS.AES.decrypt(word, key, { iv: iv, mode: tcity.CryptoJS.mode.CBC });
  //转换成utf8
  var data = tcity.CryptoJS.enc.Utf8.stringify(decrypted).toString();
  return data;
}
/*加密*/
function Encrypt(word) {
  //对输入的参数进行utf8编码	
  var key = tcity.CryptoJS.enc.Utf8.parse("1234567890111111");
  var iv = tcity.CryptoJS.enc.Utf8.parse('0123456789abcdef');
  word = tcity.CryptoJS.enc.Utf8.parse(word)
  //加密
  var encrypted = tcity.CryptoJS.AES.encrypt(word, key, { iv: iv, mode: tcity.CryptoJS.mode.CBC });
  //进行URI编码
  var encydata = encodeURIComponent(encrypted);
  return encydata;
}
module.exports = {
  Encrypt: Encrypt,
  Decrypt: Decrypt
}

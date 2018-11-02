/*
* encryptionMethod 加密方法对象
* loginEncryption 登录信息加密
* idCardEncryption 身份证号加密
*
*
*
*
*
*
*/ 
const encryption = require("./DecryptAndEncrypt.js");

const encryptionMethod = {
  encryption: res => {//加密方法
    return encryption.Encrypt(JSON.stringify(res));
  },
  decrypt: res => {//解密方法
    return encryption.Decrypt(res);
  },
  loginEncryption: res => {//登录加密
    return encryptionMethod.encryption(res);
  },
  idCardEncryption: res => {//身份证号加密
    // console.log(encryption)
    return encryptionMethod.encryption(res);
  },
  loginDecrypt: res => {//登录解密
    return encryptionMethod.decrypt(res);
  },
  idCardDecrypt: res => {//身份证号解密
    return encryptionMethod.decrypt(res);
  }
}
module.exports = encryptionMethod;
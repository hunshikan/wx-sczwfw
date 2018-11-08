// pages/login/login.js
const staticPicture = require('../../utils/staticPicture.js');
const staticMethod = require('../../utils/staticMethod.js');
const staticPath = require('../../utils/staticPath.js');
const DecryptAndEncrypt = require('../../utils/DecryptAndEncrypt.js');

Page({
  data: {
  
  },
  getPhoneNumber(e){
    staticMethod._onLogin(e, this);
  },
  formSubmit(e){
    let formOpts = e.detail.value;
    let jsonData = {
      pwd: formOpts.pwd,
      phoneNumber: formOpts.phoneNumber,
      loginType: 'login',
      loginKey: 'ewogICJzZXJpYWwiIDogIjAwMDAwMDAwMDAwMDAwMDAwMDAiLAogICJvcyIgOiB7CiAgICAidmVyc2lvbiIgOiAiMTEuNCIsCiAgICAidHlwZSIgOiAid2VpeGluIgogIH0sCiAgImFwcCIgOiB7CiAgICAidmVyc2lvbiIgOiAiMi4wLjMwIgogIH0KfQ==',
      code: '11111'
    };
    for (let key in formOpts){
      jsonData[key] = formOpts[key];
    }
    let data = {
      jsonData: jsonData,
      token: '111'
    }
    let aes = DecryptAndEncrypt.Encrypt(JSON.stringify(data));
    // console.log(data)
    // console.log(aes)
    // console.log(DecryptAndEncrypt.Decrypt(aes));
    // console.log(staticPath.loginPath + aes)
    wx.request({
      url: staticPath.loginPath,
      data: aes,
      method: 'POST',
      header:{
        "content-type": "application/json"
      },
      success: (res) => {
        // console.log(res)
        if(res.data !== ''){
          let data = JSON.parse(DecryptAndEncrypt.Decrypt(res.data));
          // console.log(data)
          if (data.ifResult != 0){
            wx.showModal({
              content: data.msg,
            })
          }else{
            wx.showToast({
              title: '登录成功！',
              success: res => {
                setTimeout(() => {
                  staticMethod._jumpMethod({ url: '../../pages/index/index' });
                },1000);
                wx.setStorageSync('loginMsg', data.ifResultInfo);
              }
            })
          }
        }else{
          wx.showToast({
            icon: 'none',
            title: '登录失败，请重新登录！'
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  }
})
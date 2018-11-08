// pages/authentication/authentication.js
const staticMethod = require('../../utils/staticMethod.js');
const staticPath = require('../../utils/staticPath.js');
const encryptionMethod = require('../../utils/encryptionMethod.js');

Page({
  data: {
  
  },
  onLoad(options) {
  
  },
  formSubmit(e) {
    let formOpts = e.detail.value;
    if (formOpts.realName == ''){
      wx.showToast({
        icon: 'none',
        title: '真实姓名不能为空！'
      });
      return false;
    }
    if (formOpts.idCard == ''){
      wx.showToast({
        icon: 'none',
        title: '身份证号码不能为空！'
      });
      return false;
    }

    let loginMsg = wx.getStorageSync('loginMsg');
    if (loginMsg.idForStr == '') {
      wx.showToast({
        icon: 'none',
        title: '请您先进行登录操作！',
        success: res => {
          setTimeout(() => {
            staticMethod._jumpMethod({ url: '../../pages/login/login' });
          }, 1000);
        }
      });
      return false;
    }

    // formOpts.accountId = loginMsg.idForStr;
    formOpts.accountId = '3824519741788262400';
    let data = JSON.stringify(formOpts);

    // console.log(formOpts)
    // console.log(loginMsg)
    // let card = encryptionMethod.idCardEncryption('510824199004065633');
    // console.log(card)
    // return false;
    console.log(staticPath._authenticationPath)
    console.log(data)
    wx.request({
      url: staticPath._authenticationPath,
      data: data,
      method: 'POST',
      success: res => {
        console.log(res)
        if(res.data.code === '200'){
          wx.showToast({
            title: '认证成功！',
            success: res => {
              wx.setStorageSync('loginMsg', res.data.data);
              setTimeout(() => {
                staticMethod._jumpMethod({ url: '../../pages/index/index' });
              },1000);
            }
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: '提交失败，请稍后重新提交！'
          })
        }
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: res.errMsg
        })
      }
    })
  }
})
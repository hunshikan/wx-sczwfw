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
    let loginMsg = wx.getStorageSync('loginMsg');
    formOpts.accountId = loginMsg.idForStr;
    let data = JSON.stringify(formOpts);

    // console.log(formOpts)
    // console.log(loginMsg)
    // let card = encryptionMethod.idCardEncryption('510824199004065633');
    // console.log(card)
    // return false;
    console.log(data)
    wx.request({
      url: staticPath._authenticationPath,
      data: data,
      method: 'POST',
      success: res => {
        console.log(res)
        if(res.data.code === '200'){
          wx.setStorageSync('loginMsg', res.data.data);
          staticMethod._jumpMethod({
            url: '../../pages/index/index'
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: '提交失败！'
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
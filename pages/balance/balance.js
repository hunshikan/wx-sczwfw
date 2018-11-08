// pages/balance/balance.js
const staticPicture = require('../../utils/staticPicture.js');
const staticPath = require('../../utils/staticPath.js');
const staticMethod = require('../../utils/staticMethod.js');
Page({
  data: {
    staticPicture: {},
    balanceData: null
  },
  onLoad(opts){
    this.setData({ staticPicture: staticPicture});
  },
  onShow(){
    this._getUserBalance();
  },
  _getUserBalance(){
    let loginMsg = wx.getStorageSync('loginMsg') || { idForStr:'',idNumber: ''};
    let cityOpts = wx.getStorageSync('cityOpts') || { adCode: '510100' };
    // console.log(cityOpts.adCode.substring(0, 6))
    // console.log(loginMsg)
    let idCard = loginMsg.idNumber;
    let adCode = cityOpts.adCode.substring(0, 6);
    let opts = {
      "region": "151",
      "pf": "gov",
      "sign": "fb7122a70a2d43f3a357fc7847fa0f8a",
      "timestamp": staticMethod._formatTime1(new Date()),
      "aac002": idCard,
      "aab034": adCode,
      "jybh": 'Q_NA002_1'
    }
    console.log('地址：' + staticPath.balanceCheck);
    console.log('参数：' + JSON.stringify(opts));
    wx.request({
      url: staticPath.balanceCheck,
      data: JSON.stringify(opts),
      method: 'POST',
      success: res => {
        console.log(res)
        if(res.data.process_response.result_code == '100'){
          let balanceData = res.data.process_response.results.result_list[0];
          // console.log(balanceData)
          let idCardNum = staticMethod._regexpReplace('double', idCard);
          let name = staticMethod._regexpReplace('last',balanceData.aac003);
          balanceData.aac003 = name;
          balanceData.idCard = idCardNum;
          // console.log(balanceData)
          this.setData({ balanceData: balanceData});
        }else{
          wx.showToast({
            icon: 'none',
            title: '获取医保余额失败，请您刷新重新获取！'
          })
          this.setData({ balanceData0: '当前城市没有您的医保账户，请切换到您医保账户所在的城市！' });
        }
      }
    })
  }
})
const pageService = require('../../src/js/pageService.js');
const staticMethod = require('../../utils/staticMethod.js');

Page({
  data: {
    pageService: {}
  },
  onLoad(opts) {
    // console.log(opts.type)
    // console.log(pageService)
    // console.log(pageService[opts.type])
    this.setData({ pageService: pageService[opts.type] })
  },
  jumpMethod(e) {
    let loginMsg = wx.getStorageSync('loginMsg') || { idForStr: '', idNumber: '' };
    if (loginMsg.idForStr == '') {
      wx.showToast({
        icon: 'none',
        title: '请您先进行登录操作！',
        success: res => {
          setTimeout(res => {
            staticMethod._jumpMethod({ url: '../../pages/login/login' });
          }, 1000);
        }
      })
      return false;
    }
    if (loginMsg.idNumber == '') {
      wx.showToast({
        icon: 'none',
        title: '请您先认证操作！',
        success: res => {
          setTimeout(res => {
            staticMethod._jumpMethod({ url: '../../pages/authentication/authentication' });
          }, 1000);
        }
      })
      return false;
    }
    
    staticMethod._jumpMethod({
      url: e.currentTarget.dataset.url
    })
  }
})
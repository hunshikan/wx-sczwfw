// pages/city/city.js
const cities = require('../../utils/staticCity.js'); 
const staticPicture = require('../../utils/staticPicture.js');
const staticMethod = require('../../utils/staticMethod.js');
Page({
  data: {
    cities: [],
    staticPicture: {}
  },
  onLoad: function (options) {
    this.setData({ cities: cities, staticPicture: staticPicture})
  },
  jumpMethod(e){
    let cityOpts = {
      city: e.currentTarget.dataset.city,
      adCode: e.currentTarget.dataset.code
    }
    wx.setStorageSync('cityOpts', cityOpts);
    staticMethod._jumpMethod({
      // type: 'reLaunch',
      url: '../../pages/index/index'
    })
  }
})
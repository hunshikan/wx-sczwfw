//index.js
//获取应用实例
/*
* themeService 主题服务的服务项目数据
* staticPicture 页面静态图标文件
*
*
*
*
*
* jumpMethod 页面的跳转方法
* onPageScroll 监听页面的滚动
*/

const app = getApp()
const themeService = require('../../src/js/themeService.js');
const staticPicture = require('../../utils/staticPicture.js');
Page({
  data: {
    navbarBgColor: 'rgba(50, 50, 50, 0)',
    themeService: [],
    staticPicture: {}
  },
  onLoad(){
    this.setData({ themeService: themeService, staticPicture: staticPicture});
  },
  jumpMethod(e){
    console.log(e.currentTarget.dataset.url);
  },
  onPageScroll(e){
    let transparen = e.scrollTop / 200;
    transparen = transparen < 1 ? transparen : 1;
    console.log(transparen)
    if (transparen <= 1){
      this.setData({ navbarBgColor: 'rgba(50, 50, 50, ' + transparen + ')' });
    }
  }
})

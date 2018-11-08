//index.js
//获取应用实例
/*
* themeService 主题服务的服务项目数据
* staticPicture 页面静态图标文件
* staticPath 接口路径
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
const staticMethod = require('../../utils/staticMethod.js');
const staticPath = require('../../utils/staticPath.js');
const DecryptAndEncrypt = require('../../utils/DecryptAndEncrypt.js');
const md5 = require('../../utils/md5.js');

Page({
  data: {
    navbarBgColor: 'rgba(50, 50, 50, 0)',
    themeService: [],
    staticPicture: {},
    flag: 0,
    showStatus: 'none', 
    heightStatus: '100vh',
    cityOpts: {
      city: '成都市',
      temperature: '16℃ ～ 8℃',
      date: staticMethod._getNewDateDay().day
    },
    loginStatus: false,
    statusIndex: 0,
    // 当前分类的索引
    currentCategory: 0,
    // 每个分类距离顶部的高度的数组
    productsTop: [],
    categoryTop: 10000,
    // 用于存储每次滚动结束之后的距离, 可用来判断滚动的方向
    moveStartPos: 0,
    // 点击分类的名称, 用于点击跳转
    scrollInTo: ''
  },
  onLoad(){
    // console.log(staticMethod._getNewDateDay())
    this.setData({ themeService: themeService, staticPicture: staticPicture, staticPath: staticPath});
  },
  onShow(){
    // 获取本地存储的地理信息
    staticMethod._getCurrentCityMsg(this);
    // 获取昵称和头像
    let loginMsg = wx.getStorageSync('loginMsg');
    // console.log(loginMsg)
    if (loginMsg){
      this.setData({ loginMsg: loginMsg, loginStatus: true});
    }
  },
  goToLogin(){
    staticMethod._jumpMethod({url: '../../pages/login/login'});
  },
  // 获取用户手机号码
  getPhoneNumber(e){
    staticMethod._onLogin(e,this);
    // wx.checkSession({
    //   success: (res) => {
    //     //存在登陆态
    //     console.log(res)
    //   },
    //   fail: (res) => {
    //     //不存在登陆态
    //     console.log(res)
    //     staticMethod._onLogin(e);
    //   }
    // })
  },
  // 跳转页面
  jumpMethod(e) {//如果type值为webview就跳转webview页面，否侧跳转对应二级页面
    staticMethod._jumpWebview(e,this);
  },
  // 非webview页面跳转
  jumpMethod1(e){
    let loginMsg = wx.getStorageSync('loginMsg') || { idForStr: '', idNumber: '' };
    if (loginMsg.idForStr == ''){
      wx.showToast({
        icon: 'none',
        title: '请您先进行登录操作！',
        success: res => {
          setTimeout(res => {
            staticMethod._jumpMethod({ url: '../../pages/login/login' });
          },1000);
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

    let url = e.currentTarget.dataset.url;
    staticMethod._jumpMethod({url: url});
  },
  getStatus(e){
    let index = e.currentTarget.dataset.index;
    let indexInfo = e.currentTarget.dataset.text;
    this.setData({ scrollInTo: indexInfo, currentCategory: index});
  },
  // 页面滚动
  scrolling(e) {
    // console.log(e.detail.scrollTop);
    let scrollTop = e.detail.scrollTop;
    let productsTop0 = this.data.productsTop0;
    if (scrollTop >= productsTop0[1].top && this.data.flag == 0){
      this.setData({showStatus: 'block',heightStatus: 'calc(100vh - 13vw);',flag: 1});
    } else if (scrollTop < productsTop0[1].top && this.data.flag == 1){
      this.setData({ showStatus: 'none', heightStatus: '100vh', flag: 0 });
    }
    // this.onScrollViewScroll({ scrollTop: e.detail.scrollTop });
  },
  onScrollViewScroll(e) {
    // 当前滚动的距离
    let scrollTop = e.scrollTop
    // moveStartPos记录着上一次滚动完成时的位置, 用于判断滚动方向
    // 如果现在的滚动距离大于moveStartPos说明正在往下滚动
    if (scrollTop > this.data.moveStartPos) {
      this.data.moveStartPos = scrollTop;
      this.setData({ moveStartPos: scrollTop });
      // 遍历每个商品距离顶部的距离
      this.data.productsTop.forEach((item, index) => {
        // 如果滚动的距离大于某个商品到顶部的距离说明该商品到了顶部, 减10是为了减少触发距离
        if (scrollTop > item.top - 10) {
          // 当前分类的索引小于满足条件的商品索引就赋值, 跳到下一个分类
          if (this.data.currentCategory < index) {
            this.data.currentCategory = index;
            this.setData({ currentCategory: index });
          }
        }
      })
      // 如果现在的滚动距离小于moveStartPos说明正在往上滚动    
    } else if (scrollTop < this.data.moveStartPos) {
      this.data.moveStartPos = scrollTop;
      this.setData({ moveStartPos: scrollTop });

      this.data.productsTop.forEach((item, index) => {
        if (scrollTop < item.top - 10) {
          if (this.data.currentCategory >= index) {
            this.data.currentCategory = index ? index - 1 : index;
            this.setData({ currentCategory: index ? index - 1 : index });
          }
        }
      })
    }
    console.log(this.data.currentCategory)
  },
  onReady() {
    // 页面准备完成之后获取每个分类距离顶部的高度, 存储在数组productsTop中
    var query = wx.createSelectorQuery()
    let productsTop = [];
    let productsTop0 = [];
    query.selectAll('.rui-theme-list').boundingClientRect((rect) => {
      rect.forEach((item, index) => {
        productsTop.push({ top: item.top })
      })
      this.setData({ productsTop: productsTop })
    })
    query.selectAll('.rui-theme-nav-scroll').boundingClientRect((rect) => {
      rect.forEach((item, index) => {
        productsTop0.push({ top: item.top })
      })
      // console.log(productsTop0)
      this.setData({ productsTop0: productsTop0 })
    })
    query.selectAll('.rui-theme-nav-scroll').boundingClientRect((rect) => {
      this.setData({ categoryTop: rect[0].top })
    }).exec()
  }
})

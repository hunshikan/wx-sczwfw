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
    cityOpts: {},
    loginStatus: false
  },
  onLoad(){
    // console.log(staticPath)
    this.setData({ themeService: themeService, staticPicture: staticPicture, staticPath: staticPath});
  },
  onShow(){
    // 获取本地存储的地理信息
    staticMethod._getCurrentCityMsg(this);
    // 获取昵称和头像
    let loginMsg = wx.getStorageSync('loginMsg');
    if (loginMsg){
      this.setData({ loginMsg: loginMsg, loginStatus: true});
    }
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
    /*
    * 首页跳转函数说明
    * 1. 首先判断是否需要登录，并且userId是否为空？如果条件成立，提示用户需要完成登录！否则说明该页面不需要登录，或者已经登录！
    * 2. 判断跳转的是web-view页面还是其他二级页面？如果其他二级页面，获取type值跳转！否则需要对web-view的url进行处理！
    * 3. 判断url中是否存在‘身份证号密文’或者‘加密的登录信息’？如果存在，说明需要进行身份信息认证！否则直接跳转改web-view页面！
    * 4. 判断loginMsg中idNumber是否为空？如果为空，说明用户还未进行验证，需要跳转验证页面！否则说明信息已经验证，直接处理验证信息！
    * 5. 判断url中是否存在‘身份证号密文’？如果存在，说明需要身份证信息加密替换！
    * 6. 判断url中是否存在‘加密的登录信息’？如果存在，说明需要登录信息加密替换！
    * 注：判断的层级很重要，是对不同url的处理，不要轻易调换！
    */

    let typeVal = e.currentTarget.dataset.type;
    let status = e.currentTarget.dataset.status;
    let loginMsg = wx.getStorageSync('loginMsg') || {};
    // 判断是否需要提示登录

    if (status === '1' && loginMsg.idForStr === ''){
      wx.showToast({
        icon: 'none',
        title: '请您完成登录！'
      })
      return false;
    }else{
      // 判断跳转web-view页面
      if (typeVal === 'webview') {
        let cityOpts = this.data.cityOpts;
        let url = e.currentTarget.dataset.url;
        url = url.replace(/地域编码/g, cityOpts.adCode);
        // 判断是否需要身份证信息
        console.log(url)
        if (url.indexOf('身份证号密文') != -1 || url.indexOf('加密的登录信息') != -1){//需要身份信息的webview
          // 判断是否有身份信息
          if (loginMsg) {//没有身份证号，需要去验证
            staticMethod._jumpMethod({
              url: '../../pages/authentication/authentication'
            })
          } else {//有身份证号，直接加密登录
            if (url.indexOf('身份证号密文') != -1){//如果是身份证号密文，此处提换
              let idNumber = loginMsg.idNumber;
              let encry = DecryptAndEncrypt.Encrypt('510824199004065633');
              url = url.replace(/身份证号密文/g, encry);
              url = staticMethod._urlEncrypt(url);
            }
            if (url.indexOf('加密的登录信息') != -1){//如果是登录信息密文，此处提换
              let loginOpts = {
                idCardNumber: loginMsg.idNumber,
                phone: loginMsg.phoneNumber,
                userId: loginMsg.idForStr,
                userName: loginMsg.realName
              }
              
              let encryLogin = DecryptAndEncrypt.Encrypt(JSON.stringify(loginOpts));
              url = url.replace(/加密的登录信息/g, encryLogin);
              url = staticMethod._urlEncrypt(url);
            }
            // url处理完成，进行跳转
            staticMethod._jumpMethod({
              url: '../../pages/webview/webview?url=' + url
            })
          }
        }else{//不需要身份信息的webview
          staticMethod._jumpMethod({
            url: '../../pages/webview/webview?url=' + url
          })
        }
      } else {//跳转正常二级页面
        staticMethod._jumpMethod({
          url: e.currentTarget.dataset.url + '?type=' + typeVal
        })
      }
    }
    // console.log(e.currentTarget.dataset.url);
    // console.log(e.currentTarget.dataset.type);
    // console.log(e.currentTarget.dataset.url + '?type=' + e.currentTarget.dataset.type);
  },
  onPageScroll(e){
    let transparen = e.scrollTop / 200;
    transparen = transparen < 1 ? transparen : 1;
    // console.log(transparen)
    if (transparen <= 1){
      this.setData({ navbarBgColor: 'rgba(50, 50, 50, ' + transparen + ')' });
    }
  }
})

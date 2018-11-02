/*
* @file 四川政务服务微信小程序JSAPI
* @author 梁亚军 1148063373@qq.com 2018.10.30
* staticMethod.js 文件参数说明
* 
*
* 该文件的全局变量：
*
* amap 高德地图微信小程序的构造对象
* bmap 百度地图微信小程序的构造对象
* staticPath 静态接口的路径文件
* staticMethod 保存项目所有公用方法的对象
*  
*
* staticMethod对象的参数：
*
* _loginPath 当前对象需要用的登录接口
* _authenticationPath 当前对象需要用的认证接口
* _getCurrentCityMsg 获取城市的温度，城市名，code，日期
* _getWeather 获取城市温度
* _setNavigation 获取设备型号
* _jumpMethod 全局跳转方法
* _formatNumber 小于10的number处理
* _getNewDateDay 获取当天日期和星期几
* _getLocation 获取当前城市的城市名
* _userLogin 检查登录状态的函数
* _onLogin 微信小程序登录函数
* _requestPost 全局的post请求方法
* _urlEncrypt 替换url的？和=为@和！
* _urlDecrypt 替换url的@和！为？和=
* _setCityOpts 获取城市的code方法
* _formatTime 日期格式化函数
*
*
*/ 


const amap = require('./amap-wx.js');
const bmap = require('./bmap-wx.js');
const staticPath = require('./staticPath.js');

const staticMethod = {
  // 微信小程序登录接口
  _loginPath: staticPath._loginPath,
  // 身份证认证接口
  _authenticationPath: staticPath._authenticationPath,
  // 日期格式化函数
  _formatTime(date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(staticMethod._formatNumber).join('-');
  },
  // 获取当前城市的温度，code，日期
  _getCurrentCityMsg(page){
    /*
    * _getCurrentCityMsg 方法是为了获取右上角的城市，天气，日期及城市code
    * page 当前页面的this
    * 1. 判断 objOpts 本地缓存中是否存在用户选中的城市？如果存在，直接用当前城市去获取其他参数！如果不存在，就定位获取该城市！
    * 2. 获取定位城市，判断定位城市是否是川内城市？如果是，赋值code！如果不是，直接获取默认的成都市天气和其他值！
    */

    let objOpts = wx.getStorageSync('cityOpts');
    if (objOpts) {//进入小程序，查看本地存储是否存在上次选中，存在直接用本地存储城市
      staticMethod._getWeather(res => {
        res.adCode = objOpts.adCode;
        page.setData({ cityOpts: res });
      }, objOpts.city);
    } else {//如果不存在，就定位获取当前所在城市
      // 获取定位地址
      staticMethod._getLocation(res => {
        let cityOpts = res;
        // 对比判断是否是川内城市
        let obj = staticMethod._setCityOpts({ city: res.city });
        if (cityOpts.city === obj.city) {//如果是赋值adCode
          cityOpts.adCode = obj.adCode;
          page.setData({ cityOpts: cityOpts })
        } else {//如果不是，默认为成都，重新获取天气
          staticMethod._getWeather(res => {//获取后赋值adCode
            res.adCode = obj.adCode;
            page.setData({ cityOpts: res });
          }, obj.city);
        }
      });
    }
  },
  // 获取当前城市和温度
  _getWeather(callback,city){
    /*
    * _getWeather 获取当前城市温度等参数
    * callback 回调函数
    * city 获取的城市值
    */

    // 新建百度地图对象 
    let cityName = encodeURIComponent(city, "utf-8");
    let url = 'https://api.map.baidu.com/telematics/v3/weather?location=' + cityName + '&output=json&ak=' + staticPath._mapAK;
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success: res => {
        let weatherData = res.data.results[0];
        callback({
          date: weatherData.weather_data[0].date.split('月')[1].split('日')[0],
          city: weatherData.currentCity,
          temperature: weatherData.weather_data[0].temperature.replace(/\ ~/g, '℃ ～')
        });
      }
    })
  },
  // 获取设备信息
  _setNavigation:() => {
    /*
    * 获取当前设备显示信号电池的高度
    * startBarHeight 设备电池信号部分高度，默认20px
    * navgationHeight title高度，默认44px
    * heightOpts 保存返回的宽高
    */

    let heightOpts = {
      startBarHeight : 20,
      navgationHeight : 44
    }
    wx.getSystemInfo({
      success: (res) => {
        if (res.model == 'iPhone X') {
          heightOpts.startBarHeight = 44
        }
        return heightOpts;
      }
    })
  },
  // 跳转页面
  _jumpMethod:(opts) => {
    /*
    * _jumpMethod 公用跳转方法
    * opts 传入的对象，有跳转方式type和跳转地址url
    */

    switch(opts.type){
      case 'navigateTo':
        wx.navigateTo({url: opts.url});
        break;
      case 'switchTab':
        wx.switchTab({ url: opts.url });
        break;
      case 'reLaunch':
        wx.reLaunch({ url: opts.url });
        break;
      case 'redirectTo':
        wx.redirectTo({ url: opts.url });
        break;
      default : 
        wx.navigateTo({ url: opts.url });
    }
  },
  // 小于10，填0函数
  _formatNumber(n){
    /*
    * _formatNumber 对小于10的数添加0处理
    * n 传入的number参数
    */

    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  // 获取当前日
  _getNewDateDay(){
    /*
    * _getNewDateDay 获取当天的周几和日期函数
    */

    let date = new Date();
    let day = date.getDate();
    let dateDay = date.getDay();
    return {
      day: staticMethod._formatNumber(day),
      date: staticMethod._formatNumber(dateDay)
    };
  },
  // 获取当前位置
  _getLocation(callback){
    /*
    * _getLocation 获取当前位置的城市
    * callback 对获取的参数返回
    */

    // 新建百度地图对象 
    let BMap = new bmap.BMapWX({ ak: staticPath._mapAK }); 
    let fail = function(data) { 
        console.log(data) 
        wx.showToast({
          icon: 'none',
          title: '获取地址失败，请打开GPS重新获取！'
        })
    }; 
    let success = function(data) { 
      let weatherData = data.currentWeather[0];
      callback({
        date: weatherData.date.split('月')[1].split('日')[0],
        city: weatherData.currentCity,
        temperature: weatherData.temperature.replace(/\ ~/g, '℃ ～')
      });
    } 
    // 发起weather请求 
    BMap.weather({ 
        fail: fail, 
        success: success 
    });
  },
  _userLogin(e) {
    /*
    * _userLogin 检测小程序的登录状态
    * e 传入的信息对象
    */

    wx.checkSession({
      success:() => {
        //存在登陆态
      },
      fail:() => {
        //不存在登陆态
        staticMethod._onLogin(e);
      }
    })
  },
  // 进行登录
  _onLogin(e,page){
    /*
    * _onLogin 小程序登录函数
    * e 传入的信息对象
    * page 当前页面对象
    */

    wx.login({
      success: res => {
        let opts = {
          code: res.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          flag: 'zw'
        };
        
        wx.request({
          url: staticMethod._loginPath,
          data: JSON.stringify(opts),
          method: 'POST',
          success: result => {
            console.log(result)
            if (result.data.code === '200'){
              wx.setStorageSync('loginMsg', result.data.data);
              page.setData({ loginMsg: loginMsg, loginStatus: true})
              wx.showToast({
                icon: 'success',
                title: '登录成功'
              })
              // wx.setStorage({
              //   key: 'loginMsg',
              //   data: result.data.data,
              //   success: () => {
              //     page.setData({ loginMsg: loginMsg})
              //     wx.showToast({
              //       icon: 'success',
              //       title: '登录成功'
              //     })
              //   }
              // })
            }else{
              wx.showToast({
                icon: 'none',
                title: result.data.msg
              })
            }
          },
          fail: result => {
            console.log(result)
          }
        })
      }
    })
  },
  // POST请求数据
  _requestPost(opts){
    /*
    * _requestPost 项目公用的post请求方法
    * opts 传入的参数对象
    */

    // 扩展数据
    let obj = opts || {};
    let defaultOpts = {
      url: '',
      data: {},
      success: (() => { }),
      fail: (() => { }),
      complete: (() => { })
    }
    for(let key in obj){
      defaultOpts[key] = obj[key] || defaultOpts[key];
    }
    // 进行post请求
    wx.request({
      url: defaultOpts.utl,
      data: defaultOpts.data,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      success: res => {
        // console.log(res)
        defaultOpts.success(res);
      },
      fail: res => {
        // console.log(res)
        defaultOpts.fail(res);
      },
      complete: res => {
        // console.log(res)
        defaultOpts.complete(res);
      }
    })
  },
  // 将url中的?换成@，将=换成!
  _urlEncrypt(url){
    /*
    * _urlEncrypt 替换url的？和=函数
    * url 传入的参数
    */
    return url.replace(/\?/g, '@').replace(/\=/g, '!');
  },
  // 将URL中的@换成？，将！换成=
  _urlDecrypt(url){
    /*
    * _urlDecrypt 替换url的@和！函数
    * url 传入的参数
    */
    return url.replace(/\@/g, '?').replace(/\!/g, '=');
  },
  // 设置cityOpts
  _setCityOpts(opts){
    /*
    * _setCityOpts 完善code函数
    * opts 传入的参数对象
    */

    let cityOpts = {};

    switch (opts.city) {
      case '四川省': 
        cityOpts = {
          city: opts.city,
          adCode: '510000000000'
        }
        break;

      case '成都市': 
        cityOpts = {
          city: opts.city,
          adCode: '510100000000'
        }
        break;

      case '攀枝花市': 
        cityOpts = {
          city: opts.city,
          adCode: '510400000000'
        }
        break;

      case '泸州市': 
        cityOpts = {
          city: opts.city,
          adCode: '510500000000'
        }
        break;

      case '德阳市': 
        cityOpts = {
          city: opts.city,
          adCode: '510600000000'
        }
        break;

      case '绵阳市': 
        cityOpts = {
          city: opts.city,
          adCode: '510700000000'
        }
        break;

      case '广元市': 
        cityOpts = {
          city: opts.city,
          adCode: '510800000000'
        }
        break;

      case '遂宁市': 
        cityOpts = {
          city: opts.city,
          adCode: '510900000000'
        }
        break;

      case '内江市': 
        cityOpts = {
          city: opts.city,
          adCode: '511000000000'
        }
        break;

      case '乐山市': 
        cityOpts = {
          city: opts.city,
          adCode: '511100000000'
        }
        break;

      case '南充市': 
        cityOpts = {
          city: opts.city,
          adCode: '511300000000'
        }
        break;

      case '宜宾市': 
        cityOpts = {
          city: opts.city,
          adCode: '511500000000'
        }
        break;

      case '广安市': 
        cityOpts = {
          city: opts.city,
          adCode: '511600000000'
        }
        break;

      case '达州市': 
        cityOpts = {
          city: opts.city,
          adCode: '511700000000'
        }
        break;

      case '巴中市': 
        cityOpts = {
          city: opts.city,
          adCode: '511900000000'
        }
        break;

      case '雅安市': 
        cityOpts = {
          city: opts.city,
          adCode: '511800000000'
        }
        break;

      case '眉山市': 
        cityOpts = {
          city: opts.city,
          adCode: '511400000000'
        }
        break;

      case '资阳市': 
        cityOpts = {
          city: opts.city,
          adCode: '512000000000'
        }
        break;

      case '阿坝州': 
        cityOpts = {
          city: opts.city,
          adCode: '513200000000'
        }
        break;

      case '甘孜州': 
        cityOpts = {
          city: opts.city,
          adCode: '513300000000'
        }
        break;

      case '凉山州': 
        cityOpts = {
          city: opts.city,
          adCode: '513400000000'
        }
        break;

      default: 
        cityOpts = {
          city: '成都市',
          adCode: '510100000000'
        }
        break;
    }
    return cityOpts;
  }
}
module.exports = staticMethod;
/*
* @file 四川政务服务微信小程序JS接口
* @author 梁亚军 1148063373@qq.com 2018.10.30
* staticPath.js 文件参数说明
*
*
* 该文件的全局变量：
*
* path H5页面接口的基础路径
* basePath requset接口的基础路径
* pathOpts 接口保存对象
*
* 
* pathOpts对象属性说明
*
* _mapAK 百度的AK
* _mapKey 高德的key
* _APPID 四川政务服务微信小程序的APPID
* _APPSECRET 四川政务服务微信小程序的APPSECRET
* _loginPath 小程序登录
* _authenticationPath 身份认证
* officeCheck 办件查询
* logisticsCheck 物流查询
* appointment 预约查询
* renameCheck 新生儿重名查询
* accumulationCheck 公积金查询
* cardIDCheck 身份证办理查询
* socialCheck 社保状态查询
* placesCheck 异地医疗查询
* enterpriseCheck 企业养老保险查询
* lnjuryCheck 工伤保险查询
* enterqualiCheck 住建企业资质查询
* personQualiCheck 住建人员资质查询
* projInformatCheck 住建项目信息
* enginehonerstyCheck 住建工程诚信
* jobhuntingCheck 住建工程诚信
* lifeCharge 生活缴费
*
*
*
*
*
*/
const lifeCharge = 'http://fspd.xiongmaody.com.cn/yzfSc/api/access/merchant';
const path = 'http://www.sczwfw.gov.cn/app/';
// const basePath = 'http://10.206.19.84:6008/wxSmallOpenAPI/';
const basePath = 'http://218.6.169.98:12081/move/moveApi/wxSmallOpenAPI/';

const pathOpts = {
  // 百度的AK
  _mapAK: 'W39Y0yRXud0iYe4f9Mvho3aSWyTKyqQ1',
  // mapKey
  _mapKey: 'c290b7e016c85e8f279b2f80018c6fbf',
  // appid
  _APPID: 'wx7510bd3245ee246d',
  // APPSECRET
  _APPSECRET: '99abc4c3df6669cafc823a0336ee0883',
  // 微信登录接口
  _loginPath: basePath + 'wxSmallRoutineLoginHandler',
  // 身份认证接口
  _authenticationPath: basePath + 'wxIdCardAuthenticationHandler',
  // 生活缴费
  lifeCharge: lifeCharge,
  // 办件查询
  officeCheck: path + 'weixinApply/queryApplyForWeixin',
  // 物流查询
  logisticsCheck: path + 'egov/weixin/index/logistics-tracking.jsp',
  // 预约
  appointment: path + 'egov/weixin/index/dist/index.html#/appoint/zfb/地域编码/加密的登录信息',
  // 新生儿重名
  renameCheck: path + 'egov/web/workGuide/RenameQuery.html',
  // 公积金查询
  accumulationCheck: path + 'egov/weixin/index/gjjcx.html?idCardNm=身份证号密文',
  // 身份证办理查询
  cardIDCheck: path + 'egov/web/workGuide/CidHandleQuery.html',
  // 社保状态查询
  socialCheck: path + 'egov/web/workGuide/socialQuery.html?UserCode=身份证号密文',
  // 异地医疗查询
  placesCheck: path + 'egov/web/workGuide/MedicalQuery.html',
  // 企业养老保险查询
  enterpriseCheck: path + 'egov/weixin/index/dist/index.html#/enterendowinsur/身份证号密文/地域编码',
  // 工伤保险查询
  lnjuryCheck: path + 'egov/weixin/index/dist/index.html#/empinjurysur/身份证号密文/地域编码',
  // 住建企业资质查询
  enterqualiCheck: path + 'egov/weixin/index/dist/index.html#/enterquali',
  // 住建人员资质查询
  personQualiCheck: path + 'egov/weixin/index/dist/index.html#/personQuali',
  // 住建项目信息
  projInformatCheck: path + 'egov/weixin/index/dist/index.html#/projInformat',
  // 住建工程诚信
  enginehonerstyCheck: path + 'egov/weixin/index/dist/index.html#/enginehonersty',
  // 住建工程诚信
  jobhuntingCheck: path + 'egov/weixin/index/dist/index.html#/jobhunting'
}
module.exports = pathOpts;
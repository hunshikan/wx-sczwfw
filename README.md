# sczwfw
四川政务服务的微信小程序

## 文件说明
1. pages 文件夹存放页面文件
2. src 文件夹存放项目静态文件
3. utils 文件夹存放项目插件文件
4. README.md 项目说明文件
5. app.js 项目全局js文件
6. app.json 项目全局配置文件
7. app.wxss 项目全局WXSS文件
8. project.config.json 项目基础配置

### PAGES 文件夹文件说明
1. "pages/index/index" 首页
2. "pages/shbx/shbx" 社会保险
3. "pages/gjj/gjj" 公积金
4. "pages/ylws/ylws" 医疗卫生
5. "pages/menu/menu" 交通出行
6. "pages/zfjs/zfjs" 住房建设
7. "pages/hysy/hysy" 婚育收养
8. "pages/hjbl/hjbl" 户籍办理
9. "pages/shjf/shjf" 生活缴费
10. "pages/qzzp/qzzp" 求职招聘


### SRC 文件夹文件说明
1. images 文件夹存放静态banner图片

### UTILS 文件夹文件说明
1. staticPicture.js 项目静态图标文件
2. utils.js 项目初始化插件文件 


,
  "tabBar": {
    "color": "#333333",
    "selectedColor": "#0195F8",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "src/tabbar/home1.png",
        "selectedIconPath": "src/tabbar/home0.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/consult/consult",
        "iconPath": "src/tabbar/consult1.png",
        "selectedIconPath": "src/tabbar/consult0.png",
        "text": "咨询"
      },
      {
        "pagePath": "pages/mine/mine",
        "iconPath": "src/tabbar/mine1.png",
        "selectedIconPath": "src/tabbar/mine0.png",
        "text": "我的"
      }
    ]
  }

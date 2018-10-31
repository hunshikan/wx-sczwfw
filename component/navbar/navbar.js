Component({
  properties: {
    navOPts: {
      type: Object,
      value: {title: '四川政务服务'},
      observer:(newVal, oldVal) => { }
    }
  },
  attached(){
    this._setNavigation();
  },
  data: {
    navOPts: {
      showIcon: true
    },
    _backIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAbCAYAAADoOQYqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBOTlERjlFMkJDRUYxMUU4OERGNUE1NDM4QTFBQzQwMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBOTlERjlFM0JDRUYxMUU4OERGNUE1NDM4QTFBQzQwMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE5OURGOUUwQkNFRjExRTg4REY1QTU0MzhBMUFDNDAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE5OURGOUUxQkNFRjExRTg4REY1QTU0MzhBMUFDNDAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jvtdYQAAA5pJREFUWEfNmEsodGEYx//jEqGIksSKWEiUlFLKipWFhZINcsllISSijAUJ5ZJLJIWUBdmxcSkpKVaykZ1LspFG7jnf/N/zzDdjLr6Zcfj8FnPm+Z/3eZ7/nPOet/cMNGF+fl47OjqS6HdBX/RnQ5leWlrSsrKytLy8PO34+Fid+C3QD33RH32SwPT0dPPg4CDI6+srdnZ2kJubi+joaKX9T87OztDQ0ACLxaLi/f19xMTEIND6Yb68vFQieX5+xubmJvLz8xEZGSnqz3N+fo7q6mrc3d2JovPy8gLT4+OjVltbi5OTE5F1YmNjMTs7i/j4eFF+jqurK1RVVeHm5kYUnbS0NExPTyMgNDQUExMTSE1NlVM6TKivr3dJ/G489aU/+qTfAAoREREYHx9HUlKSGmDj4uICjY2NuL29FeV7YR/2Y19H6Iv+6JOY+DSqb1b462pqalySUlJSMDMz8zfpO7i/v1e9T09PRdFJSEhQvTldbXwwTa6vr1FZWelyezifpqamEBYWJopxPDw8oK6uzu1zNTc3h7i4OFF01PRwhAM42Z2XPBZsbm7G09OTKMbAeqzrbJj96cPZMHExTRITEzE5OYmoqChRdA4PD9He3q7WcyNgHdZjXUfYl/3pwx1uTZPk5GSMjo4iPDxcFJ29vT10dnbi/f1dFP9gPuuwniPsx77s7wmPpgnnMQuEhISIorO9vY3u7m5uAUTxDeYxn3UcYZ+xsTHV9zM+NU0yMzMxMjKCoKAgUXQ2NjbQ39/vs3GOZx7zHWF99snIyBDFM/80TbKzszEwMOBifHV1VV0ZX+B45jnCuqzPPt7glWli3WnBbDYjIOBjyuLiolpHvYHjON4R1uvp6VH1vcVr06SwsBBdXV0S2aGZhYUFidzD8+5+HOsVFBRI5B0+mSZFRUVoa2uTyA5v+8rKikQfoe5uGrEO6/mKz6ZJSUmJ2iM4wwdsfX1dIh3G1J1hPuv4g1+mSXl5OSoqKiSyw3m/tbWlvvPI2BnmMd9fXPYevjI0NITl5WWJdLgalJWVwfp6hLe3N1F1SktL0dLSIpF/fNk00/v6+rC2tiaKZ4qLi9HR0QGTySSKf/g9PWzQAI1wZfkMnuc+46uGyZevtA3uJVpbW7G7uyuKHa7BnEbOa7y/GGaacNfW1NSEg4MDUYCcnBwMDw8jODhYFAOgaSPhi7L1LVr9T8EjY6Mx3DSxWCxab2+vOhqPpv0BuPcbWiENXX4AAAAASUVORK5CYII='
  },
  methods: {
    // 返回上一页
    _navback(){
      wx.navigateBack();
    },
    // 获取设备信息
    _setNavigation(){
      /*
      * 获取当前设备显示信号电池的高度
      * startBarHeight 设备电池信号部分高度，默认20px
      * navgationHeight title高度，默认44px
      */

      let startBarHeight = 20;
      let navgationHeight = 44;
      wx.getSystemInfo({
        success:(res) => {
          if (res.model == 'iPhone X') {
            startBarHeight = 44
          }
          this.setData({
            startBarHeight: startBarHeight,
            navgationHeight: navgationHeight
          })
        }
      })
    }
  }
})
// pages/gjj/gjj.js
const pageService = require('../../src/js/pageService.js');
const staticMethod = require('../../utils/staticMethod.js');

Page({
  data: {
    pageService: {}
  },
  onLoad (opts) {
    console.log(pageService)
    console.log(pageService[opts.type])
    this.setData({ pageService: pageService[opts.type]})
  },
  jumpMethod(e){
    staticMethod._jumpMethod({
      url: e.currentTarget.dataset.url
    })
  }
})
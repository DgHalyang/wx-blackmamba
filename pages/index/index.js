//引入promise 一定要把路径补全
import { request } from '../../request/index.js'

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  //页面开始加载就会触发
  onLoad: function (options) {
    // 发送请求
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();

    //原生请求数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   // data: {},
    //   // header: {'content-type':'application/json'},
    //   // method: 'GET',
    //   // dataType: 'json',
    //   // responseType: 'text',
    //   success: (result)=>{
    //     // 轮播图数据
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },

  // 获取轮播图数据
  getSwiperList () {
    request({ url: '/home/swiperdata' })
    .then(result => {
      // 轮播图数据
      this.setData({
        swiperList: result
      })
    })
  },
  // 获取分类数据
  getCatesList () {
    request({ url: '/home/catitems' })
    .then(result => {
      // 分类数据
      this.setData({
        catesList: result
      })
    })
  },
  //获取楼层数据
  getFloorList () {
    request({ url: '/home/floordata' })
    .then(result => {
      // 分类数据
      this.setData({
        floorList: result
      })
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
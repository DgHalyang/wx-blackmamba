import { request } from '../../request/index.js'
/**
 * 滚动加载
 * 1,找到滚动触底事件
 * 2,判断是都有下一页事件
 * (1)总页数 = Math.ceil(总条数 / 页容量pagesize)
 * (2)当前页数 pagenum
 * 3,如果有则加载下一页数据
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:'综合',
      isActive:true
    },{
      id:1,
      value:'销量',
      isActive:false
    },{
      id:2,
      value:'价格',
      isActive:false
    }],
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数id
    console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },
  //接口需要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPage:1,

  //滚动条触底事件


  //获取商品列表数据
  async getGoodsList(){
    const res = await request( { url:'/goods/search',data:this.QueryParams } );
    // console.log(res)
    //计算总页数
    const total = res.total;
    this.totalPage = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //手动关闭等待效果
    wx.stopPullDownRefresh()
  },

  //标题的点击事件，子组件传递过来的
  handTabsItemChangep(e){
    //获取被点击的标题索引值
    const { index } = e.detail;
    let { tabs } = this.data;
    // //修改源数组
    tabs.forEach((item,ind)=>{
      return ind===index ? item.isActive=true : item.isActive=false
    });
    // //赋值到data中
    this.setData({
      tabs
    })
  },

    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPage){
      //没有下一个数据
      wx.showToast({
        title: '没有下一页数据',
        icon:'none'
      });
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //重置数组
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
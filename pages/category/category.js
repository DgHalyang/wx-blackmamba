//引入promise 一定要把路径补全
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightList: [],
    // 左侧菜单点击
    leftIndex: 0,
    //右侧滚动条顶部距离
    scrollTop: 0,
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 0,web本地存储和小程序存储
     * web:会调用toString()方法,存入的是字符串
     * 小程序:不会隐式转换
     * 1，判断本地缓存中是否有旧数据
     * {time:Date.now(),date:[...]}
     * 2，没有数据则发送请求
     * 3, 有旧数据，但要判断是否有过期
     */
    // 获取是否有本地数据
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      //有旧数据，判断是否过期
      if (Date.now() - Cates.time > 1000 * 50) {
        this.getCates();
      } else {
        //使用旧数据
        this.Cates = Cates.data;
        //获取左边的菜单数据
        let leftMenuList = this.Cates.map(item => item.cat_name);
        //获取右边的商品数据
        let rightList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightList
        })
      }
    }
  },
  //左侧菜单点击事件
  leftTab(e) {
    // 获取索引值
    let { index } = e.currentTarget.dataset;
    // 获取右侧数据
    let rightList = this.Cates[index].children;
    this.setData({
      leftIndex: index,
      rightList,
      //重新设置 右侧内容滚动条的顶部距离
      scrollTop: 0
    })

  },

  //async await 获取分类数据
  async getCates() {
    const result = await request({ url: '/categories' });
    console.log(result);
    // 分类数据
    this.Cates = result;
    // console.log(this.Cates);
    // 将数据本地存储，因为每次请求的数据很大
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })
    //获取左边的菜单数据
    let leftMenuList = this.Cates.map(item => item.cat_name);
    //获取右边的商品数据
    let rightList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightList
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
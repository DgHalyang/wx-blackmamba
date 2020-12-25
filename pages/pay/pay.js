// 引入封装为Promise方式的微信api
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    selectArr: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //设置购物车状态 并计算 全选 价格 数量
  setCart(cart) {
    //计算总数量 和 总价格
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      if (item.checked) {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price
      } else {
        allChecked = false
      }
    })
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    //给data赋值
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync("cart", cart);
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
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    //获取缓存中的的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(item => item.checked)
    this.setData({
      address
    })
    //计算总数量 和 总价格
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price
    })
    //给data赋值
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
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
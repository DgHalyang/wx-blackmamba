/**
 * 微信支付
 * 1，哪些人 哪些账号 可以实现微信支付
 * (1)企业账号
 * (2)企业账号的小程序后台中 必须给开发者添上白名单
 *   1，一个appid可以同时绑定多个开发者
 *   2，这些开发者就可以公共这个appid和它的开发权限
 * 
 * 点击支付按钮
 * 1，先判断是否有token
 * 2，没有就跳到授权页面，获取token
 */

// 引入封装为Promise方式的微信api
import { requestPayment, getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';
import { request } from '../../request/index.js'

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

  //支付
  async handlePay(){
    try {
          //获取缓存中的token
    const token = wx.getStorageSync('token');
    if(!token){
      //跳转到获取token的页面
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    }
    // 有token时创建订单
    // 准备请求头参数
    const header = {Authorization:token};
    // 准备请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(item=>goods.push({
      goods_id:item.goods_id,
      goods_number:item.num,
      goods_price:item.goods_price
    }))
    // 发送请求创建订单 获取订单号
    const orderParams = { order_price, consignee_addr, goods}
    const { order_number } = await request(
      {
        url:"/my/orders/create",
        method:"POST",
        data:orderParams,
        header
      })
    // 5 发起 预支付接口
    const { pay } = await request(
      { 
        url: "/my/orders/req_unifiedorder", 
        method: "POST", 
        data: { order_number },
        header 
      });
    // console.log(pay)
    // 发起微信支付
    await requestPayment(pay);
    // console.log(res)
    // 查询后台 订单状态
    const res = await request(
      { 
        url: "/my/orders/chkOrder", 
        method: "POST", 
        data: { order_number } 
      });
    // 支付成功
    await showToast({ title: "支付成功" });
    // 8 支付成功了 跳转到订单页面
    wx.navigateTo({
      url: '/pages/order/order'
    });
    } catch (error) {
      console.log(error)
      // 支付失败
      await showToast({ title: "支付失败" })
    }
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
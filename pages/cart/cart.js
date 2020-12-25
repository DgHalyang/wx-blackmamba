// 引入封装为Promise方式的微信api
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    selectArr: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击收货地址
  async handleAddress() {
    try {
      //获取权限
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false) {
        //用户曾经拒绝授予权限 先诱导用户打开授权页面
        await openSetting();
      }
      //调用获取收货地址api
      const res2 = await chooseAddress();
      //拼接完整地址，再存入缓存中
      res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
      // console.log(res2);
      // 存入到缓存中
      wx.setStorageSync("address", res2);
    } catch (error) {
      console.log(error)
    }


    // 正确流程(未优化)
    // wx.getSetting({
    //   success: (result)=>{
    //     // 1,获取地址权限状态 authSetting scope.address
    //     // scope.address: true 表示点击确定
    //     // 属性名为scope.address,所以要使用[]形式来获取属性值
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       // api -> wx.chooseAddress 获取用户的收货地址
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           // 收货地址相关信息
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       //用户曾经拒绝授予权限 先诱导用户打开授权页面
    //       // api -> wx.openSetting
    //       wx.openSetting({
    //         success: (result2)=>{
    //           // console.log(result2);
    //           //可以调用 收货地址代码
    //           wx.chooseAddress({
    //             success:(result3)=>{
    //               // 收货地址相关信息
    //               console.log(result3)
    //             }
    //           })
    //         },
    //       });
    //     }
    //   },
    // });
  },
  //商品选中点击
  handleChecked(e) {
    //获取商品id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let { cart } = this.data;
    //根据id找到商品
    let index = cart.findIndex(item => item.goods_id === goods_id);
    //改变商品状态
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  //全选按钮
  handleAllChecked(e) {
    //获取购物车数组,全选状态
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach(item => item.checked = allChecked);
    this.setCart(cart);
  },

  // 支付按钮
  async hanldePay(){
    
    const { address, totalNum } = this.data;
    //判断收货地址
    if(!address.userName){
      await showToast('您还没有选择地址!');
      return
    }
    //判断用户有没有选购商品
    if(totalNum === 0){
      await showToast('您还没有商品!');
      return
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  },

  //加和减按钮
  async handleNum(e) {
    const id = e.currentTarget.dataset.id;
    const changeNum = e.currentTarget.dataset.index;
    let { cart } = this.data;
    const index = cart.findIndex(item => item.goods_id === id);
    if (cart[index].num === 1 && changeNum === -1) {
      //弹窗提示
      try {
        const res = await showModal("您是否要删除?");
        if (res.confirm) {
          cart.splice(index, 1)
          this.setCart(cart)
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      cart[index].num += changeNum;
      this.setCart(cart)
    }
  },

  //设置购物车状态 并计算 全选 价格 数量
  setCart(cart) {
    //计算全选 空数组调用every为true
    let allChecked = true;
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
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(cart)

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
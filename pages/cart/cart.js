// 引入封装为Promise方式的微信api
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击收货地址
  async handleAddress(){
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
import { request } from '../../request/index.js'
import { login } from '../../utils/asyncWx.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  async getUserInfo(e) {
    try {
      // console.log(e.detail)
      // 获取用户信息
      const { encryptedData, iv, rawData, signature } = e.detail;
      // 获取小程序登录后的code
      const { code } = await login();
      const params = { encryptedData, iv, rawData, signature, code };
      //发送请求获取token值 非企业账号和白名单无法获取
      // const { token } = await request(
      //   {
      //     url: "/users/wxlogin",
      //     method: "post",
      //     data: params
      //   });
      // console.log(token)
      //自己写的token
      // const token="BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      //把token存入缓存中，同时跳转回上一个页面
      wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
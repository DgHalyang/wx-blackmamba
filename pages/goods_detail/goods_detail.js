import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    // 商品是否被收藏
    isCollect:false
  },
  // 全局定义，方便轮播图点击放大
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const { goods_id }  = options;
    // console.log(goods_id);
    // this.getGoodsDeatil(goods_id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 经常需要打开，所以使用onShow生命周期
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail (goods_id) {
    const goodsObj = await request({url:'/goods/detail', data:{ goods_id }});
    this.GoodsInfo = goodsObj;
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(item => item.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      // goodsObj:res
      goodsObj:{
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        //部分iphone手机 不识别 webp图片格式
        //确认后台存在  1.webp=>1.jpg 用replace方法
        goods_introduce:goodsObj.goods_introduce,
        pics:goodsObj.pics
      },
      isCollect
    })
  },

  //点击轮播图放大预览
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(item=>item.pics_mid)
    //接受传递的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handleAddCart(){
    //获取缓存数组
    let cart = wx.getStorageSync("cart") || [];
    //判断是否存在商品
    let index = cart.findIndex(item=>item.goods_id === this.GoodsInfo.goods_id);
    if(index === -1) {
      //不存在 第一次添加 添加一个参数num 值为1
      this.GoodsInfo.num = 1;
      //一开始默认选中
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo);
    } else {
      //存在 +1
      cart[index].num++;
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 1500,
      //防止用户手抖 疯狂点击
      mask: true
    });
  },
  // 点击 商品收藏图标
  handleCollect() {
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
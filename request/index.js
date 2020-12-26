// 导出一个方法，返回promise

//同时发送异步请求代码的次数
let ajaxTime = 0;
export const request=(params)=>{
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...params.header};
    if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
    }

    ajaxTime++;
    //显示加载中效果
    wx.showLoading({
        title: '加载中',
        mask:true
    })

    // 定义公共的url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            // 请求头
            header:header,
            // url拼接
            url:baseUrl + params.url,
            success:(result)=>{
                //成功传递result.data.message作为参数
                resolve(result.data.message);                     
            },
            fail:(err)=>{
                wx.showToast({
                    title: err.meta.msg,
                    icon: 'none',
                });
                reject(err)
            },
            // 都会触发的函数，关闭loading图标
            complete:()=>{
                // ajaxTime 为了处理首页一开始请求多个ajax请求
                // loading的显示问题
                ajaxTime--;
                if(ajaxTime===0){
                    // 关闭showLoading
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 1000)
                } 
            }
        })
    })
}
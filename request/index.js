// 导出一个方法，返回promise

//同时发送异步请求代码的次数
let ajaxTime = 0;
export const request=(params)=>{
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
            // url拼接
            url:baseUrl + params.url,
            success:(result)=>{
                //成功传递result.data.message作为参数
                resolve(result.data.message);                     
            },
            fail:(err)=>{
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
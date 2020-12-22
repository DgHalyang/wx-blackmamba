// 导出一个方法，返回promise
export const request=(params)=>{
    // 定义公共的url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            // url拼接
            url:baseUrl + params.url,
            success:(result)=>{
                //成功传递result.data.message作为参数
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}
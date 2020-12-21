// 导出一个方法，返回promise
export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}
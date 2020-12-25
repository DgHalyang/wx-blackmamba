//Promise形式的 getSetting  方便cart.js中使用
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

//Promise形式的 chooseAddress  方便cart.js中使用
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}


//Promise形式的 openSetting  方便cart.js中使用
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}

//Promise形式的 showModal  可以传递文字
export const showModal = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res)
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

//Promise形式的 showToast  可以传递文字
export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                console.log(err)
                reject(err);
            }
        });
    })
}
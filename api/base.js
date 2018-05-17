class Base{
  constructor(){
    this.baseUrl = "https://api.wyf6.com"
    // this.baseUrl = "https://easy-mock.com/mock/5a5cfb6266e506590b1e37af/car"
  }
  request(params){
    let token = wx.getStorageSync('token')
      return new Promise((resolve, reject) => {
          wx.request({
              url: this.baseUrl + params.url,
              method: params.method,
              header: {
                  'Authorization': `Bearer ${token}`
              },
              data: params.data,
              success: res => {
                //   if(token){
                //       wx.showLoading({
                //           title: '加载中',
                //       })
                //       resolve(res.data)
                //       wx.hideLoading()
                //   }else{
                //       console.log('未获取token')
                //   }
                      wx.showLoading({
                          title: '加载中',
                      })
                      resolve(res.data)
                      wx.hideLoading()
              }
          })

      })
  }

}

export {Base}
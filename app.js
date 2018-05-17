import {My} from "./api/my.js"
let my = new My()

App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {

        wx.request({
          url: 'https://api.wyf6.com/login',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data.accessToken)
          }
        })
      }
    })

    wx.getUserInfo({
        success: function (res) {
            var objz = {};
            objz.avatarUrl = res.userInfo.avatarUrl;
            objz.nickName = res.userInfo.nickName;
            objz.sex = res.userInfo.gender;
            let flag = wx.getStorageSync('userInfo')
            if (!flag) {
                wx.setStorageSync('userInfo', objz);//存储userInfo
                let name = objz.nickName,
                    avatar = objz.avatarUrl
                my.postUserInfo(phone, name, avatar, remark).then(res => {
                    // console.log(res.data)
                })
            }

        }
    });

  },
  globalData: {
    userInfo: null
  }
})
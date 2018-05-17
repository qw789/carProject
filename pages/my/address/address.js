
Page({
    data: {

    },
    onLoad: function (options) {
        this.setTitle()
    },
    toEdit() {
        wx.chooseAddress({
            success:function(res){
                this.setData({
                   name:res.userName,
                   phone:res.telNumber,
                   address:`${res.provinceName} ${res.cityName} ${countyName} ${detailInfo}`
                })
            }
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '我的地址',
        })
    }
})
import {My} from '../../api/my.js'
let my = new My()

Page({
    data: {
        avatar: "../../images/wx_avatar.png",
        nickName: ''
    },
    onLoad: function (options) {
        
        this.setTitle()
    },
    onShow(){
        this.getUser()
    },
    getUser() {
        // let user = wx.getStorageSync('userInfo')
        // this.setData({
        //     avatar: user.avatarUrl,
        //     nickName: user.nickName,
        // })
        my.getUserInfo().then(res=>{
            console.log('info',res.data)
            this.setData({
                nickName:res.data.nickname,
                avatar:res.data.profilePicture
            })
        })
    },
    toCollection() {
        wx.navigateTo({
            url: './collection/collection',
        })
    },
    toAddress() {
        // wx.navigateTo({
        //     url: './address/address',
        // })
        wx.chooseAddress({
            success:res=>{
                console.log(res)
                my.postAddress(res.cityName,res.countyName,res.detailInfo,res.nationalCode,res.postalCode,res.provinceName,res.telNumber,res.userName).then(res=>{
                    console.log(res)
                })
            }
        })
    },
    toAnswer() {
        wx.navigateTo({
            url: './answer/answer',
        })
    },
    toMessage() {
        wx.navigateTo({
            url: './message/message',
        })
    },
    toHistory() {
        wx.navigateTo({
            url: './history/history',
        })
    },
    toFeedback() {
        wx.navigateTo({
            url: './feedback/feedback',
        })
    },
    toEdit() {
        wx.navigateTo({
            url: './editMy/editMy',
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '个人中心',
        })
    }
})
import { My } from "../../../api/my.js"
let my = new My()

Page({
    data: {
        systemIcon:"../../../images/icon_xttzh.png",
        otherIcon:"../../../images/icon_qtxx.png",
        system:'系统消息',
        other:'其他消息'
    },
    onLoad: function (options) {
        this.setTitle()
        this._getMsg()
    },
    _getMsg() {
        my.getMyMsg().then(res=>{
            console.log(res.data)
            this.setData({
                messageList:res.data
            })
        })

    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '我的消息',
        })
    },
    onShareAppMessage: function () {

    }
})
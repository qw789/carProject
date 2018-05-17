import {Home} from "../../../api/home.js"
import {My} from "../../../api/my.js"
let home = new Home()
let my = new My()

var WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        page:1,
        type:"article",   
    },
    onLoad: function (options) {
        this.data.id = options.id
        this.setTitle()
        
    },
    onReady(){
        
    },
    onShow(){
        this._getComment()
        this._getDetail()
    },
    toComment(){
        console.log('c')
        console.log(this.data.cHeight)
        wx.pageScrollTo({
            scrollTop: this.data.cHeight,
            duration: 300
        })
    },
    toShare(){
        wx.showShareMenu({
            withShareTicket: true
        })
        console.log('share')
    },
    getInput(e){
        my.getUserInfo().then(res=>{
            let mobile = res.data.mobilePhone
            let name = res.data.nickname
            if(!name){
                wx.getUserInfo({
                    success:res=>{
                        let phone,
                            name = res.userInfo.nickName,
                            avatar = res.userInfo.avatarUrl
                         my.postUserInfo(phone,name,avatar).then(res=>{
                            if(res.code == 0){
                                if(!mobile){
                                        wx.navigateTo({
                                            url: '../bindPhone/bindPhone',
                                        })
                                }else{
                                    wx.navigateTo({
                                        url: `../comment/comment?id=${this.data.id}`,
                                    })
                                }
                            }
                         })
                    }
                })
            }else{
                if (!mobile) {
                    wx.navigateTo({
                        url: '../bindPhone/bindPhone',
                    })
                } else {
                    wx.navigateTo({
                        url: `../comment/comment?id=${this.data.id}`,
                    })
                }
            }
        })
        
    },
    _getDetail(){
        home.getDetail(this.data.id).then(res=>{
            console.log(res)
            var article = res.data.content
            var that = this
            WxParse.wxParse('article', 'md', article, that,15);
            this.data.type = res.data.resourceType
            this.setData({
                detail:res.data,
                isCollection:res.data.collection,
                comments:res.data.comments
            },()=>{
                this.queryMultipleNodes()
            })
        })
    },
    _getComment(){
        home.getComment(this.data.id).then(res=>{
            this.setData({
                commentList:res.data
            })
        })
    },
    _postComment(){
        let id = this.data.id,
            comment = this.data.comment
        home.postComment(id,comment).then(res=>{
            console.log('post_comment',res.data)
        })
    },
    collection(e){
        console.log(e.detail)
        if(e.detail.isCollection == true){
            let _type = this.data.type
            if(_type == 'article'){
                _type = "ARTICLE"
            }else if(_type == 'video'){
                _type = "VIDEO"
            }else if(_type == 'audio'){
                _type = "AUDIO"
            }
            home.addCollection(this.data.id,_type).then(res=>{
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        }else if(e.detail.isCollection == false){
            home.deleteCollection(this.data.id).then(res=>{
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        }
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '资讯详情',
        })
    },
    onReachBottom(){
        this.data.page++
        home.getComment(this.data.id,this.data.page).then(res=>{
            this.data.commentList = this.data.commentList.concat(res.data)
            this.setData({
                commentList:this.data.commentList
            })
        })
    },
    queryMultipleNodes: function () {
        wx.createSelectorQuery().select('#information').boundingClientRect(rect=> {
            // rect.id      // 节点的ID
            // rect.dataset // 节点的dataset
            // rect.left    // 节点的左边界坐标
            // rect.right   // 节点的右边界坐标
            // rect.top     // 节点的上边界坐标
            // rect.bottom  // 节点的下边界坐标
            // rect.width   // 节点的宽度
            // rect.height  // 节点的高度
            this.data.cHeight = rect.height
            console.log(rect.bottom)
            console.log(rect)
            console.log(this.data.cHeight)
        }).exec()
    },
    onShareAppMessage: function () {
        return {
            title: '汽车立体声',
            path: `/pages/home/informationDetail/informationDetail?id=${this.data.id}`,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
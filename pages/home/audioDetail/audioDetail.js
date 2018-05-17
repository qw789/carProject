import { Home } from "../../../api/home.js"
import { My } from "../../../api/my.js"
let home = new Home()
let my = new My()

Page({
    data: {
        page: 1,
        type: 'audio'
    },
    onLoad: function (options) {
        this.data.id = options.id
        this.setTitle()
    },
    onShow() {
        this._getComment()
        this._getDetail()
    },
    getInput(e) {
        my.getUserInfo().then(res => {
            let mobile = res.data.mobilePhone
            let name = res.data.nickname
            if (!name) {
                wx.getUserInfo({
                    success: res => {
                        let phone,
                            name = res.userInfo.nickName,
                            avatar = res.userInfo.avatarUrl
                        my.postUserInfo(phone, name, avatar).then(res => {
                            if (res.code == 0) {
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
                    }
                })
            } else {
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
    _getDetail() {
        home.getDetail(this.data.id).then(res => {
            console.log(res)
            this.setData({
                detail: res.data,
                isCollection: res.data.isCollection,
                comments: res.data.comments
            })
        })
    },
    _getComment() {
        home.getComment(this.data.id).then(res => {
            this.setData({
                commentList: res.data
            })
        })
    },
    _postComment() {
        let id = this.data.id,
            comment = this.data.comment
        home.postComment(id, comment).then(res => {
            console.log('post_comment', res.data)
        })
    },
    collection(e) {
        if (e.detail.isCollection == true) {
            let _type = this.data.type
            if (_type == 'article') {
                _type = "ARTICLE"
            } else if (_type == 'video') {
                _type = "VIDEO"
            } else if (_type == 'audio') {
                _type = "AUDIO"
            }
            home.addCollection(this.data.id, _type).then(res => {
                console.log(res)
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        } else if (e.detail.isCollection == false) {
            home.deleteCollection(this.data.id).then(res => {
                console.log(res)
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                })
            })
        }
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '音频详情',
        })
    },
    onReachBottom() {
        this.data.page++
        home.getComment(this.data.id, this.data.page).then(res => {
            this.data.commentList = this.data.commentList.concat(res.data)
            this.setData({
                commentList: this.data.commentList
            })
        })
    },
    onShareAppMessage: function () {
        return {
            title: '汽车立体声',
            path: `/pages/home/audioDetail/audioDetail?id=${this.data.id}`,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
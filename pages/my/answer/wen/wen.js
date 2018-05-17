import { Home } from "../../../../api/home.js"
import {My} from "../../../../api/my.js"
let home = new Home()
let my = new My()

Page({
    data: {
        canPost: false,
        overNum: false,
        currentNum: 0
    },
    onLoad: function (options) {
        this.data.id = options.id
        this.setTitle()
    },
    getComment(e) {
        this.data.comment = e.detail.value
        let length = e.detail.value.length
        if (length > 1 && length < 60) {
            this.setData({
                canPost: true
            })
        } else {
            this.setData({
                canPost: false
            })
        }
        if (length > 60) {
            this.setData({
                overNum: true
            })
        }
        this.setData({
            currentNum: length
        })

    },
    _postComment() {
        let id = this.data.id,
            comment = this.data.comment
        if (!comment || comment.length > 60) {
            this.setData({
                isErr: true
            })
            return
        }
        home.postComment(id, comment).then(res => {
            console.log(res.data)
            if (res.code == 200) {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    _postQuestion() {
        my.postQuestion(this.data.comment).then(res => {
            console.log(res)
        }).then(res => {
            wx.navigateBack({
                delta: 1
            })
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '提问',
        })
    },
    onShareAppMessage: function () {

    }
})
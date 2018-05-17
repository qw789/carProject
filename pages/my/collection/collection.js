import {Home} from "../../../api/home.js"
import {My} from "../../../api/my.js"
let home = new Home()
let my = new My()

Page({
    data: {
        navList: ["车型", "文章", "音频", "视频"],
        carHide: false,
        articleHide: true,
        audioHide:true,
        videoHide:true
    },
    onLoad: function (options) {
        this.setTitle()
        this._getCollection()
    },
    toVideoDetail(e) {
        wx.navigateTo({
            url: `../../home/videoDetail/videoDetail?id=${e.detail}`,
        })
    },
    toAudioDetail(e) {
        wx.navigateTo({
            url: `../../home/audioDetail/audioDetail?id=${e.detail}`,
        })
    },
    toCarDetail(e){
        wx.navigateTo({
            url: `../../car/carDetail/carDetail?id=${e.detail}`,
        })
    },
    toArticleDetail(e){
        wx.navigateTo({
            url: `../../home/informationDetail/informationDetail?id=${e.detail}`,
        })
    },
    changeTab(e) {
        let index = e.detail.index
        this.isTab(index)
    },
    isTab(index) {
        let carHide = true,
            articleHide = true,
            audioHide = true,
            videoHide = true
        if (index == 0) {
            carHide = false
        } else if (index == 1) {
            articleHide = false
        } else if (index == 2) {
            audioHide = false
        } else if(index == 3){
            videoHide = false
        }
        this.setData({
            carHide: carHide,
            articleHide: articleHide,
            audioHide: audioHide,
            videoHide:videoHide
        })
    },
    _getCollection(index){
        my.getCollection('SERIES').then(res=>{
            this.setData({
                carList: res.data
            })
        })

        my.getCollection('ARTICLE').then(res => {
            this.setData({
                articleList: res.data
            })
        })

        my.getCollection('AUDIO').then(res => {
            this.setData({
                audioList: res.data
            })
        })

        my.getCollection('VIDEO').then(res=>{
            this.setData({
                videoList:res.data
            })
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '收藏',
        })
    }
})
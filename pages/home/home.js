import { Home } from "../../api/home.js"
let home = new Home()

Page({
    data: {
        currentTab: 0,
        isInfo: true,
        isAudio: false,
        isVideo: true,
        infoBanner: [],
        audioCategory: [],
        articleCategory: [],
        videoCategory: [],
        vCategory: [],
        articlePage: 1,
        videoPage: 1,
        audioPage: 1
    },
    onLoad: function (options) {
        this._getInformationBanner()
        this._getAudioBanner()
        this._getVideoBanner()
        this._getAudioCategory()
        this._getArticleCategory()
        this._getVideoCategory()
        this._getAudioList()
        this._getArticleList()
        this._getVideoList()
    },
    videofilter(e) {
        console.log(e.detail)
        this._getVideoList(e.detail)
    },
    changeTab(e) {
        let index = e.currentTarget.dataset.index
        this.isTab(index)
        this.setData({
            currentTab: index
        })
    },
    currentArticleTag(e) {
        let id = e.detail
        console.log(id)
        this._getArticleList(id)
    },
    currentAudioTag(e){
        let id = e.detail
        this._getAudioList(id)
    },
    isTab(index) {
        let isInfo = true
        let isAudio = true
        let isVideo = true
        if (index == 1) {
            isInfo = false
        } else if (index == 0) {
            isAudio = false
        } else if (index == 2) {
            isVideo = false
        }
        this.setData({
            isInfo: isInfo,
            isAudio: isAudio,
            isVideo: isVideo
        })
    },
    toAudioDetail(e) {
        let index = e.detail.index
        let id = e.detail.id
        wx.navigateTo({
            url: `./audioDetail/audioDetail?id=${id}`,
        })
    },
    toInformationDetail(e) {
        let index = e.detail.index
        let _type = e.detail.type
        let resourceType = e.detail.resourcetype
        let id = e.detail.id
        wx.navigateTo({
            url: `./informationDetail/informationDetail?id=${id}`,
        })
    },
    toVideoDetail(e) {
        let id = e.detail.id
        
        wx.navigateTo({
            url: `./videoDetail/videoDetail?id=${id}`,
        })
    },
    _getInformationBanner() {
        home.getBanner('article').then(res => {
            console.log(res)
            this.setData({
                infoBanner: res.data
            })
        })
    },
    _getAudioBanner() {
        home.getBanner('audio').then(res => {
            this.setData({
                audioBanner: res.data
            })
        })
    },
    _getVideoBanner() {
        home.getBanner('video').then(res => {
            this.setData({
                videoBanner: res.data
            })
        })
    },
    _getAudioCategory() {
        home.getCategory('audio').then(res => {
            let category = []
            res.data.map((item, index, array) => {
                category.push({ name: item.name, id: item.id })
            })
            this.setData({
                audioCategory: category
            })
        })
    },
    _getArticleCategory() {
        home.getCategory('article').then(res => {
            let category = []
            res.data.map((item, index, array) => {
                category.push({ name: item.name, id: item.id })
            })
            this.setData({
                articleCategory: category
            })
        })
    },
    _getVideoCategory() {
        home.getCategory('video').then(res => {
            console.log('cate',res)
            let category = []
            let cate = []
            res.data.map((item, index, array) => {
                category.push({ name: item.name, id: item.id })
            })
            cate = category.slice(0, 4)
            this.setData({
                videoCategory: category,
                vCategory: cate
            })
        })
    },
    _getAudioList(_type) {
        let resourceType = 'audio'
        home.getHomeList(resourceType,_type).then(res => {
            console.log('audio',res.data)
            res.data.map(function (item, index, array) {
                if (item.covers.length == 1) {
                    if (item.title.length > 30) {
                        item.title = item.title.substring(0, 30) + '...'

                    }
                } else {
                    if (item.title.length > 25) {
                        item.title = item.title.substring(0, 19) + '...'
                    }
                }
            })
            this.setData({
                audioList: res.data
            })
        })
    },
    _getArticleList(_type) {
        let resourceType = 'article'
        home.getHomeList(resourceType, _type).then(res => {
            console.log(res)
            res.data.map(function (item, index, array) {
                if (item.covers.length == 1) {
                    if (item.title.length > 30) {
                        item.title = item.title.substring(0, 30) + '...'

                    }
                } else {
                    if (item.title.length > 25) {
                        item.title = item.title.substring(0, 19) + '...'
                    }
                }
            })
            this.setData({
                articleList: res.data
            })
        })
    },
    _getVideoList(_type) {
        let resourceType = 'video'
        home.getHomeList(resourceType,_type).then(res => {
            //   res.data.map(function (item, index, array) {
            //       if (item.covers.length == 1) {
            //           item.title = item.title.substring(0, 30) + '...'
            //       } else {
            //           item.title = item.title.substring(0, 19) + '...'
            //       }
            //   })
            console.log('video',res.data)
            this.setData({
                videoList: res.data
            })
        })
    },
    onReachBottom() {
        let current = this.data.currentTab
        if (current == 2) {
            this.data.videoPage++
            let _type = 'video',
                tag,
                page = this.data.videoPage
            home.getHomeList(_type, tag, page).then(res => {
                this.data.videoList = this.data.videoList.concat(res.data)
                this.setData({
                    videoList: this.data.videoList
                })
            })
        }else if(current == 0){
            this.data.audioPage++
            let _type = 'audio',
                tag,
                page = this.data.audioPage
            home.getHomeList(_type, tag, page).then(res => {
                this.data.audioList = this.data.audioList.concat(res.data)
                this.setData({
                    audioList: this.data.audioList
                })
            })
        }else if(current == 1){
            this.data.articlePage++
            let _type = 'article',
                tag,
                page = this.data.audioPage
            home.getHomeList(_type, tag, page).then(res => {
                this.data.articleList = this.data.articleList.concat(res.data)
                this.setData({
                    articleList: this.data.articleList
                })
            })
        }
    }
})
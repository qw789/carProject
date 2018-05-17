
Component({
    properties: {
        isHide: {
            type: Boolean,
            value: true
        },
        tagList: {
            type: Array,
            value: ['全部', '原创视频', '改装/性能', '卡车之声']
        },
        tagsList: {
            type: Array,
            value: ['全部', '原创视频', '改装/性能', '卡车之声', '聊车评车', '到店实拍']
        },
        videoList: {
            type: Array,
            value: []
        }
    },
    data: {
        isExpand: false,
        animationData: {}
    },
    methods: {
        currentTag(){

        },
        isExpand() {
            this._animation()
            this.setData({
                isExpand: !this.data.isExpand,
                currentIndex: -1
            })
        },
        _animation() {
            var animation = wx.createAnimation({
                duration: 150,
                timingFunction: 'linear',
            })

            this.animation = animation

            if (!this.data.isExpand) {
                animation.rotate(180).step()
            } else {
                animation.rotate(0).step()
            }

            this.setData({
                animationData: animation.export()
            })
        },
        filter(e){
            let index = e.currentTarget.dataset.index
            let id = e.currentTarget.dataset.id
            this.setData({
                currentIndex:index,
                id:id
            })
            this.triggerEvent('filter',id)
        },
        filters(e) {
            let index = e.currentTarget.dataset.index
            let id = e.currentTarget.dataset.id
            this.triggerEvent('filters', id)
            let tag = this.data.tagList
            let tags = this.data.tagsList
            let currentIndex
            if(index>2){
                let replace = tags[index]
                tag.splice(3, 1, replace)
                currentIndex = 3
            }else{
                currentIndex = index
            }
            this._animation()
            this.setData({
                currentIndex: index,
                tagList: tag,
                currentIndex: currentIndex,
                isExpand: false,
                id:id
            })
            
        },
        toDetail(e) {
            let detail = e.currentTarget.dataset
            this.triggerEvent('toDetail', detail)

        },
        network(){
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType
                    if(networkType != 'wifi'){
                        wx.showModal({
                            title: '提示',
                            content: '您正在使用非wifi网络，播放将会产生流量费用',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                    return
                                }
                            }
                        })
                    }
                }
            })
        }
    }
})

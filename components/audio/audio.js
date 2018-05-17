
Component({
    options: {
        multipleSlots: true
    },
    properties: {
        isHide: {
            type: Boolean,
            value: true
        },
        bannerList: {
            type: Array,
            value: []
        },
        homeList: {
            type: Array,
            value: []
        },
        tagList: {
            type: Array,
            value: ['全部', '新闻', '评测', '导购', '卡车之声', '用车', '文化', '改装']
        }
    },
    data: {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        currentTag: 0
    },
    methods: {
        currentTag(e) {
            let index = e.currentTarget.dataset.index
            let id = e.currentTarget.dataset.id
            this.triggerEvent('currentTag', id)
            this.setData({
                currentTag: index
            })
        },
        toDetail(e) {
            let detail = e.currentTarget.dataset
            this.triggerEvent('toDetail', detail)
        }
    }
})

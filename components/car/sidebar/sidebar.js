// components/car/sidebar/sidebar.js
Component({
    properties: {
        animationData: {
            type: Object,
            value: {}
        },
        showSide: {
            type: Boolean,
            value: false
        },
        dataList: {
            type: Array,
            value: []
        },
        name: {
            type: String,
            value: ''
        }
    },
    data: {

    },
    ready(){
        this.getRect()
    },
    // queryMultipleNodes: function () {
    //     var query = wx.createSelectorQuery().in(this)
    //     query.select('#sidebar').boundingClientRect(function (res) {
    //         console.log(res) // 这个组件内 #the-id 节点的上边界坐标
    //     }).exec()
    // },
    methods: {
        toDetail(e){
            let id = e.currentTarget.dataset.id
            this.triggerEvent('toDetail',id)
        },
        hideSide() {
            this.triggerEvent('hideSide')
            this.setData({
                showSide: false
            })

            this.hideAnimation()
        },
        hideAnimation() {
            let animation = wx.createAnimation({
                duration: 250,
                timingFunction: "linear",
                delay: 0,
                transformOrigin: "0 0 0",
            })

            this.animation = animation

            animation.translateX().step()

            this.setData({
                animationData: animation.export()
            })
        },
        cancelBubble() {

        },
        getRect: function () {
            console.log('getRect')
            var query = wx.createSelectorQuery()
            query.select('#sidebar').boundingClientRect()
            query.selectViewport().fields({
                size:true
            },function(res){
                console.log(res)
                console.log('res')
                // width = res.width
                this.triggerEvent('getRect', res)
            })
            
        }
    }
})

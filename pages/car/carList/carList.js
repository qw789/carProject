import { Car } from "../../../api/car.js"
let car = new Car()

Page({
    data: {
        navList: ["全部", "轿车", "SUV", "MPV"],
        currentTab: 0,
        page:1
    },
    onLoad: function (options) {
        this.data.sort = options.sort
        this.setData({
            sort : this.data.sort
        })
        this.setTitle(this.data.sort)
        if(this.data.sort == 1){
            this._getHotTypeMore()
        }else{
            this._getNewTypeMore()
        }
        
    },
    toDetail(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `../carDetail/carDetail?id=${id}`,
        })
    },
    nav(e) {
        let index = e.currentTarget.dataset.index
        if (this.data.sort == 1) {
            this._getHotTypeMore(index)
        } else {
            this._getNewTypeMore(index)
        }
        this.setData({
            currentTab: index
        })
    },
    setTitle(sort) {
        if(sort == 1){
            wx.setNavigationBarTitle({
                title: '热门车型',
            })
        }else{
            wx.setNavigationBarTitle({
                title: '上市新车',
            })
        }
        
    },
    _getHotTypeMore(_type,page){
        _type = _type || 0
        let size
        car.getHotTypeMore(_type,page,size).then(res=>{
            this.setData({
                carList:res.data
            })
        })
    },
    _getNewTypeMore(_type,page){
        _type = _type || 0
        let size
        car.getNewTypeMore(_type, page, size).then(res => {
            this.setData({
                carList: res.data
            })
        })
    },
    onReachBottom(){
        if(this.data.sort == 1){
            let _type = this.data.index
            this.data.page++
            car.getHotTypeMore(_type, this.data.page).then(res => {
                let arr = this.data.carList.concat(res.data)
                this.setData({
                    carList: arr
                })
            })
        }else{
            // let _type = this.data.index
            // let page = this.data.page++
            // car.getNewTypeMore(_type, page).then(res => {
            //     let arr = this.data.carList.concat(res.data)
            //     this.setData({
            //         carList: arr
            //     })
            // })
        }
        
    }
})
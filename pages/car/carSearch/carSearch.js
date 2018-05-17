import {Car} from "../../../api/car.js"
let car = new Car()

Page({
    data: {
        allNum:0
    },
    onLoad: function (options) {
        this.setTitle()
    },
    back() {
        console.log('back')
        wx.navigateBack({
            delta: 1
        })
    },
    toDetail(e){
        console.log(e)
        let id = e.detail.id
        wx.navigateTo({
            url: `../carDetail/carDetail?id=${id}`
        })
    },
    getQ(e){
        this.search(e.detail.value)
    },
    search(query){
        car.searchCar(query).then(res=>{
            console.log(res)
            this.setData({
                searchList:res.data,
                allNum:res.data.length
            })
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '搜索',
        })
    },
    onShareAppMessage: function () {

    }
})
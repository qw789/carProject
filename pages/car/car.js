import {Car} from "../../api/car.js"
let car = new Car()

Page({
    data: {
        inputShowed:false,
        showSide:false,
        hotBrandList:[],
        hotTypeList:[],
        isSide:false
    },
    onLoad: function (options) {
        this._getBrands()
        this._getHotBrand()
        this._getHotType()
        this._getNewType()
        this.setTitle()
        this.getSystem()
    },
    onShow(){
        this.setData({
            inputShowed:false
        })  
    },
    getSystem(){
        wx.getSystemInfo({
            success: res=> {
                console.log(res)
                this.data.screenWidth = res.screenWidth
            }
        })
    },
    getRect(e){
        console.log('car',e)
    },
    toDetail(e){
        wx.navigateTo({
            url:`./carDetail/carDetail?id=${e.detail}`,
        })
        
    },
    carToDetail(e){
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `./carDetail/carDetail?id=${id}`,
        })
    },
    toCarSearch(){
        wx.navigateTo({
            url: './carSearch/carSearch',
        })
    },
    toCarList(e){
        let name = e.currentTarget.dataset.type
        if(name == '热门车型'){
            wx.navigateTo({
                url: `./carList/carList?sort=1`,
            })
        }else{
            wx.navigateTo({
                url: `./carList/carList?sort=2`,
            })
        }
        
    },
    showSideBar(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        this._getCarByBrand(id)
        this.setData({
            showSide:true,
            name:name,
            isSide:true
        })
        this.showAnimation()
    },
    hideSide(e){
        this.setData({
            isSide:false
        })
    },
    showAnimation() {
        let animation = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0,
            transformOrigin: "0 0 0",
        })

        this.animation = animation
        
        let x = parseInt(this.data.screenWidth*0.68)

        animation.translateX(-x).step()

        this.setData({
            animationData: animation.export()
        })
    },
    _getBrands(){
        car.getBrands().then(res=>{
            this.setData({
                brandList:res
            })
        })
    },
    _getHotBrand(){
        car.getHotBrand().then(res=>{
            this.setData({
                hotBrandList:res.data
            })
        })
    },
    _getHotType() {
        car.getHotType().then(res=>{
            let arr = res.data
            arr = arr.slice(0,3)
            this.setData({
                hotTypeList:arr
            })
        })
    },
    _getNewType(){
        car.getNewType().then(res => {
            let arr = res.data
            arr = arr.slice(0, 3)
            this.setData({
                newTypeList: arr
            })
        })
    },
    _getCarByBrand(id){
        car.getCarByBrand(id).then(res=>{
            console.log('brandList',res.data)
            this.setData({
                brandCarList:res.data
            })
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '选车',
        })
    }
})
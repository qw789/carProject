import { Car } from "../../../api/car.js"
import {My} from "../../../api/my.js"
import {Home} from "../../../api/home.js"
let car = new Car()
let my = new My()
let home = new Home()

var WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        navList: ["综述", "图片", "参数"],
        detailHide: false,
        pictureHide: true,
        parameterHide: true,
        carImgList: []
    },
    onLoad: function (options) {
        this.data.id = options.id
        // this._getCarImgList()
        this._getCarDetail()
        this.setTitle()
    },
    collection(e){
        console.log(e)
        let isCollection = e.detail
        if(isCollection == true){
            home.addCollection(this.data.id,'SERIES').then(res=>{
                console.log(res)
            })
        }else if(isCollection == false){
            home.deleteCollection(this.data.id).then(res => {
                console.log(res)
            })
        }
    },
    nav(e) {
        let index = e.detail.index
        this.changeCurrent(index)
    },
    changeCurrent(index) {
        let detailHide = true,
            pictureHide = true,
            parameterHide = true

        switch (index) {
            case 0:
                detailHide = false;
                break;
            case 1:
                pictureHide = false;
                break;
            case 2:
                parameterHide = false;
                break;
        }

        this.setData({
            detailHide: detailHide,
            pictureHide: pictureHide,
            parameterHide: parameterHide
        })
    },
    _getCarDetail() {
        let id = this.data.id
        car.getCarInfos(id).then(res=>{
            console.log(res.data[0])
            let detail = res.data[0]

            var cardetail = detail.content
            var that = this
            WxParse.wxParse('cardetail', 'md', cardetail, that, 10);

            this.setParams(detail.parameters)
            this.setData({
                carInfo:detail,
                isCollection:res.data[0].collection,
                carImgList:res.data[0].covers
            })
        })
    },
    setParams(params){
        let Arr = []
        for(var i in params){
            let item = {}
            item.title = i
            item.list = params[i]
            let list = item.list
            let arr = []
            for(let i in list){
                let it = {}
                it.left = i
                it.right = list[i]
                arr.push(it)
                // let right = arr.right 
                // var str = "&NBSP;&NBSP;&NBSP;&NBSP;";
                // var reg = /&NBSP;/g;
                // right = str.replace(reg, " "); 
                arr.map((item,index,array)=>{
                    var reg = /&nbsp;/g;
                    item.right = item.right.replace(reg, " "); 
                })
                item.list = arr
            }          
            Arr.push(item)
        }
        console.log(Arr)
        this.setData({
            params:Arr
        })
    },
    _getCarImgList() {
        car.getCarDetailImg(res => {
            console.log(res)
            this.setData({
                carImgList: res
            })
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '汽车详情',
        })
    }
})
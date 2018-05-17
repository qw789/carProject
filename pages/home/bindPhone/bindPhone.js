import { Home } from "../../../api/home.js"
import { My } from "../../../api/my.js"
let home = new Home()
let my = new My()

Page({
    data: {
        yzmTime: '获取验证码',
        confirm: false,
        phone: null,
        yzm: null,
        wait:60,
        canYZM:false
    },
    onLoad: function (options) {
        this.setTitle()
    },
    time() {

        if (this.data.wait == 0) {
            this.data.wait = 60
            this.setData({
                yzmTime:'获取验证码'
            })
        } else {
            // let value = "重新发送(" + this.data.wait + ")";
            let value = `重新发送 ${this.data.wait}s`
            this.setData({
                yzmTime:value
            })
            this.data.wait--;
            setTimeout(()=> {
                this.time()
            },1000)
        }
    },
    getPhone(e) {
        this.data.phone = e.detail.value
        if(this.data.phone > 10){
            this.setData({
                canYZM:true
            })
        }
        if (this.data.phone && this.data.yzm) {
            this.setData({
                confirm: true
            })
        }
    },
    getyzm(e) {
        this.data.yzm = e.detail.value
        if (this.data.phone && this.data.yzm) {
            this.setData({
                confirm: true
            })
        }
    },
    _getYZM() {
        let phone = this.data.phone
        if(phone){
            this.time()
        }
        home.getYZM(phone).then(res => {
            console.log(res)
        })
    },
    _postPhone(){
        let yzm = this.data.yzm
        let phone = this.data.phone
        my.postPhone(yzm,phone).then(res=>{
            console.log(res)
            if(res.code == 200){
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    postInfo() {
        let yzm = this.data.yzm
        let phone = this.data.phone
        my.postUserInfo(phone).then(res => {
            console.log(res)
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '绑定手机',
        })
    },
    onShareAppMessage: function () {

    }
})
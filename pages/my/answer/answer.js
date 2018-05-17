import { My } from "../../../api/my.js"
let my = new My()

Page({
    data: {
        navList: ["我的问答", "问答广场"],
        myHide:false,
        allHide:true,
        mypage:1,
        allpage:1,
        questionValue:''
    },
    onLoad: function (options) {
       
        this.setTitle()
    },
    onShow(){
        this._getQuestions()
        this._getMyQuestions()
    },
    toWen(){
        wx.navigateTo({
            url: './wen/wen',
        })
    },
    nav(e){
        let index = e.detail.index
        this.isTab(index)
        this.data.index = index
    },
    isTab(index){
        let myHide = this.data.myHide,
            allHide = this.data.allHide
        myHide = true
        allHide = true
        if(index == 0){
            myHide = false
        }else{
            allHide = false
        }
        this.setData({
            myHide:myHide,
            allHide:allHide
        })
    },
    _getQuestions(){
        my.getQuestions().then(res=>{
            this.setData({
                allList:res.data
            })
        })
    },
    _getMyQuestions(){
        my.getMyQuestions().then(res=>{
            console.log(res)
            this.setData({
                myList:res.data
            })
        })
    },
    getQuestion(e){
        this.data.question = e.detail.value
    },
    _postQuestion(){
        my.postQuestion(this.data.question).then(res=>{
            console.log(res)
        }).then(res=>{
            this._getQuestions()
            this._getMyQuestions()
            this.setData({
                questionValue:''
            })
            wx.showToast({
                title: '提问成功',
                icon: 'success',
                duration: 1000
            })
        })  
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '问答中心',
        })
    },
    onReachBottom(){
        if(this.data.index == 0){
            let page = this.data.mypage++
            my.getMyQuestions(page).then(res => {
                let arr = this.data.myList.concat(res.data)
                this.setData({
                    myList: arr
                })
            })
        }else{
            let page = this.data.allpage++
            my.getQuestions(page).then(res => {
                let arr = this.data.allList.concat(res.data)
                this.setData({
                    allList: arr
                })
            })
        }
    }
})
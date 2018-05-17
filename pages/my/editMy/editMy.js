import { My } from "../../../api/my.js"
let my = new My()

Page({
    data: {
        isEditName:false,
        introNum:0,
        introErr:false,
        isEditRemark:false,
        user:{},
        saveErr:'*保存失败',
        isErr:false
    },
    onLoad: function (options) {
        this.setTitle()
        this.getUser()
    },
    getUser(){
        my.getUserInfo().then(res=>{
            console.log(res)
            this.data.name = res.data.nickname
            this.data.avatar = res.data.profilePicture
            this.data.intro = res.data.remark
            this.data.phone = res.data.mobilePhone

            this.setData({
                user:res.data,
                avatar:res.data.profilePicture,
                nickname:res.data.nickname,
                phone:res.data.mobilePhone,
                remark:res.data.remark
            })
        })
    },
    hideInput(){
        this.setData({
            isEditName:false
        })
    },
    editName(){
        this.setData({
            isEditName:true
        })
    },
    getName(e){
        this.data.name = e.detail.value
        this.setData({
            nickname:this.data.name
        })
    },
    getIntroduction(e){
        let intro = e.detail.value
        this.data.intro = e.detail.value
        let len = intro.length
        this.setData({
            introNum:len,
            isEditRemark:true
        })
        if(len>60){
            this.setData({
                introErr:true
            })
        }else{
            this.setData({
                introErr: false
            })
        }
    },
    introBlur(){
        this.setData({
            isEditRemark:false
        })
    },
    toBind(){
        wx.navigateTo({
            url: '../../home/bindPhone/bindPhone',
        })
    },
    selectAvatar() {
        
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: res=> {
                var tempFilePaths = res.tempFilePaths
                this.setData({
                    avatar:tempFilePaths[0]
                })
                let token = wx.getStorageSync('token')
                wx.uploadFile({
                    header: {
                        'Authorization': `Bearer ${token}`
                    },
                    url: 'https://api.wyf6.com/user/profilePicture', 
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': 'avatar'
                    },
                    success:res=> {
                        var data = JSON.parse(res.data)
                        console.log(data)
                        this.data.avatar = res.data.data
                    }
                })
            }
        })
    },
    save(){
        var phone,
            name = this.data.name,
            avatar = this.data.avatar,
            remark = this.data.intro

        let nameLen = this.data.name.length
        console.log(nameLen)
        let remarkLen = remark.length
        console.log(remarkLen)
        // if(nameLen>12){
        //     this.setData({
        //         saveErr:'*昵称不能大于12字符',
        //         isErr:true
        //     })
        //     return
        // }else if(remarkLen>60){
        //     this.setData({
        //         saveErr:'*个人简介不能大于60字符',
        //         isErr:true
        //     })
        //     return
        // }
        my.postUserInfo(phone,name,avatar,remark).then(res=>{
            console.log(res)
            if(res.code == 200){
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                })
            }
            wx.switchTab({
                url: '/pages/my/my',
            })
        })
    },
    setTitle() {
        wx.setNavigationBarTitle({
            title: '编辑信息',
        })
    },
    onShareAppMessage: function () {

    }
})
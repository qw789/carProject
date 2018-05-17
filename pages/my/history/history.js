import {My} from "../../../api/my.js"
let my = new My()

Page({
    data: {
        noSelectIcon: "../../../images/wgx.png",
        selectIcon:"../../../images/gx.png",
        edit: false,
        select:false,
        page:1,
        deleteArr:[],
        historyArr:[]
    },
    onLoad: function (options) {
        this._getBrowse()
        this.setTitle()
    },
    _getBrowse(){
        my.getBrowse().then(res=>{
            this.data.historyArr = res.data
            let arr = this.data.historyArr
            arr.map((item,index,array)=>{
                item.select = false
            })
            console.log(arr)
        
            this.setData({
                dataList:arr
            })
        })

    },
    edit(){
        this.setData({
            edit:!this.data.edit
        })
    },
    select(e){
        let id = e.currentTarget.dataset.id
        let index = e.currentTarget.dataset.index
        let arr = this.data.historyArr
        arr[index].select = !arr[index].select
        this.setData({
            dataList:arr
        })
    },
    toDelete(){
        let arr = this.data.historyArr
        arr.map((item,index)=>{
            if(item.select == true){
                my.deleteBrowse(item.id).then(res=>{
                    console.log(res)
                    this._getBrowse()
                })
            }
        })
    },
    setTitle(){
        wx.setNavigationBarTitle({
            title: '浏览历史',
        })
    },
    onReachBottom(){
        page = this.data.page++
        my.getBrowse(page).then(res => {
            let arr = this.data.dataList.concat(res.data)
            this.setData({
                dataList: arr
            })
        })
    }
})

Component({
    properties: {
        commentList:{
            type:Array,
            value:[]
        },
        comments:{
            type:String,
            value:'0'
        },
        isCollection:{
            type:Boolean,
            value:false
        }
    },
    data: {
        noCollectionIcon:"../../../images/icon_xq_shc.png",
        collectionIcon:"../../../images/icon_xq_shc_f.png",
        isX:false
    },
    attached(){
        wx.getSystemInfo({
            success: res=>{
                console.log(res)
                if(res.model == 'iPhone X'){
                    
                    this.setData({
                        isX:true
                    })
                }
            },
        })
    },
    methods: {
        getComment(e){
            let comment = e.detail.value
            let detail = e.detail
            this.triggerEvent('getComment',detail)
        },
        collection(){
            this.setData({
                isCollection : !this.data.isCollection
            })
            let detail = {isCollection:this.data.isCollection}
            this.triggerEvent('collection',detail)
        },
        toShare(){
            this.triggerEvent('toShare')
        },
        toComment(){
            this.triggerEvent('toComment')
        }
    }
})

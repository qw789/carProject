
Component({
  properties: {
    isHide:{
        type:Boolean,
        value:true
    },
    carInfo:{
        type:Object,
        value:{}
    },
    isCollection:{
        type:Boolean,
        value:false
    }
  },
  data: {
    noVoice:'../../../images/icon_shy.png',
    voice:"../../../images/laba.gif",
    ifTilVoice:false,
    ifConVoice:false,
    collectionIcon:"../../../images/icon_shc_f.png",
    noCollectionIcon:"../../../images/icon_shc_n.png"
  },
  methods: {
    tilVoice(){
        this.setData({
            ifTilVoice:!this.data.ifTilVoice
        })
    },
    conVoice(){
        this.setData({
            ifConVoice: !this.data.ifConVoice
        })
    },
    collection(){
        this.setData({
            isCollection:!this.data.isCollection
        })
        if(this.data.isCollection==true){
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
            })
        }else{
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
            })
        }
        this.triggerEvent('collection',this.data.isCollection)
    }
  }
})

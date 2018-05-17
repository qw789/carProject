
Component({
  properties: {
    isHide:{
        type:Boolean,
        value:true
    },
    imgList:{
        type:Array,
        value:[]
    }
  },
  data: {

  },
  methods: {
    preview(e){
        let src = e.currentTarget.dataset.src
        let arr = []
        arr.push(src)
        wx.previewImage({
            current: '', 
            urls: arr
        })
    }
  }
})

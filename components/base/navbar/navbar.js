
Component({
  properties: {
      navList:{
          type:Array,
          value: ["选项一", "选型二", "选项三", "选项四"]
      },
      currentTab:{
          type:Number,
          value:0
      }
  },
  data: {
      
  },
  methods: {
      nav(e) {
          let index = e.currentTarget.dataset.index
          this.setData({
              currentTab: index
          })
          let navDetail = e.currentTarget.dataset
          this.triggerEvent("nav",navDetail)
      },
  }
})

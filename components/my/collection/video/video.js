
Component({
  properties: {
    hide:{
        type:Boolean,
        value:true
    },
    homeList:{
        type:Array,
        value:[]
    }
  },
  data: {

  },
  methods: {
      toDetail(e) {
          let id = e.currentTarget.dataset.id
          this.triggerEvent('toDetail', id)
      }
  }
})

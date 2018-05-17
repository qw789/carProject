// components/my/collection/article/article.js
Component({
  /**
   * 组件的属性列表
   */
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

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
        let id = e.currentTarget.dataset.id
        this.triggerEvent('toDetail',id)
    }
  }
})

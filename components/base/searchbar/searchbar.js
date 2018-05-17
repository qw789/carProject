// components/base/searchbar/searchbar.js
Component({
  properties: {
      inputShowed:{
          type:Boolean,
          value:false
      }
  },
  data: {
      inputVal: ""
  },
  methods: {
      showInput: function () {
          this.triggerEvent('showInput')
          this.setData({
              inputShowed: true
          });
      },
      hideInput: function () {
          console.log('1')
          this.setData({
              inputVal: "",
              inputShowed: false
          });
          this.triggerEvent('hideInput')
      },
      clearInput: function () {
          this.setData({
              inputVal: ""
          });
      },
      inputTyping: function (e) {
          this.setData({
              inputVal: e.detail.value
          });
          this.triggerEvent('inputTyping',e.detail)
      }
  }
})

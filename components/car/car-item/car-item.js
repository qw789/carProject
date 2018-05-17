
Component({
    properties: {
        dataList: {
            type: Array,
            value: []
        }
    },
    data: {
       
    },
    methods: {
        toDetail(e) {
            this.triggerEvent('toDetail', e.currentTarget.dataset)
        }
    }
})
